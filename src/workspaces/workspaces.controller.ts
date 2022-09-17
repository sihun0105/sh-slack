import { Controller,Delete,Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {

    @Get()
    getMyWorkspaces(){

    }

    @Post()
    createWorkspace(){

    }

    @Get(':url/members')
    getAllMembersFromWorkspace(){

    }

    @Get(':url/members')
    inviteMembersToWorkspace(){

    }

    @Delete('url/members/:id')
    kickMemberFromWorkspace(){

    }

    @Get('url/users/:id')
    getMemberInfoInWorkspace() {

    }

}
