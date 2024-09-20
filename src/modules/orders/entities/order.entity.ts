import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from '../../ordersDetail/entities/orderDetail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user_id: User;

  @Column('date')
  date: Date;

  @OneToOne(() => OrderDetail)
  @JoinColumn()
  order_detail: OrderDetail;
}
