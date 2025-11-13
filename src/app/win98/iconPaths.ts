// Centralized icon path mapping. Replace paths with real Win98 icons
// once you add them under public/win98/icons/ (from win98icons.alexmeub.com).

const B = "/win98/icons/windows98-icons/png";

export type IconPreset = 'win95' | 'win98' | 'win2k';

export type IconMap = {
  start: string;
  ie: string;
  aim: string;
  notepad: string;
  folder: string;
  recycle: string;
  genericWindow: string;
  fileTxt: string;
};

const presets: Record<IconPreset, IconMap> = {
  win95: {
    start: `${B}/start_menu_shortcuts.png`,
    ie: `${B}/internet_options_old_e-5.png`,
    aim: "/aim/aim.png",
    notepad: `${B}/notepad-5.png`,
    folder: `${B}/directory_folder_options-5.png`,
    recycle: `${B}/recycle_bin_empty-5.png`,
    genericWindow: `${B}/monitor_application.png`,
    fileTxt: `${B}/notepad_file-2.png`,
  },
  win98: {
    start: `${B}/start_menu_shortcuts.png`,
    ie: `${B}/internet_options-5.png`,
    aim: "/aim/aim.png",
    notepad: `${B}/notepad-2.png`,
    folder: `${B}/directory_folder_options-0.png`,
    recycle: `${B}/recycle_bin_empty-0.png`,
    genericWindow: `${B}/monitor_application.png`,
    fileTxt: `${B}/notepad_file-0.png`,
  },
  win2k: {
    start: `${B}/start_menu_shortcuts.png`,
    ie: `${B}/internet_options-3.png`,
    aim: "/aim/aim.png",
    notepad: `${B}/notepad-3.png`,
    folder: `${B}/directory_folder_options-3.png`,
    recycle: `${B}/recycle_bin_empty_2k-3.png`,
    genericWindow: `${B}/monitor_application.png`,
    fileTxt: `${B}/notepad_file_gear-1.png`,
  },
};

export function getIconPaths(preset: IconPreset): IconMap {
  return presets[preset] || presets.win98;
}

// Fallbacks if real icons are not present
export const fallbacks = {
  start: "/window.svg",
  ie: "/globe.svg",
  aim: "/window.svg",
  notepad: "/file.svg",
  folder: "/window.svg",
  recycle: "/window.svg",
  genericWindow: "/window.svg",
  fileTxt: "/file.svg",
};

export function withFallback(path: string, fallback: string) {
  return path || fallback;
}
