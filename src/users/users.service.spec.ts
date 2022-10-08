import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
import { UsersService } from './users.service';
class MockRepository {}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('findByEmail 실행 했을 때 유저를 찾아야함', () => {
    expect(service.findByEmail('tlgns14@nate.com')).resolves.toBe({
      id: 1,
      email: 'tlgns14@nate.com',
    });
  });
});
