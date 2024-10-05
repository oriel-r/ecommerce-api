import { Controller } from "@nestjs/common";
import { OrdersDetailService } from "./ordersDetail.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Order Detail')
@Controller()
export class OrdersDetailController {
    constructor(private readonly ordersDetailService: OrdersDetailService) {}
}