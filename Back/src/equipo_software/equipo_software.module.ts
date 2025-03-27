import { Module } from '@nestjs/common';
import { EquipoSoftwareService } from './equipo_software.service';
import { EquipoSoftwareController } from './equipo_software.controller';

@Module({
  controllers: [EquipoSoftwareController],
  providers: [EquipoSoftwareService],
})
export class EquipoSoftwareModule {}
