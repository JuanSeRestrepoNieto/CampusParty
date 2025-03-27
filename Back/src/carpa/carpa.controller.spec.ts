import { Test, TestingModule } from '@nestjs/testing';
import { CarpaController } from './carpa.controller';
import { CarpaService } from './carpa.service';

describe('CarpaController', () => {
  let controller: CarpaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarpaController],
      providers: [CarpaService],
    }).compile();

    controller = module.get<CarpaController>(CarpaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
