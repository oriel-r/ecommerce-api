import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "../ordersDetail/entities/order-detail.entity";
import { OrderDto } from "./entities/order.dto";
 

@Injectable()
export class OrdersReposiroy {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ) {}

    async getOrders() {
        return await this.orderRepository.find({relations:["user_id", "order_detail"]})
    }
    
    async getOrderById(id:string) {
        return await this.orderRepository.findOneBy({id})
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
