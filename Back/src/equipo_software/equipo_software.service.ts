import { Injectable } from '@nestjs/common';
import { CreateEquipoSoftwareDto } from './dto/create-equipo_software.dto';
import { UpdateEquipoSoftwareDto } from './dto/update-equipo_software.dto';

@Injectable()
export class EquipoSoftwareService {
  create(createEquipoSoftwareDto: CreateEquipoSoftwareDto) {
    return 'This action adds a new equipoSoftware';
  }

  findAll() {
    return `This action returns all equipoSoftware`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipoSoftware`;
  }

  update(id: number, updateEquipoSoftwareDto: UpdateEquipoSoftwareDto) {
    return `This action updates a #${id} equipoSoftware`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipoSoftware`;
  }
}
