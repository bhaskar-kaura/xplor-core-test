import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItem {
  @IsArray()
  @IsString({ each: true })
  itemsId: string[];

  @IsString()
  providerId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fulfillmentId?: string[];
}

class Message {
  @ValidateNested()
  @Type(() => OrderItem)
  order: OrderItem;
}

class Context {
  @IsString()
  transactionId: string;

  @IsString()
  domain: string;

  @IsString()
  messageId: string;

  @IsOptional()
  ttl: string;
}

export class SelectRequestDto {
  @ValidateNested()
  @Type(() => Context)
  context: Context;

  @ValidateNested()
  @Type(() => Message)
  message: Message;
}
