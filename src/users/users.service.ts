import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository, DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMombersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMombersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다.'); // 유저 정보가 있다면?
    }
    const hashedPassword = await bcrypt.hash(password, 12); // 없다면 비밀번호 암호화
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        // 테이블에 추가
        email,
        nickname,
        password: hashedPassword,
      });
      //throw new Error('rolback test!?!?!?');
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: returned.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
