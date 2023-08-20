import { AppDataSource } from './data-source';
import 'reflect-metadata';

export const connectBD = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations(); // автоматический запуск миграций при старте
  } catch (error) {
    console.log(error);
  }
};