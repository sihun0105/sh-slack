import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedTonullInterceptor } from 'src/common/interceptors/undefinedTonull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local-auth-guard';

@UseInterceptors(UndefinedTonullInterceptor) //컨트롤러 전체에 undefined가 들어오면 null로 변환
@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  getUers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() body: JoinRequestDto) {
    await this.userService.join(body.email, body.nickname, body.password);
  }

  @ApiOkResponse({
    type: UserDto,
    description: '성공',
  })
  @ApiBadGatewayResponse({
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
