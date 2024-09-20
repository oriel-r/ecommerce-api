import { Controller } from "@nestjs/common";
import { OrdersDetailService } from "./ordersDetail.service";

@Controller()
export class OrdersDetailController {
    constructor(private readonly ordersDetailService: OrdersDetailService) {}
}