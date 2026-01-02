# kimgupall: 일러스트 작가 풀스택 포트폴리오 웹사이트

실제 일러스트 작가('kimgupall_98')의 브랜드 아이덴티티를 강화하고, 독립적인 웹사이트 운영을 위해 기획부터 인프라 구축까지 전 과정을 주도한 프로젝트입니다. 단순한 이미지 나열을 넘어, 초저비용 고효율 아키텍처와 사용자 경험(UX) 최적화에 초점을 맞췄습니다.

---

## 성과 요약
* 초저비용 운영: 월 평균 운영비 1,671원 달성 (도메인 유지비 및 GCP 스토리지 비용 포함)
* 성능 최적화: 이미지 부하가 높은 메인 갤러리 페이지 기준 PageSpeed 70점대 달성
* 개발 효율: 1인 개발 환경에서 1주일 만에 기존 React 프로젝트를 Next.js 풀스택 아키텍처로 마이그레이션 완료
* UX/UI: Framer Motion을 활용한 스크롤 인터랙션 및 Masonry 레이아웃 기반의 반응형 디자인 구현

---

## Core Engineering Challenges 

### 1. 고해상도 이미지 경험과 운영 효율의 균형
* 상황(Situation): 작가는 원본급 화질을 원했으나, 수동으로 저화질/고화질 버전을 생성하여 업로드하는 방식은 운영 효율이 낮았습니다.
* 과제(Task): 비전문가인 작가가 원본 하나만 업로드해도 성능 저하 없이 최적화된 이미지를 서빙하는 자동화 파이프라인이 필요했습니다.
* 해결(Action): 
    * Next.js Image Optimization: 별도의 이미지 가공 없이 클라우드 원본을 요청 시점에 WebP/AVIF로 동적 변환 서빙.
    * GCP Cloud Storage 연동: 고화질 원본 자원을 클라우드에 격리하여 서버 부하를 줄이고 데이터 가용성 확보.
* 결과(Result): 고화질 원본을 사용하면서도 페이지 성능 하락을 방어하며 PageSpeed 70점대의 준수한 성능을 유지했습니다.

### 2. 다층 캐싱 전략을 통한 인프라 비용 및 성능 최적화
* 상황(Situation): 서버리스 환경에서 잦은 DB(PostgreSQL) 호출은 과금과 응답 속도 저하의 원인이 됩니다.
* 과제(Task): 갤러리 특성상 데이터 변경 빈도가 낮다는 점에 착안해 DB I/O를 최소화하는 '초저비용' 구조가 필요했습니다.
* 해결(Action): 
    * Client-side (React Query): sessionStorage 연동 Persister를 구현하여 세션 내 재요청을 차단 (staleTime: Infinity).
    * Server-side (ISR): API Route에 revalidate = 3600 설정을 통해 1시간 단위 정적 재생성을 적용, 매 요청마다 DB 조회를 하지 않도록 설계.
* 결과(Result): DB 접속 비용을 99% 이상 절감하며, 커스텀 도메인 유지비(월 ~1,666원)와 GCP 비용(월 ~4원)을 포함해 월 1,671원의 운영비를 달성했습니다.

### 3. 확장성을 고려한 계층형 아키텍처 (In Progress)
* 상황(Situation): 1인 개발 프로젝트일수록 유지보수와 기능 확장을 위한 코드 관심사 분리가 중요합니다.
* 과제(Task): 향후 관리자 페이지 추가 및 CMS 연동을 고려하여 UI와 데이터 로직의 결합도를 낮춰야 했습니다.
* 해결(Action): 
    * View Pattern: 라우팅 로직과 뷰 조립 로직을 분리하여 각 컴포넌트의 독립성 확보.
    * Repository Pattern (Custom Hooks): 컴포넌트가 직접 API를 호출하지 않고 useImages와 같은 커스텀 훅을 통해 데이터에 접근하도록 추상화.
    * Admin System (Developing): 현재 작가가 직접 웹에서 이미지를 관리할 수 있는 Admin Dashboard 기능을 개발 중에 있습니다.
* 결과(Result): 추후 백엔드 구조가 바뀌어도 UI 수정 없이 훅 레벨에서 대응 가능한 유연한 구조를 확보했습니다.

---

## Tech Stack

| 구분 | 기술 스택 | 특징 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 16 (App Router)** | ISR 기반 고성능 렌더링 및 SEO 최적화 |
| **State** | **React Query** | 세션 스토리지 연동을 통한 공격적 캐싱 및 비용 감축 |
| **Styling** | **Tailwind CSS / Framer Motion** | 스크롤 기반 인터랙션 및 반응형 UI 디자인 |
| **Database** | **PostgreSQL (Prisma)** | 타입 안전성이 보장된 데이터 모델링 및 효율적인 DB 관리 |
| **Infrastructure** | **Vercel / GCP** | 서버리스 환경 구축을 통한 초저비용 호스팅 달성 |

---

## Developer
* 성함: 홍경록
* GitHub: [https://github.com/hong-gyeng-rok](https://github.com/hong-gyeng-rok)
* 연락처: honggyeonglog@gmail.com
