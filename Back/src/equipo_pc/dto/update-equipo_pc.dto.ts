import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoPcDto } from './create-equipo_pc.dto';

export class UpdateEquipoPcDto extends PartialType(CreateEquipoPcDto) {}
