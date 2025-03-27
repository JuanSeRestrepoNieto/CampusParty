import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Pabellon } from '../../pabellon/entities/pabellon.entity';

@Entity('carpas')
export class Carpa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @ManyToOne(() => Pabellon, (pabellon) => pabellon.carpa)
  pabellon: Pabellon;

  @Column()
  capacidad: number;

  @Column({
    type: 'enum',
    enum: ['disponible', 'ocupado', 'mantenimiento'],
    default: 'disponible',
  })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
