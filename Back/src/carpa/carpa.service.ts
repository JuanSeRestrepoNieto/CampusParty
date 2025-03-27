import { Injectable } from '@nestjs/common';
import { CreateCarpaDto } from './dto/create-carpa.dto';
import { UpdateCarpaDto } from './dto/update-carpa.dto';

@Injectable()
export class CarpaService {
  create(createCarpaDto: CreateCarpaDto) {
    return 'This action adds a new carpa';
  }

  findAll() {
    return `This action returns all carpa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carpa`;
  }

  update(id: number, updateCarpaDto: UpdateCarpaDto) {
    return `This action updates a #${id} carpa`;
  }

  remove(id: number) {
    return `This action removes a #${id} carpa`;
  }
}
