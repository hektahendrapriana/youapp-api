import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import validator from 'validator';
import { User, UserDocument } from '../../users/schemas/user.schema';

export type ChatDocument = Chat & Document;

@Schema( {timestamps: true} )
export class Chat {
    @Prop({ required: true })
    channel: string;

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    id_from: MongooseSchema.Types.ObjectId;

    @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'User' })
    id_to: MongooseSchema.Types.ObjectId;

    @Prop({ required: false })
    messages: string;

    @Prop({ required: false, enum: ['Read', 'Unread'],
    default: 'Unread' })
    status: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
