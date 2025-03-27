import { Injectable } from '@nestjs/common';
import { CreateEquipoPcDto } from './dto/create-equipo_pc.dto';
import { UpdateEquipoPcDto } from './dto/update-equipo_pc.dto';

@Injectable()
export class EquipoPcService {
  create(createEquipoPcDto: CreateEquipoPcDto) {
    return 'This action adds a new equipoPc';
  }

  findAll() {
    return `This action returns all equipoPc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoPc`;
  }

  update(id: number, updateEquipoPcDto: UpdateEquipoPcDto) {
    return `This action updates a #${id} equipoPc`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoPc`;
  }
}
