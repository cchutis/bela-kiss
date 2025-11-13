"use client";

import React from "react";
import { Box, Button, Typography, Paper, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { WindowState } from "../types";

const Bar = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 36,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 6px",
  background: "linear-gradient(#c0c0c0, #a0a0a0)",
  borderTop: "2px solid #fff",
});

const StartBtn = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  height: 28,
  minWidth: 68,
  padding: '2px 10px',
  background: '#c0c0c0',
  // Win98 3D border: light top/left, dark bottom/right
  border: '1px solid #000',
  boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #ffffff',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'default',
  userSelect: 'none',
  outline: 'none',
  color: '#000',
  "&:hover": { background: '#d0d0d0' },
  "&:active": {
    // pressed look: invert bevel
    boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff',
    background: '#b8b8b8',
  },
  "&:focus-visible": {
    outline: '1px dotted #000',
    outlineOffset: 1,
  },
});

const TaskBtn = styled(Button)<{ active?: boolean }>(({ active }) => ({
  height: 28,
  minWidth: 120,
  justifyContent: "flex-start",
  padding: "2px 8px",
  background: active ? "#e0e0ff" : "#c0c0c0",
  border: "1px solid #000",
  textTransform: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "&:hover": { background: active ? "#d8d8ff" : "#d0d0d0" },
}));

const ClockBox = styled(Paper)({
  marginLeft: "auto",
  padding: "4px 8px",
  fontSize: 12,
});

export default function Taskbar(props: {
  height: number;
  windows: WindowState[];
  onClickWin: (id: string) => void;
  onOpenIE?: () => void;
  onOpenAIM?: () => void;
  onOpenSettings?: () => void;
  startIcon?: string;
}) {
  const { windows, onClickWin, onOpenIE, onOpenAIM, onOpenSettings, startIcon } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [time, setTime] = React.useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <Bar>
      <StartBtn onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="Open Start menu">
        {startIcon && <img src={startIcon} alt="Start" width={14} height={14} style={{ marginRight: 6 }} />}
        Start
      </StartBtn>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {onOpenIE && (
          <MenuItem onClick={() => { onOpenIE(); setAnchorEl(null); }}>Programs → Bela Kiss → Open MySpace</MenuItem>
        )}
        {onOpenAIM && (
          <MenuItem onClick={() => { onOpenAIM(); setAnchorEl(null); }}>Programs → AIM → Buddy List</MenuItem>
        )}
        {onOpenSettings && (
          <MenuItem onClick={() => { onOpenSettings(); setAnchorEl(null); }}>Settings → Display</MenuItem>
        )}
        <MenuItem disabled>Documents</MenuItem>
        <MenuItem disabled>Settings</MenuItem>
        <MenuItem disabled>Find</MenuItem>
        <MenuItem disabled>Help</MenuItem>
        <MenuItem disabled>Run...</MenuItem>
      </Menu>

      {windows
        .slice()
        .sort((a, b) => a.z - b.z)
        .map((w) => (
          <TaskBtn key={w.id} onClick={() => onClickWin(w.id)} active={!w.minimized}>
            <img src={w.icon || "/window.svg"} width={16} height={16} alt="" style={{ marginRight: 6 }} />
            {w.title}
          </TaskBtn>
        ))}

      <ClockBox variant="outlined" square>
        <Typography variant="caption">{time}</Typography>
      </ClockBox>
    </Bar>
  );
}
