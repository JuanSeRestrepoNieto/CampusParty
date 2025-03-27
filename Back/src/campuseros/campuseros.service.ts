import { Injectable } from '@nestjs/common';
import { CreateCampuseroDto } from './dto/create-campusero.dto';
import { UpdateCampuseroDto } from './dto/update-campusero.dto';

@Injectable()
export class CampuserosService {
  create(createCampuseroDto: CreateCampuseroDto) {
    return 'This action adds a new campusero';
  }

  findAll() {
    return `This action returns all campuseros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campusero`;
  }

  update(id: number, updateCampuseroDto: UpdateCampuseroDto) {
    return `This action updates a #${id} campusero`;
  }

  remove(id: number) {
    return `This action removes a #${id} campusero`;
  }
}
