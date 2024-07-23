export interface SideNavLink {
  label: string;
  url: string;
}

export interface SideNavGroup {
  label: string;
  url: string;
  sublinks?: SideNavLink[];
  expanded?: boolean;
}

export const sideNavLinks: SideNavGroup[] = [
  { label: 'Home', url: '/home' },
  {
    label: 'Gallery',
    url: '',
    sublinks: [
      { label: 'Europe', url: '/europe' },
      { label: 'Asia', url: '/asia' },
      { label: 'North America', url: '/north-america' },
      { label: 'South America', url: '/south-america' },
      { label: 'Oceania', url: '/oceania' },
    ],
    expanded: false,
  },
  { label: 'Avoid the Cob', url: '/game' },
  { label: 'Contact', url: '/contact' },
];
