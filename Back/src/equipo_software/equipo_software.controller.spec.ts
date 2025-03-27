import { Test, TestingModule } from '@nestjs/testing';
import { EquipoSoftwareController } from './equipo_software.controller';
import { EquipoSoftwareService } from './equipo_software.service';

describe('EquipoSoftwareController', () => {
  let controller: EquipoSoftwareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipoSoftwareController],
      providers: [EquipoSoftwareService],
    }).compile();

    controller = module.get<EquipoSoftwareController>(EquipoSoftwareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
