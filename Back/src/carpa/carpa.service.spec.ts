import { Test, TestingModule } from '@nestjs/testing';
import { CarpaService } from './carpa.service';

describe('CarpaService', () => {
  let service: CarpaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpaService],
    }).compile();

    service = module.get<CarpaService>(CarpaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
