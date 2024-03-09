import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const addDepartments = async () => {
  const ceo = await prisma.department.create({
    data: {
      name: 'CEO',
      description: '',
    },
  });

  const cfo = await prisma.department.create({
    data: {
      name: 'CFO',
      description: '',
      managingDepartment: {
        connect: {
          id: ceo.id,
        },
      },
    },
  });

  await prisma.department.create({
    data: {
      name: 'CTO',
      description: '',
      managingDepartment: {
        connect: {
          id: ceo.id,
        },
      },
    },
  });

  await prisma.department.create({
    data: {
      name: 'Financial Analyst',
      description: '',
      managingDepartment: {
        connect: {
          id: cfo.id,
        },
      },
    },
  });

  await prisma.department.create({
    data: {
      name: 'Auditor',
      description: '',
      managingDepartment: {
        connect: {
          id: cfo.id,
        },
      },
    },
  });
};

async function runner() {
  await addDepartments();
  const departments = await prisma.department.findMany({
    include: {
      managingDepartment: {
        select: {
          name: true,
        },
      },
    },
  });

  for (const department of departments) {
    const name = department.name;
    const manager = department.managingDepartment?.name;
    console.log(`${name} is managed by ${manager}`);
  }
}

runner().catch((err) => console.log(err));
