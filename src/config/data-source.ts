import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotennConfig } from 'dotenv'
import { registerAs } from '@nestjs/config';


dotennConfig({path: '.env.development.local'})

const dataSourceConfig: DataSourceOptions = {
        type: 'sqlite',
        database: process.env.DB_NAME,
        key: process.env.DB_PASSWORD,
        entities:  ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/migration/*{.ts,.js}'],
        logging: ['error'],
        synchronize: true,
        dropSchema: true,
}

export default registerAs('typeorm', () => dataSourceConfig)

export const connectionSource = new DataSource(dataSourceConfig)
