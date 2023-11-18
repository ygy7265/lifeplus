# LotteON 쇼핑몰 개발 프로젝트

![프로젝트 스크린샷](https://github.com/ygy7265/lifeplus/assets/48234811/a8fb1bef-cd84-4bdf-8fc5-7cb35494f5d8)


## 프로젝트 소개
롯데 e-커머스 'LOTTE ON' 쇼핑몰을 개발하는 프로젝트입니다.

## 프로젝트 기간
2023.09.26 ~ 2023.10.30 (21일, 160시간)

## 팀 구성 
- 윤경엽 (팀장)
- 박한산
- 강원빈
- 이성찬

## 서비스 환경

### 서비스 배포 환경
- **OS:** Window10
- **Browser:** Chrome 119.0.6045.160
- **WAS:** Apache Tomcat 10.1.13
- **Language:** Spring Boot 3.1.4
- **Infra:** AWS EC2

### 라이브러리
- activation-1.1.1.jar
- cos-05Nov2002.jar
- gson-2.9.1.jar
- javax.mail-1.6.2.jar
- javax.mail-api-1.6.2.jar
- jstl-1.2.jar
- logback-classic-1.4.4.jar
- logback-core-1.4.4.jar
- mysql-connector-java-8.0.29.jar
- slf4j-api-2.0.3.jar

## 협업 도구
- Slack

## 사용기술

- Frontend: HTML, CSS, JavaScript,Thyleaf
- Backend: Java (Spring Boot), JPA (Java Persistence API), MyBatis
- Database: MySQL
- Version Control: Git
  
### 보안

- Spring Security를 통한 사용자 인증 및 권한 부여 구현
- 세션 기반의 인증 사용


### 데이터베이스 관리 시스템 (DBMS)
- MySQL 8.0

## 주요 기능
- 회원 / 가입 / 로그인 / 약관 / 마이페이지
- 상품 / 상품 목록 / 상품 보기 / 장바구니 / 주문하기 / 검색하기
- 고객센터 / 공지사항 / Q&A / FAQ
- 관리자 / 상품 등록 / 상품 수정/삭제 
  
## 정보 구조 (IA : Information Architecture)
![IA Diagram 1](https://github.com/ygy7265/LottON/assets/48234811/11dc8af2-aeab-4860-9755-f8318c246fbc)
![IA Diagram 2](https://github.com/ygy7265/LottON/assets/48234811/6eb5e97d-9476-43ae-bf18-dc89240f2ce2)
![IA Diagram 3](https://github.com/ygy7265/LottON/assets/48234811/ba2be98c-086b-40a1-94da-3b4ebce14f53)

## ERD
![ER Diagram](https://github.com/ygy7265/LottON/assets/48234811/350fea20-05c0-40be-8363-0344c4a438c1)


User
# LotteON 프로젝트 업데이트 내역

## 0.0.1-SNAPSHOT
- 프로젝트 구조 설계
- 프로젝트 화면 구현
## 0.0.2-SNAPSHOT
- 회원 약관 1차 완료
- 상품 목록 기능 1차 완료 (간단한 출력)
- 메인 페이지 구현 완료
- 고객센터 자주 묻는 기능 목록 기능 구현 완료
- 관리자 상품 내역 기능 구현 완료
## 0.0.3-SNAPSHOT
- 회원 약관 2차 완료 (동의 체크 기능 추가)
- 상품 목록 기능 2차 완료 (페이징 처리 추가)
- 고객센터 공지사항 목록 기능 구현 완료
- 관리자 상품 등록 기능 구현 완료
## 0.0.4-SNAPSHOT
- 상품 상세 기능 1차 완료 (기본 출력 기능 추가)
- 고객센터 문의하기 목록 기능 1차 완료 (출력)
- 회원가입 기능 1차 완료 (회원 등록)
- 관리자 메인 페이지 기능 구현 완료
## 0.0.5-SNAPSHOT
- 상품 기능 2차 완료 (장바구니 등록 기능 추가)
- 고객센터 문의하기 목록 기능 2차 완료 (문의하기 기능 추가)
- 회원가입 기능 2차 완료 (유효성 검사 추가)
- 관리자페이지 상품 검색 기능 구현 완료
## 0.0.6-SNAPSHOT
- 상품 기능 3차 완료 (상품 구매하기 등록 기능 추가)
- 고객센터 마스킹 및 페이징 처리 기능 추가
- 회원 로그인 기능 추가
- 관리자페이지 상품 수정/삭제 기능 구현 완료
## 0.0.7-SNAPSHOT
- 상품 기능 3차 완료 (정렬 기능 추가)
- 회원 마이페이지 기능 1차 완료 (주문 내역 추가)
- 회사 소개 페이지 구현 완료
## 0.0.8-SNAPSHOT
- 상품 기능 4차 완료 (상품 완료 기능 추가)
- 회원 마이페이지 기능 2차 완료 (문의 내역 추가)
- 서비스 이용 약관 페이지 구현 완료
## 0.0.9-SNAPSHOT
- 상품 검색 기능 1차 완료 (검색 기능 추가)
- 회원 마이페이지 기능 3차 완료 (리뷰 내역 및 회원 수정 추가)
## 0.0.10-SNAPSHOT

- 회원 마이페이지 기능구현 구현 완료
- 상품 검색 기능 2차 완료 (상세 검색 추가)
