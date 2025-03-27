import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Campusero } from '../../campuseros/entities/campusero.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Carro', 'Moto', 'Bicicleta'],
  })
  tipo: string;

  @Column({ unique: true })
  placa: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  año: number;

  @Column({
    type: 'enum',
    enum: ['vigente', 'caducado', 'suspendido'],
    default: 'vigente',
  })
  estado: string;

  @ManyToOne(() => Campusero, (campusero) => campusero.vehiculos)
  campusero: Campusero;

  @CreateDateColumn()
  created_at: Date;
}
