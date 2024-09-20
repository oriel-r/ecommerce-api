import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsServices } from './prooducts.service';
import { ReqBodyChecker } from 'src/middlewares/req.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule],
  providers: [ ProductsServices, ProductsRepository, ReqBodyChecker, CategoriesService ],
  controllers: [ ProductsController ],
  exports: [ProductsServices, ProductsRepository]
})
 export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqBodyChecker)
      .forRoutes(
        //{ path: 'products', method: RequestMethod.POST },
        //{ path: 'products', method: RequestMethod.PUT },
      );
  }
}
