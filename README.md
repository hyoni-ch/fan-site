# ❤ 쪼율링큐 JJOYURINGQ ❤

![image]()

조유리 팬사이트

## 👨‍💻 팀원 소개

| FRONTEND       | BACKEND |
| -------------- | ------- |
| 최재훈, 조하현 | 최은섭  |

<br>

## 📅 프로젝트 기간

2025.03.20 ~ 2023.04.24 (총 5주)

<br>

## 🌟 프로젝트 개요

연예인 조유리의 팬 사이트 입니다.

<br>

## ✨ 프로젝트 핵심 기능

#### 유저 관리 API

- 회원가입, 로그인, 이메일 인증, 닉네임 변경, 비밀번호 변경, 유저 역할 수정, 유저 조회

#### 프로필 API

- 커리어 리스트와 콘서트 리스트 조회

#### 앨범 API

- 앨범의 생성, 조회, 삭제 / 트랙 추가

#### 굿즈 관리 API

- 굿즈의 생성, 조회, 수정, 삭제 및 페이지네이션

#### 다이어리 API

- 다이어리 게시글과 댓글/대댓글의 생성, 조회, 수정, 삭제, 좋아요 및 페이지네이션

#### 장바구니 Zustand / 로컬스토리지

- 장바구니 추가, 수정, 삭제

<br>

## 🔨 주요 기술

**Programming Language**

<img  alt="typescript" src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> <img  alt="java" src="https://img.shields.io/badge/java-green?style=for-the-badge&logo=java&logoColor=black">

**Frontend**

<img alt="next.js" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=black"> <img alt="zustand" src="https://img.shields.io/badge/zustand-ffffff?style=for-the-badge&logo=zustand&logoColor=white"> <img  src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

**Backend**

<img alt="spring boot" src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img alt="amazon ec2" src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> <img  src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

<br>

## 💄 디자인 시안

![image]()

[🔗 피그마 링크](https://www.figma.com/design/zVrrcqACtcAJARs9xpiGqu/%E3%85%86%E3%84%B7%E3%85%8A?node-id=0-1&p=f&t=dQLguBhm3RIdrKr3-0)

<br>

## 🔒 ERD

<br>

## 📄 API 명세서

[🔗 Notion 링크](https://www.notion.so/1d20fce129b6805395dec0ce6d87bc84?v=1d20fce129b681108d6d000ca150ec60&pvs=4)

<br>

## ⚙️ 프로젝트 파일 구조

**Front-end**

```

├─ public
│ ├─ images
│ │ ├─ icon
│ │ │ ├─ facebookIcon.png
│ │ │ ├─ instagramIcon.png
│ │ │ ├─ spotifyIcon.png
│ │ │ ├─ tiktokIcon.png
│ │ │ ├─ xIcon.png
│ │ │ └─ youtubeIcon.png
│ │ ├─ diary1.png
│ │ ├─ jjoul.png
│ │ ├─ mainImg.jpg
│ │ └─ profile2.png
├─ script
│ ├─ install.sh
│ ├─ start.sh
│ └─ stop.sh
├─ src
│ ├─ api
│ │ ├─ diary
│ │ ├─ admin.ts
│ │ ├─ auth.ts
│ │ ├─ discography.ts
│ │ ├─ goods.ts
│ │ └─ profile.ts
│ ├─ app
│ │ ├─ (route)
│ │ │ ├─ admin
│ │ │ ├─ artist
│ │ │ ├─ cart
│ │ │ ├─ diary
│ │ │ ├─ discography
│ │ │ ├─ goods
│ │ │ ├─ login
│ │ │ ├─ mypage
│ │ │ └─ verifyemail
│ │ ├─ globals.css
│ │ ├─ layout.tsx
│ │ ├─ page.tsx
│ │ └─ subLayout.tsx
│ ├─ components
│ │ ├─ diaryPage
│ │ ├─ mainPage
│ │ ├─ errorAlert.tsx
│ │ ├─ footer.tsx
│ │ ├─ GoTopButton.tsx
│ │ ├─ headerNav.tsx
│ │ ├─ LoadingIndicator.tsx
│ │ └─ successAlert.tsx
│ ├─ constants
│ │ └─ apiUrl.ts
│ ├─ hooks
│ │ ├─ useFetchArticle.ts
│ │ ├─ useLikeHandler.ts
│ │ └─ useUserAuth.ts
│ ├─ store
│ │ ├─ authStore.ts
│ │ ├─ cartStore.ts
│ │ ├─ commentStore.ts
│ │ ├─ diaryLikeStore.ts
│ │ └─ diaryStore.ts
│ ├─ styles
│ │ ├─ diaryDetailStyles.ts
│ │ ├─ headerStyles.ts
│ │ ├─ slideStyles.css
│ │ └─ theme.ts
│ ├─ types
│ │ ├─ diaryMain.ts
│ │ ├─ iadmin.ts
│ │ ├─ ialertProp.ts
│ │ ├─ idiscography.ts
│ │ ├─ igoods.ts
│ │ └─ iprofile.ts
│ └─ utils
│ │ ├─ api.ts
│ │ ├─ formatTimeToKST.ts
│ │ ├─ scrollUtils.ts
│ │ └─ youtube.ts
├─ .env
├─ next.config.ts
├─ package-lock.json
├─ package.json
└─ tsconfig.json

```

**Back-end**

```



```

<br>

## 🗣 협업 환경

- Discord

  -

- Gitlab

  - 코딩 컨벤션을 준수하며 프로젝트를 진행하였습니다.
  - Merge Request를 요청하고 팀원들과 코드리뷰를 진행하였습니다.

- Figma
  - 웹 페이지의 디자인 와이어프레임, 시안을 제작하였습니다.
