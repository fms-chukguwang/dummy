import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  HttpStatus,
  Patch,
  Req,
  ParseIntPipe,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MemberService } from './member.service';

@Controller('')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * 특정 멤버 조회
   * @param req
   * @param teamId
   */

  @Get('member/:memberId')
  async getTeamMembers(@Param('memberId') memberId: number) {
    const data = await this.memberService.findOneById(memberId);
    return data;
  }

    /**
   * 특정 팀 멤버 조회
   * @param req
   * @param teamId
   */
     @Get('team/:teamId')
     async getMembersTeam(@Param('teamId') teamId: number) {
       const data = await this.memberService.findTeamById(teamId);
       return data;
     }

  @Get('')
  async test() {
    return 'hi';
  }
}
