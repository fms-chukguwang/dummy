import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomInt } from 'crypto';

let app: INestApplication;
let responseTimes: number[] = []; 

describe('AppController (e2e) - 특정 팀의 멤버 찾기 1000번 요청 후 평균값 계산', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Nest 애플리케이션 초기화
    app = moduleFixture.createNestApplication();

    // 애플리케이션 초기화 기다림
    await app.init();
  }, 60000*10); // 10분 타임아웃

  it('/team/:teamId (GET)', async () => {
    for (let i = 0; i < 1000; i++) {
      // 요청 전 시간 기록
      const startTime = Date.now(); 
      const teamId = 2;
      const response = await request(app.getHttpServer())
        .get(`/team/${teamId}`)
        .expect(200);
        // 요청 후 시간 기록
      const endTime = Date.now(); 
       // 응답 시간 계산
      const responseTime = endTime - startTime;
      // 응답 시간을 배열에 추가
      responseTimes.push(responseTime); 
    }
  }, 60000*10); // 테스트 타임아웃 10분

  afterAll(async () => {
    await app.close();

    if (responseTimes.length > 0) {
      const sum = responseTimes.reduce((acc, curr) => acc + curr, 0);
      const average = sum / responseTimes.length;

      console.log('응답 시간의 평균:', average);
    } else {
      console.log('평균값을 계산할 유효한 응답이 없습니다.');
    }
  });
});
