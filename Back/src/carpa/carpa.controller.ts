import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarpaService } from './carpa.service';
import { CreateCarpaDto } from './dto/create-carpa.dto';
import { UpdateCarpaDto } from './dto/update-carpa.dto';

@Controller('carpa')
export class CarpaController {
  constructor(private readonly carpaService: CarpaService) {}

  @Post()
  create(@Body() createCarpaDto: CreateCarpaDto) {
    return this.carpaService.create(createCarpaDto);
  }

  @Get()
  findAll() {
    return this.carpaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carpaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarpaDto: UpdateCarpaDto) {
    return this.carpaService.update(+id, updateCarpaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carpaService.remove(+id);
  }
}
