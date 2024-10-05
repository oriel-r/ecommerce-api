import { Module } from "@nestjs/common";
import { OrdersDetailController } from "./ordersDetail.controller";
import { OrdersDetailService } from "./ordersDetail.service";
import { OrdersDetailRepository } from "./ordersDetail.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/order-detail.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [OrdersDetailController],
    providers: [OrdersDetailService, OrdersDetailRepository],
    exports: [OrdersDetailService, OrdersDetailRepository]
})
export class OrdersDetailModule {}
