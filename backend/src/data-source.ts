import { DataSource } from 'typeorm';
import { Locker } from './entities/Locker';
import { Order } from './entities/Order';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // 'db' when running in docker-compose, 'localhost' otherwise
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'rappi_lockers',
  synchronize: true, // WARNING: Set to false in production and use migrations
  logging: true,
  entities: [Locker, Order],
  migrations: [],
  subscribers: [],
});
