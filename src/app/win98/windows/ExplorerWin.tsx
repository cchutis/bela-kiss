"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { photos } from "../data";
import { OpenWindowOptions } from "../types";

const Thumb = styled(Paper)({
  padding: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  cursor: "default",
});

export default function ExplorerWin(props: { openWindow: (opts: OpenWindowOptions) => void }) {
  const { openWindow } = props;

  const openPhoto = (p: { id: number; src: string; title: string }) => {
    openWindow({ kind: "photo", title: p.title, payload: p });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={1}>
        {photos.map((p) => (
          <Grid key={p.id} item xs={6} sm={4} md={3}>
            <Thumb onDoubleClick={() => openPhoto(p)}>
              <img src={p.src} width={64} height={64} alt={p.title} />
              <Typography variant="caption" sx={{ textAlign: 'center' }}>{p.title}</Typography>
            </Thumb>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
