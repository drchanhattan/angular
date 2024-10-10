import { Icon } from '../icon/icon';

export interface SideNavLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface SideNavGroup {
  label: string;
  icon: Icon;
  link?: SideNavLink;
  sublinks?: SideNavLink[];
  expanded?: boolean;
}

export const sideNavLinks: SideNavGroup[] = [
  {
    label: 'Home',
    icon: { matIcon: 'home' },
    link: { label: 'Home', url: '/' },
  },
  {
    label: 'LinkedIn',
    icon: { svgIcon: 'linkedin' },
    link: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/christopher-chan-941503a1/', external: true },
  },
  {
    label: 'Games',
    icon: { matIcon: 'sports_esports' },
    sublinks: [{ label: 'Avoid the Cob', url: '/avoid-the-cob' }],
    expanded: true,
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
];
