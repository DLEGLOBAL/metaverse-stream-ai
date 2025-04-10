
export interface LayoutSettings {
  sidebarWidth: number;
  contentWidth: number;
  fontScale: number;
  reducedAnimations: boolean;
  contrastMode: boolean;
  alwaysShowLabels: boolean;
  compactMode: boolean;
  denseLayout: boolean;
  fullWidthLayout: boolean;
  systemFont: boolean;
}

export type LayoutSettingKey = keyof LayoutSettings;
