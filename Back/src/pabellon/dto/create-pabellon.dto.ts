import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreatePabellonDto {
  @IsString()
  nombre: string;

  @IsString()
  tematica: string;

  @IsInt()
  area: number;

  @IsString()
  ubicacion: string;

  @IsInt()
  @Min(10)  // Minimum capacity
  @Max(1000) // Maximum capacity
  capacidad: number;
}
