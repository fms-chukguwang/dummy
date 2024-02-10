import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { DataSource, FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}


  async findOneById(id: number) {
    const player = await this.memberRepository.findOneBy({ id });
    console.log('Player=', player);

    if (!player) {
      throw new NotFoundException('선수를 찾을 수 없습니다.');
    }

    return player;
  }

  async findTeamById(id: number) {
    const queryBuilder = this.memberRepository.createQueryBuilder('member');
    queryBuilder.where('member.teamId = :id', { id });
    const players = await queryBuilder.getMany();
    console.log('Players=', players);

    if (!players.length) {
      throw new NotFoundException('선수들을 찾을 수 없습니다.');
    }

    return players;
}

// async findTeamById(id: number) {
//     const players = await this.memberRepository.find({ where: { teamId: id } });
//     console.log('Players=', players);

//     if (!players.length) {
//       throw new NotFoundException('선수들을 찾을 수 없습니다.');
//     }

//     return players;
//   }

}
