import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';

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
}
