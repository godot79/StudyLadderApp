import { describe, it, expect } from "vitest";
import { computeProgressedBand, getNextBand } from "@/lib/progression";

describe("getNextBand", () => {
  it("returns the next band in order", () => {
    expect(getNextBand("Age 9")).toBe("Age 9 High Achiever");
    expect(getNextBand("Age 9 High Achiever")).toBe("Age 10");
    expect(getNextBand("Age 10")).toBe("Age 10 High Achiever");
    expect(getNextBand("Age 10 High Achiever")).toBe("Age 11");
    expect(getNextBand("Age 11")).toBe("Age 11 High Achiever");
  });

  it("returns null at the top band", () => {
    expect(getNextBand("Age 11 High Achiever")).toBeNull();
  });

  it("returns null for an unrecognised band", () => {
    expect(getNextBand("Unknown Band")).toBeNull();
  });
});

describe("computeProgressedBand", () => {
  const pass = (correct: number, total = 10) => ({ correctCount: correct, totalQuestions: total });

  it("stays at current band when fewer than 3 sessions exist", () => {
    expect(
      computeProgressedBand([pass(10), pass(10)], "Age 9")
    ).toEqual({ newBand: "Age 9", promoted: false });
  });

  it("stays at current band when fewer than 3 sessions exist (1 session)", () => {
    expect(
      computeProgressedBand([pass(10)], "Age 9")
    ).toEqual({ newBand: "Age 9", promoted: false });
  });

  it("promotes when the last 3 sessions all score ≥ 70%", () => {
    const result = computeProgressedBand([pass(7), pass(8), pass(9)], "Age 9");
    expect(result).toEqual({ newBand: "Age 9 High Achiever", promoted: true });
  });

  it("promotes at exactly 70% (7/10) per session", () => {
    const result = computeProgressedBand([pass(7), pass(7), pass(7)], "Age 9");
    expect(result).toEqual({ newBand: "Age 9 High Achiever", promoted: true });
  });

  it("does not promote when one session scores below 70%", () => {
    const result = computeProgressedBand([pass(7), pass(6), pass(9)], "Age 9");
    expect(result).toEqual({ newBand: "Age 9", promoted: false });
  });

  it("does not promote when the most recent session scores below 70%", () => {
    const result = computeProgressedBand([pass(6), pass(9), pass(9)], "Age 9");
    expect(result).toEqual({ newBand: "Age 9", promoted: false });
  });

  it("only considers the 3 most recent sessions (first in array = most recent)", () => {
    // Older sessions are poor but the 3 most recent are strong
    const sessions = [pass(9), pass(8), pass(7), pass(2), pass(1)];
    expect(computeProgressedBand(sessions, "Age 9")).toEqual({
      newBand: "Age 9 High Achiever",
      promoted: true,
    });
  });

  it("does not promote beyond Age 11 High Achiever", () => {
    const result = computeProgressedBand([pass(10), pass(10), pass(10)], "Age 11 High Achiever");
    expect(result).toEqual({ newBand: "Age 11 High Achiever", promoted: false });
  });

  it("promotes through intermediate bands correctly", () => {
    expect(
      computeProgressedBand([pass(8), pass(9), pass(10)], "Age 10")
    ).toEqual({ newBand: "Age 10 High Achiever", promoted: true });
  });

  it("handles a session with 0 total questions safely", () => {
    const sessions = [{ correctCount: 0, totalQuestions: 0 }, pass(9), pass(9)];
    expect(computeProgressedBand(sessions, "Age 9")).toEqual({
      newBand: "Age 9",
      promoted: false,
    });
  });
});
