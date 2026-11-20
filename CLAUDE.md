# CHADOLL (차돌이 홈페이지)

우리 강아지 차돌이의 사진·일상·추억을 모은 작은 라이프스타일 매거진.
`chadoll` = 차돌 + doll(인형), "인형 같은 차돌이".

- 브랜드명: **CHADOLL** ("차돌이네"는 쓰지 않는다). 서브타이틀: **A Fluffy Little Gentleman.**
- 서브타이틀은 표지(Hero)와 푸터 두 곳에만 쓴다. 이름·문구는 `lib/site.ts`의 `site`에서 관리한다.

> 세상에서 제일 귀여운 간식 사냥꾼, 차돌이를 소개합니다 🍖✨

## 차돌이 정보

- 갈색 포메라니안, 2014년 4월생 (일자 모름)
- 우리 집 온 날: 2014년 7월 24일 (생후 3개월)
- 정식 이름: 김차돌
- 별명: 간식 사냥꾼, 선비, 신사 (온순하고 산책을 잘해서 동네 어머니들 사이에서 "선비", "신사")
- 좋아하는 것: 간식, 산책, 새로운 곳으로 떠나는 모험, 카페에서 쉬기, 조용하고 천천히 다가오는 친구
- 고양이 같은 매력이 있는 강아지. 마음의 문을 여는 제일 빠른 방법은 간식
- 싫어하는 것: 소란스러운 것 (앞에서 설치면 뛰지 말라고 한다)
- 말을 잘 알아들어서 똑똑하다는 칭찬을 자주 듣는다
- 정보는 `lib/site.ts` 한 곳에서 관리한다. 나이와 함께한 일수는 하드코딩하지 않고 오늘 날짜로 계산한다.

## 기술 스택

- Next.js 최신 (App Router) + TypeScript + Tailwind CSS, 이미지는 `next/image`
- Vercel 배포: `main`은 운영, 그 외 브랜치는 Preview 배포
- npm: `npm run dev` / `npm run build` / `npm run lint`

## 아키텍처 원칙

1. 기본은 Server Component. 클릭·상태·브라우저 API가 필요한 부분만 작게 `"use client"`로 분리한다.
2. 가능한 페이지는 정적으로 생성한다.
3. **데이터 접근은 `lib/`의 함수로만 한다.** 화면은 데이터가 마크다운인지 DB인지 몰라야 한다.
   나중에 DB로 바꿀 때 `lib/` 안의 구현만 교체한다.
4. 데이터 저장·수정은 Server Actions로 한다 (별도 API 서버를 만들지 않는다).
5. 작은 개인 사이트이므로 FSD 같은 복잡한 구조는 쓰지 않는다.

## 폴더 구조

```
app/
  layout.tsx          공통 메뉴 · 푸터 · 글꼴 · 기본 메타데이터
  page.tsx            HOME: 표지, 소개 요약, 함께한 날, 대표 사진
  about/              ABOUT: 차돌이 소개 전체, 걸어온 길(해마다 한 장)
  moments/            MOMENTS: 사진첩 전체, [tag] 주제별 사진
  stories/            STORIES: 차돌이 일기 (목록, [slug] 상세) — 2단계
  friends/            차돌이의 친구들 (목록, [slug] 상세)
  guestbook/          방명록
  sitemap.ts robots.ts
components/
  ui/                 공통 조각 (Photo, Section, Kicker, Wordmark, MoreLink, LeashLine ...)
  layout/             Header, NavLinks, Footer, SocialLinks
  home/ about/ moments/ stories/ friends/   페이지 전용 컴포넌트
content/
  friends.ts          친구 목록 데이터
lib/
  site.ts             브랜드, 차돌이 정보, 메뉴, SNS 링크
  gallery.ts          사진 데이터, 주제(tag), getMoments(tag), getFeaturedPhotos()
  metadata.ts         페이지 메타데이터(pageMetadata)
  date.ts             나이 · 함께한 일수 계산
  diary.ts            getDiaries(), getDiary(slug)  (DB에서 읽기)
  friends.ts          getFriends(), getFriend(slug)
public/images/        home/ diary/ friends/
```

## 페이지별 규칙

### 메뉴
- 영문 메뉴 + 한글 보조(휴대폰에서만 보인다): HOME 홈 · ABOUT 소개 · MOMENTS 사진 · STORIES 이야기 (`lib/site.ts`의 navItems)
- 준비된 페이지만 메뉴에 연다(`enabled`). STORIES는 일기 기록이 생기면 연다.

### 사진첩 (`/moments`)
- 장면(숲길·가을·카페 …)은 제목과 메모를 가진 펼침면 단위다. 장면마다 놓는 방식은 `components/moments/SceneSpreads.tsx`의 `spreadOf`에서 정하고, 이웃한 장면끼리 다르게 한다.
- 주제(tag)는 차돌이가 좋아하는 것을 기준으로 거른다: 산책 · 나들이 · 카페 · 친구들 · 얼굴. 계절은 장면 이름(봄·여름 바다·가을·겨울)으로 보이므로 주제로 두지 않는다.
- 장면에 기본 주제를 달고, 사진에만 더 붙는 주제는 `photo(file, alt, ["friends"])`처럼 단다. 모든 사진이 주제 하나 이상에 들어가게 한다. 주제 버튼에는 사진 수를 함께 보여준다.
- 주제별 페이지는 `/moments/[tag]`로 미리 만든다(정적 생성).
- 첫 화면의 대표 사진은 `lib/gallery.ts`의 `featuredFiles` 순서를 따른다.
- ABOUT의 "차돌이가 걸어온 길"은 `lib/gallery.ts`의 `growthFiles`(해마다 한 장, 오래된 순)를 따른다. 찍은 날이 있는 사진만 쓰고, 나이는 찍은 달로 계산한다.

### 차돌이 일기 (`/stories`)
- 메뉴 이름은 STORIES. 하루일기와 산책 에피소드, 성장 기록을 **하나로 통일**한다. 구분은 `category`로 한다.
- DB에 저장한다. 글쓰기·수정·삭제는 보호자만 할 수 있다 (Server Actions).

```ts
{ slug: "2026-11-16-maple-walk", title: "단풍길에서 간식 사냥",
  date: "2026-11-16", category: "산책",   // 일상 | 산책 | 여행 | 기념일
  cover: "/images/diary/2026-11-16.jpg",   // 선택
  body: "본문 (차돌이 시점도 좋음)" }
```

### 차돌이의 친구들 (`/friends`)
- 페이지 제목은 "차돌이의 친구들 🐾", 상단 메뉴에는 짧게 "친구들"로 표시한다.
- 도감처럼 사진 카드를 격자로 보여주고, 누르면 상세 페이지로 간다.
- 카드에는 도감 번호(No.001), 사진, 이름, 견종, 한 줄 특징을 넣는다.
- 상세: 처음 만난 날, 만난 곳, 성격, 차돌이와의 관계("간식 라이벌" 등).
- 디자인은 도감 느낌만 차용하고, 특정 게임·캐릭터의 로고·이름·디자인은 쓰지 않는다.
- 친구 사진은 **보호자 동의를 받은 것만** 올린다. 보호자 이름·사는 곳 등 개인정보는 넣지 않는다.

```ts
{ slug: "bori", no: 1, name: "보리", breed: "말티즈",
  photo: "/images/friends/bori.jpg", trait: "산책길 단짝",
  metAt: "2020-05", place: "동네 공원", relation: "산책 메이트" }
```

### 방명록 (`/guestbook`)
- 일기와 같은 DB를 쓴다. 닉네임만 입력해서 작성하고, 보호자만 글을 삭제할 수 있다.
- 스팸 방지(글자 수 제한, 짧은 시간 연속 작성 제한)를 넣는다.

### SNS 연결
- 링크는 `lib/site.ts`에서 관리한다. 비어 있으면 화면에 표시하지 않는다.
  - 유튜브: https://www.youtube.com/@Imchadoll
  - 인스타그램 (일상): https://www.instagram.com/ch.adorable/
  - 인스타그램 (산책): https://www.instagram.com/imchadoll/
- 인스타그램이 두 개이므로 아이콘 옆에 "일상", "산책" 라벨을 붙여 구분한다.
- STORIES(일기) 상세 페이지 하단에는 `category`에 맞는 인스타그램(일상/산책) 링크를 보여준다.
- 위치: 메인 첫 화면과 푸터. 아이콘 + 새 탭 열기(`rel="noopener noreferrer"`).

## 디자인 · 문구

- 콘셉트는 "Warm Editorial · 사진 중심의 작은 라이프스타일 매거진". 사진이 주인공이고 UI는 사진보다 눈에 띄지 않는다. 특정 계절에 치우치지 않는다.
- 색은 차돌이 털색에서 가져온다. `app/globals.css`의 Tailwind 테마 변수 한 곳에서 관리한다.
  - `ivory` #FAF8F4 — 기본 바탕 (약 65%)
  - `cream` #F3EBDD — 띠(함께한 날, 푸터), 사진 불러오기 전 바탕 (약 20%)
  - `line` #E6DED3 — 구분선
  - `cocoa` #493D34 — 제목·본문, 사진 크게 보기 바탕 (아이보리 위 대비 9.9)
  - `brown` #6E5D4F — 보조 글자 (아이보리 위 5.9, 크림 위 5.3). 투명도 대신 `brown`을 쓴다.
  - `golden` #D8BD9D — 밑줄·점·선 같은 **장식 전용**. 대비가 낮아(아이보리 위 1.7) 글자에는 쓰지 않는다.
  - `champagne` #E7D2B4 — 제한적으로 쓰는 강조 바탕. **이 위 글자는 `cocoa`만** 쓴다 (7.1).
  - `greige` #BFB3A6 — 비활성 아이콘 등. 글자에는 쓰지 않는다.
  - 노란·주황 기운이 강한 베이지는 넓게 쓰지 않는다. 사진 색은 건드리지 않는다.
  - 포인트색은 노란 리드줄색(`leash`) 하나뿐이고, 리드줄 선(`LeashLine`)은 표지와 함께한 날 두 곳에만 쓴다.
- 글꼴은 두 가지만 쓴다.
  - 한글 본문·제목: SUIT Variable (`app/fonts/SUIT-Variable.woff2`, next/font/local, `font-sans`). 본문 400, 소제목 600, 제목 700.
    파일은 자주 쓰는 한글 2,350자 + 영문·기호, 굵기 400–700만 남긴 것이다(`node scripts/subset-font.mjs`로 다시 만든다). 빠진 글자는 시스템 글꼴로 보이고, 400–700 밖의 굵기는 쓰지 않는다.
  - 영문: Jost (next/font/google, `font-serif`). 로고(CHADOLL), 서브타이틀(이탤릭), 섹션 위 라벨(`Kicker`), 메뉴, 숫자에만 쓴다. 숫자는 `lining-nums`. 영문 글꼴 안에 섞인 한글(예: "4,503일"의 "일")은 SUIT로 보인다.
- 섹션 제목 구조: 영문 라벨(`Kicker`, 메뉴 이름과 같은 단어만) → 한글 제목 → 본문 → 사진. 장식용 영문 문구는 더하지 않는다.
- 사진은 원본(3:4)을 기준으로 배치에 맞춰 3:4 · 4:5 · 1:1로 자른다(`components/ui/Photo.tsx`의 `ratio`). 푸터 사진만 가로 3:2(`ratio="wide"`, 데스크톱에서는 옆 글 높이에 맞춤)로 쓰고, 파일은 `resize-photos.mjs`의 `FAREWELL`로 따로 만든다. 테두리·그림자 없이 모서리만 아주 살짝(3px).
- 큰 사진과 작은 사진의 크기를 분명히 다르게 하고, 같은 모양 카드를 반복하지 않는다.
- 그림자·블러·그라데이션·둥근 카드 반복·스크롤 애니메이션·과한 아이콘은 쓰지 않는다.
- 섹션마다 배치를 다르게 하고 왼쪽 정렬을 기본으로 한다.
- **모바일 우선**, 글자는 크고 읽기 쉽게 (어르신 방문자 고려). 본문 18px 이상, 누르는 곳은 48px 이상.
- 화면 문구는 한글, 귀엽고 다정한 말투. 영문은 브랜드·메뉴·라벨에만.
- 이모지는 꼭 필요한 곳에만 쓴다. 제목·라벨·사진 메모에는 쓰지 않고, 메인 페이지는 이모지 없이 만든다.
- 사진은 `photos/`(커밋하지 않음)에 원본을 두고 `node scripts/resize-photos.mjs`로 1200×1600으로 줄여 `public/images/home/`에 넣는다.
- 새 사진은 `scripts/photo-sources.mjs`의 `PHOTOS`에 이어 붙이고, `node scripts/photo-dates.mjs`로 촬영일을 `content/photo-dates.json`에 기록한다. 원본에 날짜가 없으면 null로 남으니 "YYYY-MM"으로 손으로 채운다(다시 실행해도 채운 값은 지켜진다).
- 이미지 파일명은 소문자와 하이픈, `alt`는 한글로 의미 있게 쓴다. 2MB가 넘으면 리사이즈한다.

## 코드 규칙

- 컴포넌트는 PascalCase 파일명 + named export. `page.tsx`, `layout.tsx`만 default export.
- 경로 alias `@/` 사용. `any` 금지.
- 새 라이브러리는 이유를 설명하고 확인받은 뒤 추가한다.
- `.env*`와 비밀 키는 절대 커밋하지 않는다.

## 브랜치 규칙

- `main`: 항상 배포 가능한 상태. **직접 커밋하지 않는다.**
- 작업 브랜치: `타입/영문-설명` (타입은 커밋 규칙과 같음)
  - 예: `feat/friends-page`, `fix/mobile-header`, `content/diary-2026-11-16`
- 보관 브랜치: `archive/v버전-영문-설명` — 지난 디자인 보관용. 수정·병합·삭제하지 않는다.
  - `archive/v1-handwritten-album`: CHADOLL 리뉴얼 전 "차돌이네" 손글씨 앨범 버전 (`f1c702d`)
- 흐름: `main`에서 브랜치 생성 → 작업 · 커밋 → push (Vercel Preview로 확인) → PR → Squash merge → 브랜치 삭제
- PR 제목은 커밋 메시지 형식을 따른다. 본문에는 변경 내용과 확인한 화면을 적는다.
- 예외: 일기 · 사진 추가 같은 `content` 작업은 보호자가 원하면 `main`에 바로 커밋해도 된다.

## 커밋 규칙

형식: `타입: 한글 설명` (50자 이내, 마침표 없음, 한 커밋에 한 가지 목적)

| 타입 | 용도 |
|---|---|
| `feat` | 새 기능 · 섹션 · 페이지 |
| `fix` | 버그 수정 |
| `style` | 디자인 · CSS · 레이아웃 |
| `content` | 사진 · 일기 · 친구 · 문구 추가/수정 |
| `refactor` | 동작 변화 없는 코드 정리 |
| `docs` | README, CLAUDE.md 등 문서 |
| `chore` | 설정, 패키지 업데이트 |

예: `feat: 친구들 카드 목록 추가`, `content: 11월 16일 산책 일기 추가`

## 작업 방식

- 다음 작업은 **먼저 계획을 보여주고 확인받은 뒤** 진행한다.
  - 새 페이지 · 섹션 · 기능, 폴더 구조 · 공통 레이아웃 · 디자인 테마 변경
  - 새 라이브러리, DB · 외부 서비스 연결, 여러 파일을 한꺼번에 바꾸는 작업
- 문구 · 색 · 간격 조정, 일기 · 친구 추가 같은 작은 작업은 바로 하고 바꾼 내용만 알려준다.
- 애매하면 계획부터 보여준다.
- 커밋과 push 전에 `npm run build` 통과를 확인한다.

## 로드맵

- [ ] 1단계: 메인 소개 (Hero, 프로필, 함께한 날 카운터, 갤러리, 타임라인, SNS 링크) → 배포
  - CHADOLL 리뉴얼: HOME · ABOUT · MOMENTS 분리, 사진 주제(tag), 매거진 디자인
- [ ] 2단계: DB 연결 → 차돌이 일기(STORIES 메뉴 열기) + 방명록
- [ ] 3단계: 차돌이의 친구들 (도감형 사진 카드)

메뉴는 확장을 고려해 만들되, 아직 없는 페이지는 메뉴에 노출하지 않는다.
