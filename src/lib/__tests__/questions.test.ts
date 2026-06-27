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

describe("selectQuestions — level-band filtering", () => {
  function makeQuestionWithBand(id: string, levelBand: string | null): Question {
    return makeQuestion(id, { levelBand });
  }

  it("selects only from the specified level band when the band pool is sufficient", () => {
    const bandQs = Array.from({ length: 15 }, (_, i) =>
      makeQuestionWithBand(`band-${i}`, "Age 9")
    );
    const otherQs = Array.from({ length: 10 }, (_, i) =>
      makeQuestionWithBand(`other-${i}`, "Age 10")
    );
    const result = selectQuestions([...bandQs, ...otherQs], [], 10, "Age 9");
    expect(result).toHaveLength(10);
    for (const q of result) {
      expect(q.levelBand).toBe("Age 9");
    }
  });

  it("falls back to full pool when level-band pool has fewer questions than count", () => {
    const bandQs = Array.from({ length: 8 }, (_, i) =>
      makeQuestionWithBand(`band-${i}`, "Age 9")
    );
    const otherQs = Array.from({ length: 15 }, (_, i) =>
      makeQuestionWithBand(`other-${i}`, "Age 10")
    );
    const result = selectQuestions([...bandQs, ...otherQs], [], 10, "Age 9");
    expect(result).toHaveLength(10);
    // Result must include questions from outside the band (fallback active)
    const bands = new Set(result.map((q) => q.levelBand));
    expect(bands.size).toBeGreaterThan(1);
  });

  it("uses the full pool when levelBand is not provided", () => {
    const bandQs = Array.from({ length: 5 }, (_, i) =>
      makeQuestionWithBand(`band-${i}`, "Age 9")
    );
    const otherQs = Array.from({ length: 15 }, (_, i) =>
      makeQuestionWithBand(`other-${i}`, "Age 10")
    );
    const result = selectQuestions([...bandQs, ...otherQs], []);
    expect(result).toHaveLength(10);
  });

  it("uses the full pool when levelBand is null", () => {
    const bandQs = Array.from({ length: 5 }, (_, i) =>
      makeQuestionWithBand(`band-${i}`, "Age 9")
    );
    const otherQs = Array.from({ length: 15 }, (_, i) =>
      makeQuestionWithBand(`other-${i}`, "Age 10")
    );
    const result = selectQuestions([...bandQs, ...otherQs], [], 10, null);
    expect(result).toHaveLength(10);
  });

  it("prefers unseen questions within the level band", () => {
    const unseenBand = Array.from({ length: 12 }, (_, i) =>
      makeQuestionWithBand(`unseen-${i}`, "Age 9")
    );
    const seenBand = Array.from({ length: 5 }, (_, i) =>
      makeQuestionWithBand(`seen-${i}`, "Age 9")
    );
    const seenIds = seenBand.map((q) => q.id);
    const result = selectQuestions([...unseenBand, ...seenBand], seenIds, 10, "Age 9");
    expect(result).toHaveLength(10);
    for (const q of result) {
      expect(seenIds).not.toContain(q.id);
    }
  });

  it("recycles seen questions within the band when all band questions have been seen", () => {
    const bandQs = Array.from({ length: 10 }, (_, i) =>
      makeQuestionWithBand(`band-${i}`, "Age 9")
    );
    const seenIds = bandQs.map((q) => q.id);
    const result = selectQuestions(bandQs, seenIds, 10, "Age 9");
    expect(result).toHaveLength(10);
    // All returned questions are from the band (recycled)
    for (const q of result) {
      expect(q.levelBand).toBe("Age 9");
    }
  });

  it("treats subjects with no level-band questions as a fallback (simulates non-maths)", () => {
    // Questions with null levelBand — e.g. English questions not yet tagged
    const untaggedQs = Array.from({ length: 15 }, (_, i) =>
      makeQuestionWithBand(`q-${i}`, null)
    );
    // Band pool = 0 questions (null !== "Age 9"), triggers fallback to full pool
    const result = selectQuestions(untaggedQs, [], 10, "Age 9");
    expect(result).toHaveLength(10);
  });
});
