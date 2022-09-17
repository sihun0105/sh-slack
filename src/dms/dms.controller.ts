import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('dms')
export class DmsController {
    @Get(':id/chats')
    getChat(@Query() query, @Param() param){
        console.log(query);
        console.log(param);
    }
    
    @Post(':id/chats')
    postChat(){

    }
}
