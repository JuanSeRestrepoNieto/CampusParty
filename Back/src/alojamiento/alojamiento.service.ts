import { Injectable } from '@nestjs/common';
import { CreateAlojamientoDto } from './dto/create-alojamiento.dto';
import { UpdateAlojamientoDto } from './dto/update-alojamiento.dto';

@Injectable()
export class AlojamientoService {
  create(createAlojamientoDto: CreateAlojamientoDto) {
    return 'This action adds a new alojamiento';
  }

  findAll() {
    return `This action returns all alojamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alojamiento`;
  }

  update(id: number, updateAlojamientoDto: UpdateAlojamientoDto) {
    return `This action updates a #${id} alojamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} alojamiento`;
  }
}
