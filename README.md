# LifePlus 프로젝트

[프로젝트 스크린샷]![image](https://github.com/ygy7265/lifeplus/assets/48234811/43b0b5e7-e6a0-4c3f-abfa-15b63c0fb69c)



## 프로젝트 소개
일상 속에서 불편했던 순간들을 해소하고 더 나은 삶을 추구하기 위해, 필자는 자주 사용하는 기능들을 효율적으로 결합한 프로젝트 [LifePlus]을 개발하게되었습니다. 이 프로젝트는 필자의 개인적인 요구사항을 기반으로 제작되었으며, 사용자들이 보다 편리하고 효과적으로 일상을 관리할 수 있도록 돕기 위해 고안되었습니다.

## 프로젝트 기간
2023.11 ~ 현재 진행중

## 팀 구성 
- 1인 개인프로젝트

## 서비스 환경

### 서비스 배포 환경
- **OS:** Window10
- **Browser:** Chrome 119.0.6045.160
- **WAS:** Apache Tomcat 10.1.13
- **Language:** Spring Boot 3.1.4
- **Infra:** AWS EC2

### 라이브러리
- logback-classic-1.4.4.jar
- logback-core-1.4.4.jar
- slf4j-api-2.0.3.jar
- modelmapper.3.1.1.jar
- jsoup.1.15.3.jar
- mockito-core.3.+.jar

## 사용기술
### Frontend

- HTML
- CSS
- JavaScript
- React
- Redux
- axios
- styled-components

### Backend

- Java (Spring Boot)
- JPA (Java Persistence API)
- Crawling
- OpenAPI

### Database

- MongoDB

### Version Control
- Git

### 보안

- Spring Security를 통한 사용자 인증 및 권한 부여 구현
- JWT 기반의 인증 사용

## 주요 기능
- 회원 / 가입 / 로그인
- 크롤링 / 실시간 검색어 / 실시간 핫이슈 뉴스
- 공공데이터 /날씨
- 일정 / 등록 / 수정/삭제 / 알림
- 모드 / 다크/화이트
 

# LifePlus 프로젝트 업데이트 내역
## 0.0.1-SNAPSHOT
- 프로젝트 구조 설계
- 프로젝트 화면 구현
## 0.0.2-SNAPSHOT
- 회원 기능 구현완료 (회원가입/로그인)
- 크롤링 기능 구현 완료(실시간 검색어/실시간 핫이슈 뉴스)
실시간 검색어는 로컬 환경에서는 잘 됐으나 배포 과정에서 크롤링하는사이트에서 막히는 바람에 실시간 뉴스 키워드로 대체했습니다.
## 0.0.3-SNAPSHOT
- 일정 기능 구현완료 (등록/수정/삭제)
- 공공데이터 API 기능 구현완료 (날씨)
