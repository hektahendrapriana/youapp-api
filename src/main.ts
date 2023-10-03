import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  const user = configService.get<string>('RABBITMQ_USER');
  const password = configService.get<string>('RABBITMQ_PASS');
  const host = configService.get<string>('RABBITMQ_HOST');
  const queueName = configService.get<string>('RABBITMQ_QUEUE_NAME');
  
  await app.listen(3000);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
 
  app.startAllMicroservices();
}
bootstrap();
