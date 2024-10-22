import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(id)
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new order'
  })
  @ApiBearerAuth()
  @ApiBody({schema: {
    example: {
      user_id: 'A user id',
      products: [{'id': 'A product id'}]
    }
  }})
  @UseGuards(AuthGuard)
  async createOrder(@Body() data: CreateOrderDto){
    console.log(data)
    return await this.ordersService.addOrder(data)
  }

}
