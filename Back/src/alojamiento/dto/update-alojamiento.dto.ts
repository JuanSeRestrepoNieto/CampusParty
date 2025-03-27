import { PartialType } from '@nestjs/mapped-types';
import { CreateAlojamientoDto } from './create-alojamiento.dto';

export class UpdateAlojamientoDto extends PartialType(CreateAlojamientoDto) {}
