import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member/entities/member.entity';

@Injectable()
export class MemberSeed implements Seeder {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async seed(): Promise<any> {
    for (let i = 0; i < 10; i++) {
      const members = DataFactory.createForClass(Member).generate(10000);
      await this.memberRepository.insert(members);
    }
  }

  async drop(): Promise<any> {
    return this.memberRepository.delete({});
  }
}
