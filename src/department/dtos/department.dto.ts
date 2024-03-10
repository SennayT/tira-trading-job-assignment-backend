import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  manager: string;
}

export class PutDepartmentDto extends CreateDepartmentDto {}

export class PatchDepartmentDto extends CreateDepartmentDto {}
