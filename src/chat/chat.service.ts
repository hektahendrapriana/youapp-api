import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>, 
  private configService: ConfigService) {}
  async sendMessage(createChatDto: CreateChatDto): Promise<ChatDocument> {
    
    const user = this.configService.get<string>('RABBITMQ_USER');
    const password = this.configService.get<string>('RABBITMQ_PASS');
    const host = this.configService.get<string>('RABBITMQ_HOST');
    const queueName = this.configService.get<string>('RABBITMQ_QUEUE_NAME');

    const createdChat = new this.chatModel(createChatDto);

    await ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    });

    return await createdChat.save();
  }

  async findById(id: string): Promise<ChatDocument> {
    return this.chatModel.findById(id);
  }

  async findByChannelName(channel: string): Promise<ChatDocument[]> {
    return await this.chatModel.find({ channle: channel }).exec();
  }

}