export interface SideNavLink {
  label: string;
  url: string;
}

export interface SideNavGroup {
  label: string;
  icon: string;
  link?: SideNavLink;
  sublinks?: SideNavLink[];
  expanded?: boolean;
}

export const sideNavLinks: SideNavGroup[] = [
  {
    label: 'Home',
    icon: 'home',
    link: { label: 'Home', url: '/home' },
  },
  {
    label: 'Games',
    icon: 'sports_esports',
    sublinks: [{ label: 'Avoid the Cob', url: '/avoid-the-cob' }],
    expanded: true,
  },
  {
    label: 'Photography',
    icon: 'photo_camera',
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
