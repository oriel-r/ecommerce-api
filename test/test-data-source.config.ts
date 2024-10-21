import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmTestConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities:  [__dirname + '../**/*.entity{.ts,.js}'],
    synchronize: true
}

export const TypeOrmTestModule = TypeOrmModule.forRoot(typeOrmTestConfig)A