import { Body, Controller, Get, Post, Req, Res, } from '@nestjs/common';
import { Request, Response } from 'express';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @Get()
    getUers(@Req() req : Request) {
        return req.body.user;
    }
    @Post()
    postUsers(@Body() data : JoinRequestDto){
        this.userService.postUsers(data.email,data.nickname, data.password);
    }
    
    @Post('login')
    logIn(){

    }

    @Post('logout')
    logOut(@Req() req : Request, @Res() res : Response){
        req.body.logout();
        res.clearCookie('connect.sid', {httpOnly : true});
        res.send('ok');
    }
}
