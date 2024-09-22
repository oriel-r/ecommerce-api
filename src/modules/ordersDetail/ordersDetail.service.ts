import { Injectable } from "@nestjs/common";
import { OrdersDetailRepository } from "./ordersDetail.repository";
import { OrderDetailDTO } from "./entities/OrderDetailDto";

@Injectable()
export class OrdersDetailService {
    constructor(private readonly ordersRepository: OrdersDetailRepository) {}

    async createOrderDetail(data: OrderDetailDTO) {
        return await this.ordersRepository.createOrderDetail(data)
    }
}