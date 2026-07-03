export interface NavLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  icon: string;
  link?: NavLink;
  sublinks?: NavLink[];
  expanded?: boolean;
}

export const navGroups: NavGroup[] = [
  // {
  //   label: 'About',
  //   icon: 'home',
  //   link: { label: 'About', url: '/about' },
  // },
  {
    label: 'Photography',
    icon: 'photo-camera',
    sublinks: [
      { label: 'Europe', url: '/europe' },
      { label: 'Asia', url: '/asia' },
      { label: 'North America', url: '/north-america' },
      { label: 'South America', url: '/south-america' },
      { label: 'Oceania', url: '/oceania' },
    ],
    expanded: true,
  },
  {
    label: 'Games',
    icon: 'sports-esports',
    sublinks: [{ label: 'Avoid the Cob', url: '/avoid-the-cob' }],
    expanded: true,
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    link: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/christopher-chan-941503a1/', external: true },
  },
  // {
  //   label: 'Github',
  //   icon: 'github',
  //   link: { label: 'Github', url: 'https://github.com/drchanhattan/', external: true },
  // },
  {
    label: 'Instagram',
    icon: 'instagram',
    link: { label: 'Instagram', url: 'https://www.instagram.com/drchanhattan/', external: true },
  },
  {
    label: 'React',
    icon: 'react',
    link: { label: 'React', url: 'https://drchanhattan.github.io/react/', external: true },
  },
];
