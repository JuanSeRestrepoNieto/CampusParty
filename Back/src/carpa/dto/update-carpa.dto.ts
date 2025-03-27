import { PartialType } from '@nestjs/mapped-types';
import { CreateCarpaDto } from './create-carpa.dto';

export class UpdateCarpaDto extends PartialType(CreateCarpaDto) {}
