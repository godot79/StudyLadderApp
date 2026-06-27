import { describe, it, expect } from "vitest";
import { selectQuestions } from "@/lib/questions";
import type { Question } from "@/types";

function makeQuestion(id: string, overrides: Partial<Question> = {}): Question {
  return {
    id,
    subject: "maths",
    prompt: `Question ${id}`,
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "A",
    isActive: true,
    ...overrides,
  };
}

function makeQuestions(ids: string[]): Question[] {
  return ids.map((id) => makeQuestion(id));
}

describe("selectQuestions", () => {
  it("returns exactly 10 questions when pool is large", () => {
    const questions = makeQuestions(Array.from({ length: 25 }, (_, i) => `q${i}`));
    const result = selectQuestions(questions, []);
    expect(result).toHaveLength(10);
  });

  it("returns no duplicates within the selection", () => {
    const questions = makeQuestions(Array.from({ length: 25 }, (_, i) => `q${i}`));
    const result = selectQuestions(questions, []);
    const ids = result.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only unseen questions when enough are available", () => {
    const unseenIds = Array.from({ length: 15 }, (_, i) => `unseen-${i}`);
    const seenIds = Array.from({ length: 10 }, (_, i) => `seen-${i}`);
    const questions = makeQuestions([...unseenIds, ...seenIds]);
    const result = selectQuestions(questions, seenIds);
    const resultIds = result.map((q) => q.id);
    for (const id of resultIds) {
      expect(seenIds).not.toContain(id);
    }
  });

  it("includes all unseen questions when unseen pool equals count", () => {
    const unseenIds = Array.from({ length: 10 }, (_, i) => `unseen-${i}`);
    const seenIds = Array.from({ length: 5 }, (_, i) => `seen-${i}`);
    const questions = makeQuestions([...unseenIds, ...seenIds]);
    const result = selectQuestions(questions, seenIds);
    const resultIds = new Set(result.map((q) => q.id));
    expect(result).toHaveLength(10);
    for (const id of unseenIds) {
      expect(resultIds.has(id)).toBe(true);
    }
  });

  it("falls back to seen questions when unseen pool is insufficient", () => {
    const unseenIds = ["u1", "u2", "u3"];
    const seenIds = Array.from({ length: 20 }, (_, i) => `seen-${i}`);
    const questions = makeQuestions([...unseenIds, ...seenIds]);
    const result = selectQuestions(questions, seenIds);
    expect(result).toHaveLength(10);
    const resultIds = new Set(result.map((q) => q.id));
    for (const id of unseenIds) {
      expect(resultIds.has(id)).toBe(true);
    }
  });

  it("returns fewer than count when total active pool is smaller", () => {
    const questions = makeQuestions(["q1", "q2", "q3"]);
    const result = selectQuestions(questions, []);
    expect(result).toHaveLength(3);
  });

  it("excludes inactive questions", () => {
    const active = makeQuestions(["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"]);
    const inactive = [makeQuestion("inactive-1", { isActive: false })];
    const result = selectQuestions([...active, ...inactive], []);
    const resultIds = result.map((q) => q.id);
    expect(resultIds).not.toContain("inactive-1");
  });

  it("respects a custom count", () => {
    const questions = makeQuestions(Array.from({ length: 20 }, (_, i) => `q${i}`));
    const result = selectQuestions(questions, [], 5);
    expect(result).toHaveLength(5);
  });
});
