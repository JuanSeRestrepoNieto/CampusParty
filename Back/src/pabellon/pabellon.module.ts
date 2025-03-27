import { Module } from '@nestjs/common';
import { PabellonService } from './pabellon.service';
import { PabellonController } from './pabellon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pabellon } from './entities/pabellon.entity';

@Module({
  controllers: [PabellonController],
  providers: [PabellonService],
  imports: [TypeOrmModule.forFeature([Pabellon])],
  exports: [PabellonService],
})
export class PabellonModule {}
