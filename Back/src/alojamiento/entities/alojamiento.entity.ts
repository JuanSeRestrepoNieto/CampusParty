import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Campusero } from '../../campuseros/entities/campusero.entity';
import { Hotel } from '../../hotel/entities/hotel.entity';

@Entity('alojamientos')
export class Alojamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Campusero, (campusero) => campusero.alojamientos)
  campusero: Campusero;

  @ManyToOne(() => Hotel, (hotel) => hotel.alojamientos)
  hotel: Hotel;

  @Column()
  tipo: string;

  @Column({ type: 'timestamp', nullable: true })
  check_in: Date;

  @Column({ type: 'timestamp', nullable: true })
  check_out: Date;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente',
  })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
