import { PartialType } from '@nestjs/mapped-types';
import { CreateCampuseroDto } from './create-campusero.dto';

export class UpdateCampuseroDto extends PartialType(CreateCampuseroDto) {}
