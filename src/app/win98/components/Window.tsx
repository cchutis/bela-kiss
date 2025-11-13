"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bounds, WindowState, OpenWindowOptions } from "../types";
import InternetExplorerWin from "../windows/InternetExplorerWin";
import NotepadWin from "../windows/NotepadWin";
import ExplorerWin from "../windows/ExplorerWin";
import PhotoViewerWin from "../windows/PhotoViewerWin";
import RecycleBinWin from "../windows/RecycleBinWin";
import AIMBuddyListWin from "../windows/AIMBuddyListWin";
import AIMChatWin from "../windows/AIMChatWin";
import DisplaySettingsWin from "../windows/DisplaySettingsWin";

const Frame = styled(Paper)<{ active: boolean }>(({ active }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  border: active ? "2px solid #000080" : "2px solid #7f7f7f",
  boxShadow: active ? "4px 4px 0 #000" : "2px 2px 0 #333",
  overflow: "hidden",
  background: "#c0c0c0",
}));

const TitleBar = styled(Box)<{ active: boolean }>(({ active }) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "3px 6px",
  background: active ? "linear-gradient(#000080,#000060)" : "linear-gradient(#808080,#606060)",
  color: "#fff",
  cursor: "move",
  userSelect: "none",
}));

const TitleText = styled("div")({
  flex: 1,
  fontWeight: 700,
  fontSize: 12,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Body = styled(Box)({
  flex: 1,
  background: "#fff",
  overflow: "auto",
});

const ResizeHandle = styled("div")({
  position: "absolute",
  width: 12,
  height: 12,
  right: 0,
  bottom: 0,
  cursor: "nwse-resize",
  background: "transparent",
});

const Controls = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const TitleBtn = styled("button")<{ emphasize?: boolean }>(({ emphasize }) => ({
  width: 18,
  height: 18,
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Tahoma, Verdana, sans-serif",
  fontSize: 11,
  lineHeight: 1,
  color: emphasize ? "#000" : "#000",
  background: "#c0c0c0",
  border: "1px solid #000",
  boxShadow: "inset -1px -1px 0 0 #7f7f7f, inset 1px 1px 0 0 #fff",
  cursor: "default",
  userSelect: "none",
  outline: "none",
  
  // Hover/active mimic
  ":hover": {
    background: "#d0d0d0",
  },
  ":active": {
    boxShadow: "inset 1px 1px 0 0 #7f7f7f, inset -1px -1px 0 0 #fff",
  },
}));

export default function Window(props: {
  win: WindowState;
  taskbarHeight: number;
  active: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
  onToggleMaximize: () => void;
  onMove: (dx: number, dy: number) => void;
  onResize: (next: Partial<Bounds>) => void;
  openWindow: (opts: OpenWindowOptions) => void;
  showToast: (msg: string) => void;
}) {
  const {
    win,
    taskbarHeight,
    active,
    onFocus,
    onClose,
    onMinimize,
    onToggleMaximize,
    onMove,
    onResize,
    openWindow,
    showToast,
  } = props;

  // Drag
  const dragRef = React.useRef<{ x: number; y: number } | null>(null);

  const onPointerDownTitle = (e: React.PointerEvent) => {
    if (win.maximized) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (dx || dy) {
      onMove(dx, dy);
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
  };

  // Resize
  const rsRef = React.useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const onPointerDownResize = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    rsRef.current = { x: e.clientX, y: e.clientY, w: win.bounds.width, h: win.bounds.height };
  };
  const onPointerMoveResize = (e: React.PointerEvent) => {
    if (!rsRef.current) return;
    const dx = e.clientX - rsRef.current.x;
    const dy = e.clientY - rsRef.current.y;
    const minW = 280;
    const minH = 160;
    onResize({ width: Math.max(minW, rsRef.current.w + dx), height: Math.max(minH, rsRef.current.h + dy) });
  };
  const onPointerUpResize = (e: React.PointerEvent) => {
    rsRef.current = null;
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
  };

  const style: React.CSSProperties = win.maximized
    ? {
        left: 0,
        top: 0,
        width: "100%",
        height: `calc(100% - ${taskbarHeight}px)`,
        zIndex: win.z,
      }
    : {
        left: win.bounds.x,
        top: win.bounds.y,
        width: win.bounds.width,
        height: win.bounds.height,
        zIndex: win.z,
      };

  const renderContent = () => {
    switch (win.kind) {
      case "ie":
        return <InternetExplorerWin showToast={showToast} openWindow={openWindow} />;
      case "aim":
        return <AIMBuddyListWin openWindow={openWindow} />;
      case "aim_chat":
        return <AIMChatWin payload={win.payload as { buddyId: string }} />;
      case "settings":
        return <DisplaySettingsWin initial={(win.payload as any)?.settings} />;
      case "notepad":
        return <NotepadWin />;
      case "explorer":
        return <ExplorerWin openWindow={openWindow} />;
      case "photo":
        return <PhotoViewerWin payload={win.payload as { id: number; src: string; title: string } | undefined} />;
      case "recycle":
        return <RecycleBinWin />;
      default:
        return null;
    }
  };

  if (win.minimized) return null;

  return (
    <Frame
      elevation={0}
      active={active}
      sx={style}
      onMouseDown={onFocus}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="dialog"
      aria-label={win.title}
    >
      <TitleBar active={active} onPointerDown={onPointerDownTitle} onDoubleClick={onToggleMaximize}>
        <img src={win.icon || "/window.svg"} width={16} height={16} alt="icon" />
        <TitleText>{win.title}</TitleText>
        <Controls>
          <TitleBtn aria-label="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }}>_</TitleBtn>
          <TitleBtn aria-label="Maximize" onClick={(e) => { e.stopPropagation(); onToggleMaximize(); }}>▢</TitleBtn>
          <TitleBtn aria-label="Close" emphasize onClick={(e) => { e.stopPropagation(); onClose(); }}>X</TitleBtn>
        </Controls>
      </TitleBar>
      <Body>{renderContent()}</Body>
      {!win.maximized && (
        <ResizeHandle
          onPointerDown={onPointerDownResize}
          onPointerMove={onPointerMoveResize}
          onPointerUp={onPointerUpResize}
        />
      )}
    </Frame>
  );
}
