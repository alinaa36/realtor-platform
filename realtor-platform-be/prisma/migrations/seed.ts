import { PrismaClient } from '@prisma/client/extension';
import { users } from './user';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
