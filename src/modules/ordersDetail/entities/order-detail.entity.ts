  import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderDetail {
  @ApiProperty({
    description: 'Autogenerated uuid'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Final order cost',
    type: 'decimal, precision 10, scale 2',
    nullable: false
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: "1:1 relation with order"
  })
  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToMany(() => Product, (product) => product.order_detail)
  products: Product[];
}
