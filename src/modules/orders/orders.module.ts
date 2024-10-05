import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../ordersDetail/entities/order-detail.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProductsServices } from '../products/prooducts.service';
import { OrdersReposiroy } from './orders.repository';
import { Category } from '../categories/entities/category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { OrdersDetailModule } from '../ordersDetail/ordersDetail.module';
import { OrdersDetailService } from '../ordersDetail/ordersDetail.service';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, User, Product]),
    UsersModule, ProductsModule, CategoriesModule, OrdersDetailModule, FileUploadModule
  ],
  providers: [
    OrdersService, 
    UsersService, 
    ProductsServices,
    OrdersDetailService, 
    OrdersReposiroy 
  ],
  controllers: [ OrdersController ],
})
export class OrdersModule {}
