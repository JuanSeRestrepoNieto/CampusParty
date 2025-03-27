import { Module } from '@nestjs/common';
import { CampuserosModule } from './campuseros/campuseros.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { HotelModule } from './hotel/hotel.module';
import { PabellonModule } from './pabellon/pabellon.module';
import { CarpaModule } from './carpa/carpa.module';
import { EquipoPcModule } from './equipo_pc/equipo_pc.module';
import { EquipoSoftwareModule } from './equipo_software/equipo_software.module';
import { SoftwareModule } from './software/software.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? "5432", 10),
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'secret',
      database: process.env.DB_NAME || 'campusparty',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Solo en desarrollo, en producción usa migraciones
    }),
    CampuserosModule,
    AuthModule,
    VehiculoModule,
    HotelModule,
    PabellonModule,
    CarpaModule,
    EquipoPcModule,
    EquipoSoftwareModule,
    SoftwareModule,
  ]
})
export class AppModule {}
