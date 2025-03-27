import { Module } from '@nestjs/common';
import { AlojamientoService } from './alojamiento.service';
import { AlojamientoController } from './alojamiento.controller';

@Module({
  controllers: [AlojamientoController],
  providers: [AlojamientoService],
})
export class AlojamientoModule {}
