import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ 
    required: true, 
    validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
    },
    lowercase: true,
    unique: true,
})
    email: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: false, unique: false })
    name: string;

    @Prop({ required: false, unique: false })
    birthday: string;

    @Prop({ required: false, unique: false })
    horoscope: string;

    @Prop({ required: false, unique: false })
    zodiac: string;

    @Prop({ required: false, unique: false })
    height: number;

    @Prop({ required: false, unique: false })
    weight: number;

    @Prop({ required: false, unique: false })
    interests: [string];

    @Prop({ required: true })
    password: string;

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
