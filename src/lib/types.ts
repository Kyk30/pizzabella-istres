export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface RestaurantInfo {
  name: string;
  subtitle: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: { day: string; hours: string }[];
  deliveryMinimum: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
  };
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface SiteContent {
  info: RestaurantInfo;
  hero: HeroContent;
  menu: MenuCategory[];
  events: Event[];
  gallery: GalleryImage[];
}
