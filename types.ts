
export interface QROptions {
  url: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  shape: 'square' | 'rounded' | 'circle';
}
