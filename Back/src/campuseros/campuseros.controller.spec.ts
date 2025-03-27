import { Test, TestingModule } from '@nestjs/testing';
import { CampuserosController } from './campuseros.controller';
import { CampuserosService } from './campuseros.service';

describe('CampuserosController', () => {
  let controller: CampuserosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampuserosController],
      providers: [CampuserosService],
    }).compile();

    controller = module.get<CampuserosController>(CampuserosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
