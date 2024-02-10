# index-testing 💻

자주 찾는 데이터 조회시 인덱싱 효율성 평가
EXPLAIN + 팀 아이디 중복 최대한 적게만들어서 시간값 계산

## 결과 📊

인덱싱을 사용안했을때:
<img width="1000" alt="Screenshot_2024-02-08_at_1 09 36_PM" src="https://github.com/fms-chukguwang/dummy/assets/39757235/811cb12b-96e0-4aae-933b-214f4c90814e">

인덱싱을 사용했을때:<img width="1000" alt="Screenshot_2024-02-08_at_1 10 14_PM" src="https://github.com/fms-chukguwang/dummy/assets/39757235/20d29437-2bda-4cc4-b023-0523914ba855">

결과값 JSON은 MySQL의 쿼리 실행 계획을 나타냄. 쿼리는 "members" 테이블에 접근하고 있으며 "team_id"를 키로 사용하여 조회하고 있음. 키는 "idx_team_id"에 정의되어 있고, 쿼리 실행에 필요한 비용은 1.05와 9109.05로 나옴. 

1. "rows_examined_per_scan": 3 - 스캔당 조사된 행 수. 즉, 해당 쿼리에 대해 각 스캔에서 3개의 행이 조사됨
2. "rows_produced_per_join": 3 - 조인 당 생성된 행 수. 즉, 조인 작업에서 각 조인에서 3개의 행이 생성됨.
3. "filtered": "100.00" - 필터링된 행의 비율. 100%이므로 모든 행이 필터링됨.
4. "read_cost": "0.75" - 읽기 비용. 즉, 쿼리 실행 중 데이터를 읽는 데 소요된 비용.
5. "eval_cost": "0.30" - 평가 비용. 즉, 필터 조건 등을 평가하는 데 소요된 비용.

쿼리 실행 계획에서 비용이 낮을수록 좋고 성능 최적화를 위해서는 비용을 최소화해야함.
