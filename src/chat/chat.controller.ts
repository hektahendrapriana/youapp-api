import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AccessTokenGuard)
  @Post('sendMessage')
  send(@Req() req: Request, @Body() createChatDto: CreateChatDto) {
    createChatDto.id_from = req.user['sub'];
    return this.chatService.sendMessage(createChatDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('viewMessages')
  findByChannelName(@Param('channel') channel: string) {
    return this.chatService.findByChannelName(channel);
  }

}