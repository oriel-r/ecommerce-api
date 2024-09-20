import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../ordersDetail/entities/orderDetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersReposiroy } from './orders.repository';
import { OrderDto } from './entities/OrderDto';
import { UsersService } from '../users/users.service';
import { ProductsServices } from '../products/prooducts.service';
import { User } from '../users/entities/user.entity';
import { OrdersDetailService } from '../ordersDetail/ordersDetail.service';
import { CreateOrderDto } from './entities/createOrderDto';

@Injectable()
export class OrdersService {
  constructor(
  private readonly ordersRepository: OrdersReposiroy,
  private readonly usersService: UsersService,
  private readonly productsService : ProductsServices,
  private readonly ordersDetailService: OrdersDetailService
) {}

  getOrders() {
    return this.ordersRepository.getOrders()
  }

  async addOrder(data:CreateOrderDto) {
    const user = await this.usersService.getUserForOrder(data.userId)
    const products = await this.productsService.getProductsList(data.products)
    if(user && products.length > 0) {
      const date = new Date
      const order = await this.ordersRepository.createOrder({userId: user, date})
      const orderDetail = await this.ordersDetailService.createOrderDetail({order, products})
      await this.ordersRepository.updateOrder(order.id, orderDetail)
      return orderDetail
    }
    else throw new HttpException('Algo salio mal', HttpStatus.BAD_REQUEST)
  }


}
