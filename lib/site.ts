// 차돌이 정보와 사이트 설정을 한 곳에서 관리한다.

export const site = {
  name: "차돌이네",
  title: "차돌이네 | 포메라니안 김차돌",
  tagline: "세상에서 제일 귀여운 간식 사냥꾼",
  description:
    "세상에서 제일 귀여운 간식 사냥꾼, 갈색 포메라니안 차돌이의 사진과 이야기를 모아 둔 집이에요.",
  ogImage: "/images/home/og.jpg",
} as const;

export const chadol = {
  name: "차돌이",
  /** 성까지 붙인 정식 이름 */
  fullName: "김차돌",
  breed: "갈색 포메라니안",
  /** 색을 빼고 견종만. 사진과 함께 쓰는 짧은 문장용 */
  breedName: "포메라니안",
  /** 태어난 날짜는 몰라서 연·월만 관리한다. */
  birth: { year: 2014, month: 4 },
  /** 우리 집에 온 날 (YYYY-MM-DD) */
  adoptedOn: "2014-07-24",
  nicknames: ["간식 사냥꾼", "선비", "신사"],
  personality:
    "온순하고 점잖아요. 산책도 의젓하게 잘해서 동네에서는 '신사'로 통한답니다.",
  /** 성격 밑에 붙는 한 줄 */
  temper: "소란스러운 건 질색이라, 조용히 천천히 다가오는 친구를 좋아해요.",
  likes: ["간식", "산책", "새로운 곳 모험", "카페에서 쉬기", "조용한 친구"],
  dislikes: ["소란스러운 것"],
} as const;

export type TraitId = "adventure" | "cafe" | "cat" | "smart";

export type Trait = {
  id: TraitId;
  title: string;
  text: string;
};

/** "차돌이는요"에서 사진과 짝지어 보여주는 소개 네 가지 */
export function getTraits(): Trait[] {
  return [
    { id: "adventure", title: "모험을 좋아해요", text: "처음 가 보는 길일수록 발걸음이 씩씩해져요." },
    { id: "cafe", title: "카페에선 느긋하게", text: "새로운 곳 구경만큼 카페에서 쉬는 시간도 좋아해요." },
    { id: "cat", title: "고양이 같은 강아지", text: "도도해 보여도 간식 하나면 마음의 문이 금방 열려요." },
    { id: "smart", title: "부르면 달려와요", text: "말을 잘 알아들어서 똑똑하다는 칭찬을 자주 들어요." },
  ];
}

export type SocialKind = "youtube" | "instagram";

export type SocialLink = {
  id: string;
  kind: SocialKind;
  /** 화면에 보이는 이름 */
  label: string;
  href: string;
};

const socialLinks: SocialLink[] = [
  {
    id: "youtube",
    kind: "youtube",
    label: "유튜브",
    href: "https://www.youtube.com/@Imchadoll",
  },
  {
    id: "instagram-daily",
    kind: "instagram",
    label: "인스타 일상",
    href: "https://www.instagram.com/ch.adorable/",
  },
  {
    id: "instagram-walk",
    kind: "instagram",
    label: "인스타 산책",
    href: "https://www.instagram.com/imchadoll/",
  },
];

/** 주소가 비어 있는 SNS는 화면에 보여주지 않는다. */
export function getSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.href.trim() !== "");
}

export type NavItem = {
  href: string;
  label: string;
  /** 페이지가 준비되면 true로 바꾼다. */
  enabled: boolean;
};

const navItems: NavItem[] = [
  { href: "/", label: "홈", enabled: true },
  { href: "/diary", label: "일기", enabled: false },
  { href: "/friends", label: "친구들", enabled: false },
  { href: "/guestbook", label: "방명록", enabled: false },
];

/** 아직 없는 페이지는 메뉴에 노출하지 않는다. */
export function getNavItems(): NavItem[] {
  return navItems.filter((item) => item.enabled);
}

export type TimelineItem = {
  id: string;
  when: string;
  title: string;
  description: string;
  /** "현재" 항목은 나이를 오늘 날짜로 계산해 보여준다. */
  current?: boolean;
};

export function getTimeline(): TimelineItem[] {
  return [
    {
      id: "birth",
      when: "2014년 4월",
      title: "차돌이 탄생",
      description: "작고 동글동글한 갈색 솜뭉치가 세상에 태어났어요.",
    },
    {
      id: "home",
      when: "2014년 7월 24일",
      title: "우리 집에 온 날",
      description:
        "생후 3개월, 차돌이가 가족이 되었어요. 이날부터 매일이 더 행복해졌답니다.",
    },
    {
      id: "now",
      when: "지금",
      title: "오늘도 간식 사냥 중",
      description: "여전히 산책을 사랑하는 동네 신사로 지내고 있어요.",
      current: true,
    },
  ];
}
