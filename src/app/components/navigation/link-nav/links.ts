import { Icon } from '../../icon/icon';

export interface NavLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  icon: Icon;
  link?: NavLink;
  sublinks?: NavLink[];
  expanded?: boolean;
}

export const navGroups: NavGroup[] = [
  {
    label: 'About',
    icon: { matIcon: 'home' },
    link: { label: 'About', url: '/about' },
  },
  {
    label: 'Photography',
    icon: { matIcon: 'photo_camera' },
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
    icon: { matIcon: 'sports_esports' },
    sublinks: [{ label: 'Avoid the Cob', url: '/avoid-the-cob' }],
    expanded: true,
  },
  {
    label: 'LinkedIn',
    icon: { svgIcon: 'linkedin' },
    link: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/christopher-chan-941503a1/', external: true },
  },
  {
    label: 'Github',
    icon: { svgIcon: 'github' },
    link: { label: 'Github', url: 'https://github.com/drchanhattan/', external: true },
  },
  {
    label: 'Instagram',
    icon: { svgIcon: 'instagram' },
    link: { label: 'Instagram', url: 'https://www.instagram.com/drchanhattan/', external: true },
  },
  {
    label: 'React',
    icon: { svgIcon: 'react' },
    link: { label: 'React', url: 'https://drchanhattan.github.io/react/', external: true },
  },
];
