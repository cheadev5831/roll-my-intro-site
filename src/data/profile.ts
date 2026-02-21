/**
 * 개발자 자기소개 웹페이지 - 프로필 데이터 구조 정의
 *
 * 이 파일의 데이터만 수정하면 전체 페이지의 콘텐츠가 업데이트됩니다.
 * 모든 타입 정의와 기본(샘플) 데이터를 포함합니다.
 */

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────

/** 소셜/연락처 링크 */
export interface SocialLink {
  /** 플랫폼명 (예: GitHub, LinkedIn, Email) */
  label: string;
  /** 링크 URL (이메일은 mailto: 포함) */
  url: string;
  /** Quasar/Material 아이콘명 */
  icon: string;
  /** 표시 여부 */
  visible?: boolean;
}

/** 기술 스택 아이템 */
export interface SkillItem {
  /** 기술명 */
  name: string;
  /** 숙련도 (1~5, 5가 최고) */
  level: 1 | 2 | 3 | 4 | 5;
  /** 아이콘 URL 또는 devicon 클래스명 */
  icon?: string;
}

/** 기술 카테고리 */
export interface SkillCategory {
  /** 카테고리명 */
  category: string;
  /** 카테고리 아이콘 */
  icon: string;
  /** 기술 목록 */
  items: SkillItem[];
}

/** 경력 사항 */
export interface Experience {
  /** 회사명 */
  company: string;
  /** 직책/직무 */
  position: string;
  /** 재직 시작일 (YYYY-MM 형식) */
  startDate: string;
  /** 재직 종료일 (YYYY-MM 형식, 현재 재직 중이면 null) */
  endDate: string | null;
  /** 현재 재직 여부 */
  isCurrent: boolean;
  /** 회사 소재지 */
  location: string;
  /** 주요 업무 및 성과 */
  description: string[];
  /** 사용 기술 태그 */
  techStack: string[];
}

/** 프로젝트 */
export interface Project {
  /** 프로젝트명 */
  name: string;
  /** 간략한 설명 */
  summary: string;
  /** 상세 설명 */
  description: string;
  /** 썸네일 이미지 URL */
  thumbnail?: string;
  /** GitHub 레포 URL */
  githubUrl?: string;
  /** 라이브 데모 URL */
  liveUrl?: string;
  /** 사용 기술 태그 */
  techStack: string[];
  /** 프로젝트 기간 (예: "2024.03 ~ 2024.06") */
  period: string;
  /** 프로젝트 유형 */
  type: 'personal' | 'team' | 'work';
  /** 주요 기여 내용 */
  highlights?: string[];
  /** 표시 여부 */
  featured: boolean;
}

/** 학력 */
export interface Education {
  /** 학교명 */
  school: string;
  /** 전공 */
  major: string;
  /** 학위 */
  degree: '고졸' | '전문학사' | '학사' | '석사' | '박사';
  /** 입학 연도 */
  startYear: number;
  /** 졸업 연도 (재학 중이면 null) */
  endYear: number | null;
  /** 재학 여부 */
  isAttending: boolean;
  /** 추가 정보 */
  note?: string;
}

/** 자격증/수상 */
export interface Certificate {
  /** 자격증명 또는 수상명 */
  name: string;
  /** 발급 기관 또는 주최 기관 */
  issuer: string;
  /** 취득/수상 연월 (YYYY-MM) */
  date: string;
  /** 종류 */
  type: 'certificate' | 'award' | 'activity';
}

/** 개발자 기본 정보 */
export interface DeveloperInfo {
  /** 이름 */
  name: string;
  /** 이름 (영문) */
  nameEn: string;
  /** 직함/직무 */
  title: string;
  /** 부 직함 (복수 직무 보유 시) */
  subTitle?: string;
  /** 히어로 섹션 한 줄 소개 */
  tagline: string;
  /** 소개 섹션 자기소개 (멀티라인) */
  bio: string[];
  /** 이메일 */
  email: string;
  /** 위치 (거주지) */
  location: string;
  /** 프로필 사진 URL */
  avatarUrl?: string;
  /** 연락 가능 여부 */
  availableForWork: boolean;
  /** 소셜 링크 목록 */
  social: SocialLink[];
}

/** 전체 프로필 데이터 */
export interface Profile {
  /** 개발자 기본 정보 */
  developer: DeveloperInfo;
  /** 기술 스택 */
  skills: SkillCategory[];
  /** 경력 사항 (최신순) */
  experiences: Experience[];
  /** 대표 프로젝트 */
  projects: Project[];
  /** 학력 */
  educations: Education[];
  /** 자격증 및 수상 */
  certificates: Certificate[];
}

// ─────────────────────────────────────────────
// 샘플 프로필 데이터
// ─────────────────────────────────────────────

export const profile: Profile = {
  developer: {
    name: '채우리',
    nameEn: 'Woori Chae',
    title: 'Frontend Developer',
    subTitle: 'Vue.js / TypeScript',
    tagline: '사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.',
    bio: [
      '안녕하세요! 10년차 프론트엔드 개발자 채우리입니다.',
      'Vue.js와 TypeScript를 주력으로 사용하며, 사용자가 편리하게 쓸 수 있는 인터페이스를 만드는 데 열정을 가지고 있습니다.',
      '새로운 기술을 빠르게 습득하고, 팀과의 원활한 커뮤니케이션을 통해 더 나은 제품을 만들기 위해 노력합니다.',
    ],
    email: 'cheadev5831@gmail.com',
    location: '서울특별시, 대한민국',
    avatarUrl: '',
    availableForWork: true,
    social: [
      {
        label: 'GitHub',
        url: 'https://github.com/cheadev5831',
        icon: 'fab fa-github',
        visible: true,
      },
      {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/your-profile',
        icon: 'fab fa-linkedin',
        visible: true,
      },
      {
        label: 'Email',
        url: 'mailto:cheadev5831@gmail.com',
        icon: 'email',
        visible: true,
      },
      {
        label: 'Blog',
        url: 'https://velog.io/@your-id',
        icon: 'article',
        visible: false,
      },
    ],
  },

  skills: [
    {
      category: 'Frontend',
      icon: 'web',
      items: [
        { name: 'Vue.js', level: 5 },
        { name: 'TypeScript', level: 4 },
        { name: 'JavaScript (ES6+)', level: 5 },
        { name: 'HTML5 / CSS3', level: 5 },
        { name: 'Quasar Framework', level: 4 },
        { name: 'Tailwind CSS', level: 3 },
        { name: 'React', level: 3 },
        { name: 'Pinia / Vuex', level: 4 },
      ],
    },
    {
      category: 'Backend',
      icon: 'dns',
      items: [
        { name: 'Node.js', level: 3 },
        { name: 'Express.js', level: 3 },
        { name: 'RESTful API', level: 4 },
        { name: 'MySQL', level: 3 },
        { name: 'MongoDB', level: 2 },
      ],
    },
    {
      category: 'DevOps',
      icon: 'cloud',
      items: [
        { name: 'Git / GitHub', level: 5 },
        { name: 'GitHub Actions (CI/CD)', level: 3 },
        { name: 'Docker', level: 2 },
        { name: 'Nginx', level: 2 },
        { name: 'GitHub Pages', level: 4 },
        { name: 'Vercel', level: 3 },
      ],
    },
    {
      category: 'Tools',
      icon: 'build',
      items: [
        { name: 'VS Code', level: 5 },
        { name: 'Vite', level: 4 },
        { name: 'Figma', level: 3 },
        { name: 'Jira / Notion', level: 4 },
        { name: 'Postman', level: 4 },
      ],
    },
  ],

  experiences: [
    {
      company: '(주)테크스타트',
      position: 'Frontend Developer',
      startDate: '2023-03',
      endDate: null,
      isCurrent: true,
      location: '서울 강남구',
      description: [
        'Vue 3 + TypeScript 기반의 SaaS 대시보드 서비스 프론트엔드 개발 및 유지보수',
        'Quasar Framework를 활용한 반응형 UI 컴포넌트 라이브러리 구축',
        'GitHub Actions를 이용한 CI/CD 파이프라인 구축으로 배포 시간 70% 단축',
        '사용자 피드백을 반영한 UX 개선으로 페이지 이탈률 30% 감소',
      ],
      techStack: ['Vue 3', 'TypeScript', 'Quasar', 'Pinia', 'GitHub Actions'],
    },
    {
      company: '(주)웹에이전시',
      position: 'Junior Frontend Developer',
      startDate: '2022-01',
      endDate: '2023-02',
      isCurrent: false,
      location: '서울 마포구',
      description: [
        '기업 홈페이지 및 쇼핑몰 프론트엔드 개발 (10개 이상의 프로젝트 참여)',
        'Vue 2에서 Vue 3로의 마이그레이션 작업 주도',
        '크로스 브라우저 이슈 해결 및 웹 접근성 개선',
        '주니어 개발자 2명 온보딩 지원 및 코드 리뷰',
      ],
      techStack: ['Vue 2/3', 'JavaScript', 'SCSS', 'Webpack'],
    },
  ],

  projects: [
    {
      name: 'roll-my-intro-site',
      summary: '개발자 자기소개 포트폴리오 웹사이트',
      description:
        'Vue 3 + Quasar Framework로 제작한 개인 포트폴리오 사이트입니다. 데이터와 UI를 분리해 profile.ts 파일만 수정하면 전체 콘텐츠가 업데이트됩니다.',
      thumbnail: '',
      githubUrl: 'https://github.com/cheadev5831/roll-my-intro-site',
      liveUrl: 'https://cheadev5831.github.io/roll-my-intro-site',
      techStack: ['Vue 3', 'Quasar', 'TypeScript', 'Vite', 'GitHub Pages'],
      period: '2026.02 ~ 진행 중',
      type: 'personal',
      highlights: [
        '싱글 페이지 구성으로 빠른 탐색 제공',
        '데이터-UI 분리 설계로 유지보수 최소화',
        'GitHub Actions를 통한 자동 배포',
        '다크/라이트 모드 지원',
      ],
      featured: true,
    },
    {
      name: '팀 프로젝트: 협업 Todo 앱',
      summary: '실시간 협업 가능한 팀 Todo 관리 애플리케이션',
      description:
        '팀원들이 실시간으로 할 일을 공유하고 관리할 수 있는 협업 도구입니다. WebSocket을 활용한 실시간 동기화를 구현했습니다.',
      thumbnail: '',
      githubUrl: 'https://github.com/cheadev5831/team-todo-app',
      liveUrl: '',
      techStack: ['Vue 3', 'Node.js', 'Socket.io', 'MongoDB'],
      period: '2024.09 ~ 2024.11',
      type: 'team',
      highlights: [
        'WebSocket 기반 실시간 동기화',
        '드래그앤드롭 칸반보드 구현',
        '팀원 초대 및 권한 관리',
      ],
      featured: true,
    },
    {
      name: '날씨 대시보드',
      summary: '오픈 API를 활용한 날씨 정보 대시보드',
      description:
        'OpenWeatherMap API를 사용해 현재 위치의 날씨와 7일 예보를 시각화한 대시보드입니다.',
      thumbnail: '',
      githubUrl: 'https://github.com/cheadev5831/weather-dashboard',
      liveUrl: 'https://cheadev5831.github.io/weather-dashboard',
      techStack: ['Vue 3', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS'],
      period: '2024.06 ~ 2024.07',
      type: 'personal',
      highlights: [
        'Geolocation API로 현재 위치 자동 감지',
        'Chart.js를 활용한 데이터 시각화',
        'PWA 적용으로 오프라인 지원',
      ],
      featured: false,
    },
  ],

  educations: [
    {
      school: '한국대학교',
      major: '컴퓨터공학',
      degree: '학사',
      startYear: 2018,
      endYear: 2022,
      isAttending: false,
      note: '졸업',
    },
  ],

  certificates: [
    {
      name: '정보처리기사',
      issuer: '한국산업인력공단',
      date: '2022-06',
      type: 'certificate',
    },
    {
      name: '해커톤 최우수상',
      issuer: '서울시 청년 해커톤',
      date: '2023-10',
      type: 'award',
    },
    {
      name: 'SQLD (SQL 개발자)',
      issuer: '한국데이터산업진흥원',
      date: '2021-12',
      type: 'certificate',
    },
  ],
};

export default profile;
