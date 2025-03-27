import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPcController } from './equipo_pc.controller';
import { EquipoPcService } from './equipo_pc.service';

describe('EquipoPcController', () => {
  let controller: EquipoPcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoPcController],
      providers: [EquipoPcService],
    }).compile();

    controller = module.get<EquipoPcController>(EquipoPcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
