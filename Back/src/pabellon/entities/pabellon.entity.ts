import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Carpa } from '../../carpa/entities/carpa.entity';

@Entity('pabellones')
export class Pabellon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tematica: string;

  @Column()
  area: number;

  @Column()
  ubicacion: string;

  @Column()
  capacidad: number;

  @OneToMany(() => Carpa, (carpa) => carpa.pabellon)
  carpa: Carpa[];

  @CreateDateColumn()
  created_at: Date;
}
