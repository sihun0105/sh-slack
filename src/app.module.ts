import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { Users } from './entities/Users';
import { MorganModule } from 'nest-morgan';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    AuthModule,
    UsersModule,
    ChannelsModule,
    DmsModule,
    WorkspacesModule,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Users]),
    MorganModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
