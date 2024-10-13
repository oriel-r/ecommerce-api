import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './entities/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Get all orders'
  })
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new order'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async createOrder(@Body() data: CreateOrderDto){
    return await this.ordersService.addOrder(data)
  }

}
