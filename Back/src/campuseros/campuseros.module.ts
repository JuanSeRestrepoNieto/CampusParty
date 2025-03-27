import { Module } from '@nestjs/common';
import { CampuserosService } from './campuseros.service';
import { CampuserosController } from './campuseros.controller';

@Module({
  controllers: [CampuserosController],
  providers: [CampuserosService],
})
export class CampuserosModule {}
