import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { Category } from 'src/modules/categories/entities/category.entity';
import { DeepPartial } from 'typeorm';

export class ProductDTO {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number

  @IsUrl()
  @IsOptional()
  imgUrl: string

  @IsNotEmpty()
  @IsString()
  category_id: string;

  constructor(partial: DeepPartial<ProductDTO>) {
    Object.assign(this, partial)
    
  }
}