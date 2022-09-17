import { Controller,Delete,Get, Post } from '@nestjs/common';

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
