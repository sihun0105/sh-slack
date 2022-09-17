import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspace/:url/channels')
export class ChannelsController {
    @Get()
    getAllChannels(){

    }

    @Post()
    createChannel(){

    }

    @Get(':name')
    getSpecificChannel(){

    }
    
    @Get(':name/chats')
    getChats(@Query() query, @Param() param){
        console.log(query);
        console.log(param);
    }
    
    @Post(':name/chats')
    postChat(){

    }

    @Get(':name/members')
    getAllmembers(){

    }

    @Post(':name/members')
    invitemembers(){
        
    }
    
}
