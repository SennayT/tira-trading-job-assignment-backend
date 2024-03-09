import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private db: PrismaService) {}

  getAllDepartments() {
    return this.db.department.findMany({
      //TODO: add pagination
      select: {
        id: true,
        name: true,
        description: true,
        managingDepartmentId: true,
      },
    });
  }

  async getById(id: string) {
    try {
      const department = await this.db.department.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          managingDepartmentId: true,
        },
      });
      return department;
    } catch (err) {
      throw new NotFoundException('Department Not Found');
    }
  }
}
