import { Test, TestingModule } from '@nestjs/testing';
import { PabellonController } from './pabellon.controller';
import { PabellonService } from './pabellon.service';
import { CreatePabellonDto } from './dto/create-pabellon.dto';
import { UpdatePabellonDto } from './dto/update-pabellon.dto';

describe('PabellonController', () => {
  let controller: PabellonController;
  let service: PabellonService;

  const mockPabellonService = {
    create: jest.fn(dto => ({ id: 1, ...dto })),
    findAll: jest.fn(() => [{ id: 1, nombre: 'Pabellon A' }]),
    findOne: jest.fn(id => ({ id, nombre: 'Pabellon A' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PabellonController],
      providers: [{ provide: PabellonService, useValue: mockPabellonService }],
    }).compile();

    controller = module.get<PabellonController>(PabellonController);
    service = module.get<PabellonService>(PabellonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a pabellon', async () => {
    const dto: CreatePabellonDto = { 
      nombre: 'Tech Hall', tematica: 'Tech', area: 100, ubicacion: 'Zone A', capacidad: 200 
    };

    expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all pabellones', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, nombre: 'Pabellon A' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single pabellon', async () => {
    expect(await controller.findOne('1')).toEqual({ id: 1, nombre: 'Pabellon A' });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a pabellon', async () => {
    const dto: UpdatePabellonDto = { nombre: 'Updated Hall' };

    expect(await controller.update('1', dto)).toEqual({ id: 1, ...dto });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a pabellon', async () => {
    expect(await controller.remove('1')).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
