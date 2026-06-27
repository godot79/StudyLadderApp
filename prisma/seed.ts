import { PrismaClient } from "@prisma/client";
import mathsQuestions from "../data/seed/maths.json";

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
