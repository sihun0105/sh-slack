import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorksaceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '시훈슬렉',
    description: '워크스페이스이름',
  })
  public workspace: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'shslack',
    description: 'url 주소',
  })
  public url: string;
}
