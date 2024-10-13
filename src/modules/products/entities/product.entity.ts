import { OrderDetail } from 'src/modules/ordersDetail/entities/order-detail.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({
    description: 'Atuogererated uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: "Product's name",
    type: "varchar",
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: "Product's description",
    type: 'varchar',
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    description: "Product's price",
    type: "decimal, precision 10, scale 2",
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: "Quantity avalible of products",
    type: 'integer'
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: "An unique product's image url",
    default: "By default is added 'No image' image from svg.repo"
  })
  @Column({ type: 'text', default: 'https://www.svgrepo.com/show/532577/image-square-xmark.svgs' })
  imgUrl: string;

  @ApiProperty({
    description: "Category's id, a full category data is added in Create product process"
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    description: 'N:N relation with orderDetail'
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  @JoinTable()
  order_detail: OrderDetail[];
}
