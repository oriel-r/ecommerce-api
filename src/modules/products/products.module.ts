import {
  MiddlewareConsumer,
  Module,
  NestModule,
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
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), CategoriesModule, FileUploadModule],
  providers: [ ProductsServices, ProductsRepository, ReqBodyChecker, CategoriesService, FileUploadService ],
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
