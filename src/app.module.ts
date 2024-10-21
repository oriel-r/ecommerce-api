import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import typeormConfig from './config/data-source'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsModule } from './seeds/seeds.module';
import { OrdersDetailModule } from './modules/ordersDetail/ordersDetail.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from './modules/shared/shared.module';
import * as dotenv from "dotenv"

dotenv.config({path:"env.development.local"})


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    OrdersDetailModule,
    SeedsModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      signOptions: {expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    }),
    SharedModule
  ],
  controllers: [],
  providers: [CloudinaryService ],
})
export class AppModule {}
