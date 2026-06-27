import { PrismaClient } from "@prisma/client";
import mathsQuestions from "../data/seed/maths.json";
import englishQuestions from "../data/seed/english.json";

const prisma = new PrismaClient();

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

  await prisma.question.deleteMany({ where: { subject: "maths" } });

  await prisma.question.createMany({
    data: mathsQuestions.map((q) => ({
      subject: "maths",
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

  console.log(`Seeded ${mathsQuestions.length} maths questions`);

  await prisma.question.deleteMany({ where: { subject: "english" } });

  await prisma.question.createMany({
    data: englishQuestions.map((q) => ({
      subject: "english",
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

  console.log(`Seeded ${englishQuestions.length} english questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
