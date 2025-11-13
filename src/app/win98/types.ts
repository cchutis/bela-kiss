export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowId = string;

export type WindowKind =
  | 'ie'
  | 'notepad'
  | 'explorer'
  | 'photo'
  | 'recycle'
  | 'aim'
  | 'aim_chat'
  | 'settings';

export type WindowState = {
  id: WindowId;
  kind: WindowKind;
  title: string;
  icon?: string; // public path to icon
  bounds: Bounds;
  z: number;
  minimized: boolean;
  maximized: boolean;
  payload?: unknown; // optional data for specific windows
};

export type OpenWindowOptions = Partial<Omit<WindowState, 'id' | 'z'>> & {
  kind: WindowKind;
  title: string;
};

export type DisplaySettings = {
  wallpaperUrl: string | null;
  wallpaperMode: 'tile' | 'stretch' | 'center';
  iconPreset?: 'win95' | 'win98' | 'win2k';
};
