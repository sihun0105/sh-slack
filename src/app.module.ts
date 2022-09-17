import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), UsersModule, ChannelsModule, DmsModule, WorkspacesModule],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
