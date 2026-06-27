import { PrismaClient } from "@prisma/client";
import mathsQuestions from "../data/seed/maths.json";
import englishQuestions from "../data/seed/english.json";
import geographyQuestions from "../data/seed/geography.json";
import spaceQuestions from "../data/seed/space.json";

const prisma = new PrismaClient();

type QuestionInput = {
  levelBand: string;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
};

// Seed questions for one subject safely.
//
// On a fresh DB: deletes any existing rows and creates all questions from the JSON file.
// On a live DB with session history: skips deletion of questions already referenced by
// SessionQuestion or ShownQuestion (deleting them would violate FK constraints and lose
// historical context). Only net-new prompts are inserted; questions that exist in the DB
// but not in the JSON are deleted if unreferenced.
async function seedSubject(subject: string, questions: QuestionInput[]) {
  const existing = await prisma.question.findMany({
    where: { subject },
    select: { id: true, prompt: true },
  });

  const referencedIds = new Set<string>();
  if (existing.length > 0) {
    const ids = existing.map((q) => q.id);
    const [sessionRefs, shownRefs] = await Promise.all([
      prisma.sessionQuestion.findMany({
        where: { questionId: { in: ids } },
        select: { questionId: true },
      }),
      prisma.shownQuestion.findMany({
        where: { questionId: { in: ids } },
        select: { questionId: true },
      }),
    ]);
    for (const r of sessionRefs) referencedIds.add(r.questionId);
    for (const r of shownRefs) referencedIds.add(r.questionId);
  }

  const toDeleteIds = existing
    .filter((q) => !referencedIds.has(q.id))
    .map((q) => q.id);
  if (toDeleteIds.length > 0) {
    await prisma.question.deleteMany({ where: { id: { in: toDeleteIds } } });
  }

  // Don't re-create prompts that are still present (kept because referenced).
  const keptPrompts = new Set(
    existing.filter((q) => referencedIds.has(q.id)).map((q) => q.prompt)
  );
  const toCreate = questions.filter((q) => !keptPrompts.has(q.prompt));
  if (toCreate.length > 0) {
    await prisma.question.createMany({
      data: toCreate.map((q) => ({
        subject,
        levelBand: q.levelBand,
        prompt: q.prompt,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
        isActive: true,
      })),
    });
  }

  console.log(
    `Seeded ${subject}: ${toCreate.length} added, ${toDeleteIds.length} replaced,` +
      ` ${referencedIds.size} preserved (in use)`
  );
}

async function main() {
  const child = await prisma.child.upsert({
    where: { id: "child-001" },
    update: { displayName: "Dharma" },
    create: {
      id: "child-001",
      displayName: "Dharma",
    },
  });

  console.log(`Seeded child: ${child.displayName}`);

  await seedSubject("maths", mathsQuestions);
  await seedSubject("english", englishQuestions);
  await seedSubject("geography", geographyQuestions);
  await seedSubject("space", spaceQuestions);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
