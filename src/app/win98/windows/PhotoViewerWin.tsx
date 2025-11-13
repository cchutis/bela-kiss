"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function PhotoViewerWin(props: { payload?: { id: number; src: string; title: string } }) {
  const p = props.payload;
  if (!p) return <Box sx={{ p: 2 }}>No photo selected.</Box>;
  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <img src={p.src} alt={p.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <Typography variant="caption">{p.title}</Typography>
    </Box>
  );
}
