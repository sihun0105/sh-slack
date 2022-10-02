import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspaceRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMemberRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMemberRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private UsersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return this.workspaceRepository.findOne({ where: { id } });
  }

  async findMyworksapces(myId: number) {
    return this.workspaceRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }
  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = this.workspaceRepository.create();
    workspace.name = name;
    workspace.url = url;
    workspace.OwnerId = myId;
    const returned = await this.workspaceRepository.save(workspace);

    const workspacemember = new WorkspaceMembers();
    workspacemember.UserId = myId;
    workspacemember.WorkspaceId = returned.id;
    await this.workspaceMemberRepository.save(workspacemember);
    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    const channelReturned = await this.channelsRepository.save(channel);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMemberRepository.save(channelMember);
  }
}
