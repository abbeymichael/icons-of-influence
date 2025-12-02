export type PageType = 
  | 'cover' 
  | 'article' 
  | 'hero' 
  | 'grid' 
  | 'layout-photo'
  | 'layout-text'
  | 'image-reveal';

export interface PageData {
  type: PageType;
  surface: 'white' | 'black';
  masthead?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  pull?: string;
  bg?: string;
  grid?: string[];
  imageSide?: 'left' | 'right'; // For split layouts
  layoutImages?: string[]; // Additional images for collages
}
