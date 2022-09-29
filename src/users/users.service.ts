import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMombersRepository: Repository<WorkspaceMembers>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다.'); // 유저 정보가 있다면?
    }
    const hashedPassword = await bcrypt.hash(password, 12); // 없다면 비밀번호 암호화
    const returned = await this.usersRepository.save({
      // 테이블에 추가
      email,
      nickname,
      password: hashedPassword,
    });
    await this.workspaceMombersRepository.save({
      UserId: returned.id,
      WorkspaceId: 1,
    });
  }
}
