import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, PutDepartmentDto } from './dtos/department.dto';
import { Prisma } from '@prisma/client';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
  }

  @Post()
  async create(@Body() data: CreateDepartmentDto) {
    try {
      const res = await this.departmentService.createDepartment(data);
      return res;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new HttpException(
            'Duplicate Department Name',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw e;
    }
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.departmentService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: PutDepartmentDto,
  ) {
    console.log(data.manager);
    return this.departmentService.updateDepartment(id, data);
  }

  @Get(':id/managed')
  getManagedDepartments(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.departmentService.getManagedDepartments(id);
  }
}
