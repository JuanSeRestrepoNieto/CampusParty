import { Test, TestingModule } from '@nestjs/testing';
import { PabellonService } from './pabellon.service';
import { Repository } from 'typeorm';
import { Pabellon } from './entities/pabellon.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePabellonDto } from './dto/create-pabellon.dto';
import { UpdatePabellonDto } from './dto/update-pabellon.dto';
import { validateOrReject } from 'class-validator';

describe('PabellonService', () => {
  let service: PabellonService;
  let repository: Repository<Pabellon>;

  const mockPabellonRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PabellonService,
        {
          provide: getRepositoryToken(Pabellon),
          useValue: mockPabellonRepository,
        },
      ],
    }).compile();

    service = module.get<PabellonService>(PabellonService);
    repository = module.get<Repository<Pabellon>>(getRepositoryToken(Pabellon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a pabellon', async () => {
    const dto: CreatePabellonDto = {
      nombre: 'Test',
      tematica: 'Fiesta',
      area: 100,
      ubicacion: 'Zona A',
      capacidad: 50,
    };
    mockPabellonRepository.save.mockResolvedValue(dto);

    expect(await service.create(dto)).toEqual(dto);
    expect(mockPabellonRepository.save).toHaveBeenCalledWith(dto);
  });

  it('should find all pabellones', async () => {
    const pabellones = [{ id: 1, nombre: 'Test' }];
    mockPabellonRepository.find.mockResolvedValue(pabellones);

    expect(await service.findAll()).toEqual(pabellones);
    expect(mockPabellonRepository.find).toHaveBeenCalled();
  });

  it('should find one pabellon by ID', async () => {
    const pabellon = { id: 1, nombre: 'Test' };
    mockPabellonRepository.findOne.mockResolvedValue(pabellon);

    expect(await service.findOne(1)).toEqual(pabellon);
    expect(mockPabellonRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a pabellon', async () => {
    const updateDto: UpdatePabellonDto = { nombre: 'Updated Name' };
    mockPabellonRepository.update.mockResolvedValue({ affected: 1 });

    expect(await service.update(1, updateDto)).toEqual({ affected: 1 });
    expect(mockPabellonRepository.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should remove a pabellon', async () => {
    mockPabellonRepository.delete.mockResolvedValue({ affected: 1 });

    expect(await service.remove(1)).toEqual({ affected: 1 });
    expect(mockPabellonRepository.delete).toHaveBeenCalledWith(1);
  });

  // Business rule tests

  it('should not allow duplicate pabellon names', async () => {
    const dto: CreatePabellonDto = { nombre: 'Fiesta Hall', tematica: 'Music', area: 100, ubicacion: 'Zone B', capacidad: 200 };
    mockPabellonRepository.findOne.mockResolvedValue(dto);

    await expect(service.create(dto)).rejects.toThrow('Pabellon with this name already exists');
  });

  it('should not delete pabellon if it has associated carpas', async () => {
    mockPabellonRepository.findOne.mockResolvedValue({ id: 1, carpa: [{}] });
    mockPabellonRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow('Cannot delete pabellon with associated carpas');
  });

  it('should return null if pabellon not found', async () => {
    mockPabellonRepository.findOne.mockResolvedValue(null);

    expect(await service.findOne(999)).toBeNull();
  });
});