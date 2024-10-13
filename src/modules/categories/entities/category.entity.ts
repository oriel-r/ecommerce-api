import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({
    description: 'autogenerated uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'varchar',
    maxLength: 50,
    nullable: false
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Relation with productos, N:1',
    nullable: true,
  })
  @ManyToOne(() => Product, (product) => product.category, {
    nullable: true,
  })
  products: Product[];
}
