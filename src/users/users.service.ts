import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      //이메일 적었는지 확인
      throw new HttpException('이메일이 없네용', 400);
    }
    if (!nickname) {
      // 닉네임 적었는지 확인
      throw new HttpException('nickname이 없네용', 400);
    }
    if (!password) {
      // 비밀번호 적었는지 확인
      throw new HttpException('password가 없네용', 400);
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 유저 정보가 있다면?
      throw new HttpException('이미 존재하는 사용자입니다.', 401);
    }
    const hashPassword = await bcrypt.hash(password, 12); // 없다면 비밀번호 암호화
    await this.usersRepository.save({
      // 테이블에 추가
      email,
      nickname,
      password: hashPassword,
    });
  }
}
