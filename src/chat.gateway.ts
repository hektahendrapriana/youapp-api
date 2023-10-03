import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common'
import { CreateChatDto } from './chat/dto/create-chat.dto';
 import { Socket, Server } from 'socket.io';
 import { ChatService } from './chat/chat.service';
 
 @WebSocketGateway({
   cors: {
     origin: '*',
   },
 })
 export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
 
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: CreateChatDto): Promise<void>    {
    await this.chatService.sendMessage(payload);
    this.server.emit('msgToClient', payload);
  }
 
  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}