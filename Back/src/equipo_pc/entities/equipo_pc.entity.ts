import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { EquipoSoftware } from '../../equipo_software/entities/equipo_software.entity';

@Entity('equipo_pc')
export class EquipoPc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  procesador: string;

  @Column()
  memoria_ram: number;

  @Column()
  almacenamiento: number;

  @Column()
  sistema_operativo: string;

  @Column()
  estado: string;

  @OneToMany(() => EquipoSoftware, (equipoSoftware) => equipoSoftware.equipo)
  software: EquipoSoftware[];

  @CreateDateColumn()
  created_at: Date;
}
