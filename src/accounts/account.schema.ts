import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  type: string;

  @Prop({ type: Object })
  @Field(() => ID, { nullable: true })
  vendorId?: string;

  @Prop({ type: Object, default: {} })
  @Field(() => ID, { nullable: true })
  metadata?: Record<string, unknown>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
