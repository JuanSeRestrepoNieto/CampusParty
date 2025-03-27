import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoPcService } from './equipo_pc.service';
import { CreateEquipoPcDto } from './dto/create-equipo_pc.dto';
import { UpdateEquipoPcDto } from './dto/update-equipo_pc.dto';

@Controller('equipo-pc')
export class EquipoPcController {
  constructor(private readonly equipoPcService: EquipoPcService) {}

  @Post()
  create(@Body() createEquipoPcDto: CreateEquipoPcDto) {
    return this.equipoPcService.create(createEquipoPcDto);
  }

  @Get()
  findAll() {
    return this.equipoPcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoPcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoPcDto: UpdateEquipoPcDto) {
    return this.equipoPcService.update(+id, updateEquipoPcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoPcService.remove(+id);
  }
}
