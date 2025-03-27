import { Test, TestingModule } from '@nestjs/testing';
import { CampuserosService } from './campuseros.service';

describe('CampuserosService', () => {
  let service: CampuserosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampuserosService],
    }).compile();

    service = module.get<CampuserosService>(CampuserosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
