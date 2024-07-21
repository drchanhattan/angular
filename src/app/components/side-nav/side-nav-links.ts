export interface SideNavLink {
  label: string;
  url: string;
}

export interface SideNavLinks {
  label: string;
  url: string;
  sublinks?: SideNavLink[];
  expanded?: boolean;
}

export const sideNavLinks: SideNavLinks[] = [
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
  { label: 'Games', url: '', sublinks: [{ label: 'Avoid the Cob', url: '/game' }], expanded: false },
  { label: 'Contact', url: '/contact' },
];
