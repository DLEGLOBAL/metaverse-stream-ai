
export interface ThemeColor {
  name: string;
  value: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColor[];
}

export interface GenerateResponse {
  logos?: string[];
  themes?: Theme[];
  images?: string[];
}

export type BrandingType = 'logo' | 'theme' | 'image';

export interface BrandingApiParams {
  prompt: string;
  type: 'image' | 'theme';
}
