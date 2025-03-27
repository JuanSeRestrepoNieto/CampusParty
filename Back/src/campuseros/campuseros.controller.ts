import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampuserosService } from './campuseros.service';
import { CreateCampuseroDto } from './dto/create-campusero.dto';
import { UpdateCampuseroDto } from './dto/update-campusero.dto';

@Controller('campuseros')
export class CampuserosController {
  constructor(private readonly campuserosService: CampuserosService) {}

  @Post()
  create(@Body() createCampuseroDto: CreateCampuseroDto) {
    return this.campuserosService.create(createCampuseroDto);
  }

  @Get()
  findAll() {
    return this.campuserosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campuserosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampuseroDto: UpdateCampuseroDto) {
    return this.campuserosService.update(+id, updateCampuseroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campuserosService.remove(+id);
  }
}
