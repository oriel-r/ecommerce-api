import { Module } from "@nestjs/common";
import { OrdersDetailController } from "./ordersDetail.controller";
import { OrdersDetailService } from "./ordersDetail.service";
import { OrdersDetailRepository } from "./ordersDetail.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/orderDetail.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [OrdersDetailController],
    providers: [OrdersDetailService, OrdersDetailRepository],
    exports: [OrdersDetailService, OrdersDetailRepository]
})
export class OrdersDetailModule {}
