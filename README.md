# 영화 API를 활용한 넷플릭스 클론 코딩 및 웹 아키텍처의 이해
넷플릭스 홈페이지와 유사하게 클론 코딩하며, API를 활용하는 방법과 웹 아키텍처를 이해하는 프로젝트입니다.

### 프로젝트 인원
2명 - frontend dev.

### 프로젝트 기간
2025.03.13 ~ 2025.03.21(최종발표) :7일

### 사용 스택
front: html5, CSS, javascript, jQuery, React, Vite, bootstrap 

back: JAVA, SpringBoot, mySQL, myBatis

----------------------------------------------------------------------------------------------------

### <2025.03.13>

| Step1. front단 - 공통 레이아웃/컴포넌트: Header 만들기 |

| Step2. front단 - 영화 API 끌어와서 배너 만들기 |

| Step3. front단 - 회원가입/로그인 페이지 각각 구현하기 |


✍️알아두기

> 둘 다 동일하게 정적파일을 보관하는 용도인데 왜 폰트는 public폴더에 넣고, 이미지는 assets폴더에 넣는가?

그 이유는 바로 Vite가 내부적으로 진행하는 이미지 최적화 설정때문에 그렇다. 그렇기에 이미지를 최적화할게 아니라면 public폴더에 넣어도 상관없다. 또한 이미지를 import문으로 간편하게 불러오고 싶다면 assets에 넣어야만 한다. 이때 util폴더를 만들어 get-image.js와 같은 모듈을 따로 만들어서 넣어주는게 좋다.

(더 자세한 내용 및 프로젝트 기록은 [티스토리](https://kenco.tistory.com/56). 암호는 슬랙DM주세요~!)


### <2025.03.14>
| Step4. back단 - 회원가입/로그인 페이지 토큰 로직 구현하기 |

