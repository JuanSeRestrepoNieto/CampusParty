import { validate } from 'class-validator';
import { CreatePabellonDto } from './create-pabellon.dto';

describe('CreatePabellonDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 'Pabellon A';
    dto.tematica = 'Tech';
    dto.area = 500;
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 100;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No errors expected
  });

  it('should fail if nombre is not a string', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 123 as any; // Invalid type
    dto.tematica = 'Tech';
    dto.area = 500;
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('nombre');
  });

  it('should fail if tematica is missing', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 'Pabellon A';
    dto.area = 500;
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'tematica')).toBeTruthy();
  });

  it('should fail if area is not an integer', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 'Pabellon A';
    dto.tematica = 'Tech';
    dto.area = 'invalid' as any; // Invalid type
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'area')).toBeTruthy();
  });

  it('should fail if capacidad is below 10', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 'Pabellon A';
    dto.tematica = 'Tech';
    dto.area = 500;
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 5; // Below minimum

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'capacidad')).toBeTruthy();
  });

  it('should fail if capacidad is above 1000', async () => {
    const dto = new CreatePabellonDto();
    dto.nombre = 'Pabellon A';
    dto.tematica = 'Tech';
    dto.area = 500;
    dto.ubicacion = 'Zone 1';
    dto.capacidad = 1500; // Above maximum

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'capacidad')).toBeTruthy();
  });
});
