import { Test, TestingModule } from '@nestjs/testing';
import { EquipoSoftwareService } from './equipo_software.service';

describe('EquipoSoftwareService', () => {
  let service: EquipoSoftwareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoSoftwareService],
    }).compile();

    service = module.get<EquipoSoftwareService>(EquipoSoftwareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
