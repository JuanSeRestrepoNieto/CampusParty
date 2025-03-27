import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoSoftwareDto } from './create-equipo_software.dto';

export class UpdateEquipoSoftwareDto extends PartialType(CreateEquipoSoftwareDto) {}
