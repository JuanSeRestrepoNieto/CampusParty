import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Alojamiento } from '../../alojamiento/entities/alojamiento.entity';

@Entity('hoteles')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tarifa_especial: number;

  @Column()
  ubicacion: string;

  @Column()
  capacidad: number;

  @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.hotel)
  alojamientos: Alojamiento[];

  @CreateDateColumn()
  created_at: Date;
}