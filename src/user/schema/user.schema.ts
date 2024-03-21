// src/user/enums/auth-method.enum.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EAuth, Persona, UserDetails } from '../interfaces/user-details.interface';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Object })
  userDetails: UserDetails;

  @Prop({ required: true, type: Object })
  persona: Persona;

  @Prop({ type: Object })
  eAuth: EAuth;

  @Prop({ type: Object })
  walletId: string;

  @Prop({ type: [String] })
  documentId: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
