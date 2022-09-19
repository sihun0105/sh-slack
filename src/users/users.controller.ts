import { Body, Controller, Get, Post, Req, Res, } from '@nestjs/common';
import { ApiBadGatewayResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
    constructor(private userService : UsersService){}
    
    @ApiResponse({
        type : UserDto,
    })
    @ApiOperation({summary : '내 정보 조회'})
    @Get()
    getUers(@User() user) {
        return user;
    }

    @ApiOperation({summary : '회원가입'})
    @Post()
    postUsers(@Body() data : JoinRequestDto){
        this.userService.postUsers(data.email,data.nickname, data.password);
    }

    @ApiOkResponse({
        type : UserDto,
        description : '성공',
    })
    @ApiBadGatewayResponse({
        description : '서버 에러'
    })
    @ApiOperation({summary : '로그인'})
    @Post('login')
    logIn(@User() user){
        return user;
    }

    @ApiOperation({summary : '로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res){
        req.logout();
        res.clearCookie('connect.sid', {httpOnly : true});
        res.send('ok');
    }
}
