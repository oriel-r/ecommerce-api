import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/order-detail.entity";
import { Repository } from "typeorm";
import { OrderDetailDTO } from "./entities/order-detail.dto";
import { addtionProducts } from "src/helpers/orderDetailAddition";

@Injectable()
export class OrdersDetailRepository {
    constructor(
        @InjectRepository(OrderDetail) private readonly ordersDetailRepository: Repository <OrderDetail>
    ) {}

    async createOrderDetail({products, order}: OrderDetailDTO) {
        const price: number = addtionProducts(products)
        const orderDetail = await this.ordersDetailRepository.create({
            price,
            order,
            products
        })
        await this.ordersDetailRepository.save(orderDetail)
        return orderDetail
    }
}