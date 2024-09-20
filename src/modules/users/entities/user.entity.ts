import { Order } from 'src/modules/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password: string;

  @Column({ type: 'integer' })
  phone: number;

  @Column({ type: 'varchar' })
  adress: string;

  @Column({ type: 'varchar', length: 50 })
  country?: string | undefined;

  @Column({ type: 'varchar', length: 50 })
  city?: string | undefined;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
