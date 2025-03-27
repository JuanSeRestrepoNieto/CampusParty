import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { EquipoSoftware } from '../../equipo_software/entities/equipo_software.entity';

@Entity('software')
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: ['Sistema Operativo', 'Aplicacion', 'Juego', 'Herramienta'],
  })
  tipo: string;

  @Column()
  version: string;

  @Column('text')
  requisitos_sistema: string;

  @Column({
    type: 'enum',
    enum: ['gratis', 'pago', 'licencia'],
    default: 'gratis',
  })
  licencia: string;

  @OneToMany(() => EquipoSoftware, (equipoSoftware) => equipoSoftware.software)
  equipos: EquipoSoftware[];

  @CreateDateColumn()
  created_at: Date;
}
