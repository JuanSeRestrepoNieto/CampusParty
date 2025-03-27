import { Module } from '@nestjs/common';
import { EquipoPcService } from './equipo_pc.service';
import { EquipoPcController } from './equipo_pc.controller';

@Module({
  controllers: [EquipoPcController],
  providers: [EquipoPcService],
})
export class EquipoPcModule {}
