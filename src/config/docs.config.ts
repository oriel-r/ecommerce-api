import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('E-commerce RESTful API')
.setDescription('This is a RESTful API built with NestJS, designed to provide CRUD endpoints for an e-commerce website or application')
.setVersion('1.0')
.addBearerAuth()
.build()