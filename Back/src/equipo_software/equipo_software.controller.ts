import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoSoftwareService } from './equipo_software.service';
import { CreateEquipoSoftwareDto } from './dto/create-equipo_software.dto';
import { UpdateEquipoSoftwareDto } from './dto/update-equipo_software.dto';

@Controller('equipo-software')
export class EquipoSoftwareController {
  constructor(private readonly equipoSoftwareService: EquipoSoftwareService) {}

  @Post()
  create(@Body() createEquipoSoftwareDto: CreateEquipoSoftwareDto) {
    return this.equipoSoftwareService.create(createEquipoSoftwareDto);
  }

  @Get()
  findAll() {
    return this.equipoSoftwareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoSoftwareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoSoftwareDto: UpdateEquipoSoftwareDto) {
    return this.equipoSoftwareService.update(+id, updateEquipoSoftwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoSoftwareService.remove(+id);
  }
}
