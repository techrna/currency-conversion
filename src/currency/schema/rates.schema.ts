
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Mixed } from 'mongoose';

export type RateDocument = Rate & Document;

@Schema()
export class Rate {
  @Prop()
  base: string;
  @Prop()
  desc: string;
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: {} })
  rates: Mixed;
}

export const RateSchema = SchemaFactory.createForClass(Rate);