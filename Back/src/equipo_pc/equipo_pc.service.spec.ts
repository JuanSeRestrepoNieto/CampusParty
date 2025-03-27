import { Test, TestingModule } from '@nestjs/testing';
import { EquipoPcService } from './equipo_pc.service';

describe('EquipoPcService', () => {
  let service: EquipoPcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipoPcService],
    }).compile();

    service = module.get<EquipoPcService>(EquipoPcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
