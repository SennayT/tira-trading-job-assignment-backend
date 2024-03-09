import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [PrismaModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
