import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "../ordersDetail/entities/orderDetail.entity";
import { Product } from "../products/entities/product.entity";
import { OrderDetailDTO } from "../ordersDetail/entities/OrderDetailDto";
import { addtionProducts } from "src/helpers/orderDetailAddition";
import { OrderDto } from "./entities/OrderDto";
import { IOrder } from "./entities/IOrder";
 

@Injectable()
export class OrdersReposiroy {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>
    ) {}

    async getOrders() {
        return await this.orderRepository.find({relations:["user_id", "order_detail"]})
    }
    

    async createOrder(data: OrderDto): Promise <Order> {
        const order = this.orderRepository.create(data)
        await this.orderRepository.save(order)
        return order
    }

    async updateOrder(id:string, data:OrderDetail) {
        const order = await this.orderRepository.update(id, {order_detail: data})
        return
    }
    
}
