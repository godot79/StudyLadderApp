import { describe, it, expect } from "vitest";
import { evaluateAnswer, calculateResults } from "@/lib/scoring";

describe("evaluateAnswer", () => {
  it("returns correct when selected matches correctOption", () => {
    expect(evaluateAnswer("A", "A")).toBe("correct");
    expect(evaluateAnswer("D", "D")).toBe("correct");
  });

  it("returns incorrect when selected does not match", () => {
    expect(evaluateAnswer("A", "B")).toBe("incorrect");
    expect(evaluateAnswer("C", "D")).toBe("incorrect");
  });

  it("returns unanswered when selectedOption is null", () => {
    expect(evaluateAnswer("A", null)).toBe("unanswered");
  });

  it("returns unanswered when selectedOption is undefined", () => {
    expect(evaluateAnswer("A", undefined)).toBe("unanswered");
  });

  it("returns unanswered when selectedOption is empty string", () => {
    expect(evaluateAnswer("A", "")).toBe("unanswered");
  });
});

describe("calculateResults", () => {
  it("counts correct, incorrect, and unanswered correctly", () => {
    const result = calculateResults(["correct", "incorrect", "unanswered", "correct", "unanswered"]);
    expect(result.correctCount).toBe(2);
    expect(result.incorrectCount).toBe(1);
    expect(result.unansweredCount).toBe(2);
    expect(result.totalQuestions).toBe(5);
  });

  it("returns correct totalQuestions equal to outcomes length", () => {
    const result = calculateResults(["correct", "correct", "correct"]);
    expect(result.totalQuestions).toBe(3);
  });

  it("handles all correct", () => {
    const outcomes = Array(10).fill("correct") as ("correct")[];
    const result = calculateResults(outcomes);
    expect(result.correctCount).toBe(10);
    expect(result.incorrectCount).toBe(0);
    expect(result.unansweredCount).toBe(0);
  });

  it("handles all incorrect", () => {
    const outcomes = Array(10).fill("incorrect") as ("incorrect")[];
    const result = calculateResults(outcomes);
    expect(result.correctCount).toBe(0);
    expect(result.incorrectCount).toBe(10);
    expect(result.unansweredCount).toBe(0);
  });

  it("handles all unanswered", () => {
    const outcomes = Array(10).fill("unanswered") as ("unanswered")[];
    const result = calculateResults(outcomes);
    expect(result.correctCount).toBe(0);
    expect(result.incorrectCount).toBe(0);
    expect(result.unansweredCount).toBe(10);
  });

  it("handles empty outcomes", () => {
    const result = calculateResults([]);
    expect(result.totalQuestions).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.incorrectCount).toBe(0);
    expect(result.unansweredCount).toBe(0);
  });
});
