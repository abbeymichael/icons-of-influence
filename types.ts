export type PageType = 
  | 'cover' 
  | 'article' 
  | 'hero' 
  | 'grid' 
  | 'layout-photo'
  | 'layout-text'
  | 'image-reveal';

export type ContentBlock = 
  | { type: 'text'; content: string; size?: 'sm' | 'md' | 'lg' }
  | { type: 'image'; src: string; caption?: string; width?: 'narrow' | 'wide' | 'full' }
  | { type: 'video'; src: string; caption?: string }
  | { type: 'divider' }
  | { type: 'quote'; content: string; author?: string };

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
  content?: ContentBlock[]; // New: scrollable page content
}
