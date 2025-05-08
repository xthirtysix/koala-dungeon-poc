export interface Banner {
  id: string;
  link: string;
  pageName: string;
  media: {
    width: number;
    height: number;
    url: string;
    mime: string;
    alternativeText: string;
  }
  isActive: boolean;
}
