import { Module } from '@nestjs/common';
import { CarpaService } from './carpa.service';
import { CarpaController } from './carpa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carpa } from './entities/carpa.entity';

@Module({
  controllers: [CarpaController],
  providers: [CarpaService],
  imports: [TypeOrmModule.forFeature([Carpa])],
  exports: [CarpaService],
})
export class CarpaModule {}
