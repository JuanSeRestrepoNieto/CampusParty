import { Injectable } from '@nestjs/common';
import { CreatePabellonDto } from './dto/create-pabellon.dto';
import { UpdatePabellonDto } from './dto/update-pabellon.dto';
import { Pabellon } from './entities/pabellon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PabellonService {
  constructor(
    @InjectRepository(Pabellon)
    private readonly pabellonRepository: Repository<Pabellon>,
  ) {}

  async create(createPabellonDto: CreatePabellonDto) {
    const existingPabellon = await this.pabellonRepository.findOne({ 
      where: { nombre: createPabellonDto.nombre } 
    });
  
    if (existingPabellon) {
      throw new Error('Pabellon with this name already exists');
    }
  
    return this.pabellonRepository.save(createPabellonDto);
  }

  findAll() {
    return this.pabellonRepository.find();
  }

  findOne(id: number) {
    return this.pabellonRepository.findOne({ where: { id } });
  }

  update(id: number, updatePabellonDto: UpdatePabellonDto) {
    return this.pabellonRepository.update(id, updatePabellonDto);
  }

  async remove(id: number) {
    const pabellon = await this.pabellonRepository.findOne({
      where: { id },
      relations: ['carpa'], // Ensure carpas are loaded
    });
  
    if (!pabellon) {
      throw new Error('Pabellon not found');
    }
  
    if (pabellon.carpa && pabellon.carpa.length > 0) {
      throw new Error('Cannot delete pabellon with associated carpas');
    }
  
    return this.pabellonRepository.delete(id);
  }
  
}
