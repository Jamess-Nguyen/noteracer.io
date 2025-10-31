import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const domains = ["example.com", "test.io", "mail.dev"];
function emailFor(i: number) {
  const base = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"][i % 6];
  return `${base}${i}@${domains[i % domains.length]}`;
}

async function main() {
  const N = 5;
  for (let i = 0; i < N; i++) {
    await prisma.user.upsert({
      where: { email: emailFor(i) },
      update: {},
      create: { email: emailFor(i) },
    });
  }
  const count = await prisma.user.count();
  console.log(`Seed complete. Users in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
