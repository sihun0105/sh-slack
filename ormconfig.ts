import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entities/ChannelChats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Channels } from './src/entities/Channels';
import { DMs } from './src/entities/DMs';
import { Mentions } from './src/entities/Mentions';
import { Users } from './src/entities/Users';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Workspaces } from './src/entities/Workspaces';
dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  // migrations: [__dirname + '/src/migrations/*.ts'],
  // cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true, //개발환경일 때 만 한번만 돌리고 false해야댐 아니면 DB다시 만들어서 데이터 날라감 주의!!!!
  logging: true,
  keepConnectionAlive: true,
};

export = config;
