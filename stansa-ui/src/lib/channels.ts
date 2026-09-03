import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  XIcon,
  LinkedInIcon,
  GlobeGlyph,
} from '@/components/brand-icons';

export type Channel = {
  name: string;
  handle: string;
  href: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
};

/** The current website — used by the announcement modal, not the footer. */
export const WEBSITE_CHANNEL: Channel = {
  name: 'Sitio oficial',
  handle: 'acerosstansa.com',
  href: 'https://acerosstansa.com/',
  icon: GlobeGlyph,
};

/** Social channels — used by both the modal and the footer. */
export const SOCIAL_CHANNELS: Channel[] = [
  {
    name: 'Instagram',
    handle: '@aceros.stansa',
    href: 'https://instagram.com/aceros.stansa',
    icon: InstagramIcon,
  },
  {
    name: 'Facebook',
    handle: 'aceros.stansa',
    href: 'https://facebook.com/aceros.stansa',
    icon: FacebookIcon,
  },
  {
    name: 'TikTok',
    handle: '@acerosstansa.oficial',
    href: 'https://tiktok.com/@acerosstansa.oficial',
    icon: TikTokIcon,
  },
  {
    name: 'Twitter / X',
    handle: 'acerosstansa',
    href: 'https://twitter.com/acerosstansa',
    icon: XIcon,
  },
  {
    name: 'LinkedIn',
    handle: 'aceros-stansa',
    href: 'https://www.linkedin.com/company/aceros-stansa/',
    icon: LinkedInIcon,
  },
];

export const ALL_CHANNELS: Channel[] = [WEBSITE_CHANNEL, ...SOCIAL_CHANNELS];
