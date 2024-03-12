import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto, PatchDepartmentDto } from './dtos/department.dto';

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

  createDepartment({ name, description, manager }: CreateDepartmentDto) {
    return this.db.department.create({
      data: {
        name,
        description,
        managingDepartmentId: manager,
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

  updateDepartment(id: string, data: PatchDepartmentDto) {
    return this.db.department.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        managingDepartmentId: data.manager,
      },
    });
  }

  getManagedDepartments(id: string) {
    return this.db.department.findMany({
      where: {
        managingDepartmentId: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }
}
