import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { PutDepartmentDto } from './dtos/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
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
