import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { EquipoPc } from '../../equipo_pc/entities/equipo_pc.entity';
import { Software } from '../../software/entities/software.entity';

@Entity('equipo_software')
export class EquipoSoftware {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EquipoPc, (equipo) => equipo.software)
  equipo: EquipoPc;

  @ManyToOne(() => Software, (software) => software.equipos)
  software: Software;

  @Column({ type: 'timestamp' })
  instalado_el: Date;

  @Column({
    type: 'enum',
    enum: ['funcional', 'con_problemas', 'no_funcional'],
    default: 'funcional',
  })
  estado: string;

  @CreateDateColumn()
  created_at: Date;
}
