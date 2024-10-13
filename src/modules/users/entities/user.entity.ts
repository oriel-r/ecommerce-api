import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    description: "Autogenerated UUID"
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: 'varchar',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    type: 'varchar',
    maxLength: 50,
    uniqueItems: true
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;


  @ApiProperty({
    description: 'Hasherd password',
    type: 'varchar'
  })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({
    default: false
  })
  @Column({default: false})
  is_admin: boolean

  @ApiProperty({
    type: 'integer'
  })
  @Column({ type: 'integer' })
  phone: number;
  
  @ApiProperty({
    type: 'varchar',
    nullable: false
  })
  @Column({ type: 'varchar' })
  adress: string;


  @ApiProperty({
    type: 'varchar',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  country?: string | undefined;


  @ApiProperty({
    type: 'varchar',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  city?: string | undefined;

  @ApiProperty({
    description: '1:N relation with order'
  })
  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];
}
