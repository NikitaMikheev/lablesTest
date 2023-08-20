import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { Lables } from './model/entity/Lables';
import { Entities } from './model/entity/Entities';


dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const AppDataSource = new DataSource({ // подключение к базе данных, настройка миграций. Данные берутся из переменных окружения
  type: 'postgres',
  host: String(process.env.POSTGRES_HOST),
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [Lables, Entities],
  migrations: [path.join(__dirname, '/model/migrations/*.ts')],
  subscribers: [],
});
