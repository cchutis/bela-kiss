"use client";

import React from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { IconMap } from "../iconPaths";

const DesktopRoot = styled(Box)({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  // Win98 tiled-ish wallpaper using CSS pattern fallback
  backgroundColor: "#008080",
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 6px)",
});

const IconsWrap = styled(Box)({
  position: "absolute",
  top: 12,
  left: 12,
  display: "grid",
  gridTemplateColumns: "repeat(1, 96px)",
  gridAutoRows: "96px",
  gap: 4,
});

const IconWrap = styled(Box)(({ theme }) => ({
  width: 72,
  padding: 6,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default",
  userSelect: "none",
  outline: "none",
  "&:focus": {
    outline: `1px dotted ${theme.palette.common.white}`,
    outlineOffset: 1,
  },
  "&.selected": {
    background: "rgba(0,0,128,0.35)",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
  },
}));

const IconImg = styled("img")({ width: 32, height: 32, imageRendering: "pixelated" as any });

const IconLabel = styled(Typography)({
  marginTop: 6,
  textAlign: "center",
  fontSize: 12,
  color: "#fff",
  textShadow: "1px 1px 0 #000",
});

export default function Desktop(props: {
  onOpenIE: () => void;
  onOpenAIM: () => void;
  onOpenReadme: () => void;
  onOpenPhotos: () => void;
  onOpenRecycle: () => void;
  wallpaper?: { wallpaperUrl: string | null; wallpaperMode: 'tile' | 'stretch' | 'center' };
  icons: IconMap;
  taskbarHeight: number;
}) {
  const { onOpenIE, onOpenAIM, onOpenReadme, onOpenPhotos, onOpenRecycle, wallpaper, icons: iconMap, taskbarHeight } = props;
  const [selected, setSelected] = React.useState<number | null>(null);

  const [ctxEl, setCtxEl] = React.useState<null | { x: number; y: number }>(null);

  const icons = [
    { label: "Internet Explorer", icon: iconMap.ie, onOpen: onOpenIE },
    { label: "AIM", icon: iconMap.aim, onOpen: onOpenAIM },
    { label: "Bela Kiss Readme.txt", icon: iconMap.fileTxt, onOpen: onOpenReadme },
    { label: "Photos", icon: iconMap.folder, onOpen: onOpenPhotos },
    { label: "Recycle Bin", icon: iconMap.recycle, onOpen: onOpenRecycle },
  ];

  const onClickIcon = (idx: number) => {
    setSelected(idx);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (selected == null) return;
    if (e.key === "Enter") icons[selected].onOpen();
  };

  return (
    <DesktopRoot
      onContextMenu={(e) => {
        e.preventDefault();
        setCtxEl({ x: e.clientX, y: e.clientY });
      }}
      onMouseDown={(e) => {
        // Only clear selection if clicking directly on the desktop background
        if (e.currentTarget === e.target) setSelected(null);
      }}
      sx={{
        paddingBottom: `${taskbarHeight}px`,
        ...(wallpaper?.wallpaperUrl
          ? wallpaper.wallpaperMode === 'tile'
            ? { backgroundImage: `url(${wallpaper.wallpaperUrl})`, backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundPosition: 'top left' }
            : wallpaper.wallpaperMode === 'stretch'
            ? { backgroundImage: `url(${wallpaper.wallpaperUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }
            : { backgroundImage: `url(${wallpaper.wallpaperUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'auto', backgroundPosition: 'center center' }
          : {})
      }}
    >
      <IconsWrap>
        {icons.map((ic, idx) => (
          <IconWrap
            key={ic.label}
            tabIndex={0}
            className={selected === idx ? "selected" : undefined}
            onClick={(e) => {
              e.stopPropagation();
              onClickIcon(idx);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              ic.onOpen();
            }}
            onKeyDown={onKeyDown}
            aria-label={`Desktop icon ${ic.label}`}
          >
            <IconImg src={ic.icon} alt="icon" />
            <IconLabel>{ic.label}</IconLabel>
          </IconWrap>
        ))}
      </IconsWrap>

      <Menu
        open={!!ctxEl}
        onClose={() => setCtxEl(null)}
        anchorReference="anchorPosition"
        anchorPosition={ctxEl ? { top: ctxEl.y, left: ctxEl.x } : undefined}
      >
        <MenuItem disabled>Arrange Icons</MenuItem>
        <MenuItem disabled>Refresh</MenuItem>
        <MenuItem disabled>Properties</MenuItem>
      </Menu>
    </DesktopRoot>
  );
}
