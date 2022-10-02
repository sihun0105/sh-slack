import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorksaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}
  @Get()
  getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyworksapces(user.id);
  }

  @Post()
  createWorkspace(@User() user: Users, @Body() body: CreateWorksaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Get(':url/members')
  inviteMembersToWorkspace() {}

  @Delete('url/members/:id')
  kickMemberFromWorkspace() {}

  @Get('url/users/:id')
  getMemberInfoInWorkspace() {}
}
