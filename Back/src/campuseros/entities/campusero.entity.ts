import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Alojamiento } from '../../alojamiento/entities/alojamiento.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';

@Entity('campuseros')
export class Campusero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  ciudad_origen_id: number;

  @Column({ nullable: true })
  carpa_id: number;

  @Column({ nullable: true })
  pabellon_id: number;

  @Column({ nullable: true })
  vehiculo_id: number;

  @OneToMany(() => Alojamiento, (alojamiento) => alojamiento.campusero)
  alojamientos: Alojamiento[];

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.campusero)
  vehiculos: Vehiculo[];

  @CreateDateColumn()
  created_at: Date;
}
