import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // Ajusta el puerto según tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
