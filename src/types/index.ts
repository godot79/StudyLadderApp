export type AnswerOutcome = "correct" | "incorrect" | "unanswered";

export type Question = {
  id: string;
  subject: string;
  levelBand?: string | null;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  isActive: boolean;
  passage?: string | null;
  passageId?: string | null;
};

export type SessionQuestionOutcome = {
  questionId: string;
  selectedOption: string | null;
  outcome: AnswerOutcome;
};

export type SessionResults = {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
};

export type ProgressDelta = {
  sessionsCompletedDelta: number;
  totalQuestionsAnsweredDelta: number;
  totalCorrectDelta: number;
  lastCompletedAt: Date;
};

export type SessionCompletionData = {
  results: SessionResults;
  completedAt: Date;
  shownQuestionIds: string[];
  progressDelta: ProgressDelta;
};
