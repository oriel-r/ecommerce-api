import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotennConfig } from 'dotenv'
import { registerAs } from '@nestjs/config';


dotennConfig({path: '.env.development'})

const dataSourceConfig: DataSourceOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities:  ['dist/**/*.entity{.ts,.js}'],
        logging: ['error'],
        synchronize: true,
};

export default registerAs('typeorm', () => dataSourceConfig)

export const connectionSource = new DataSource(dataSourceConfig)