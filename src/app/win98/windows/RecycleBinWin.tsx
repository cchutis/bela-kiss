"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

export default function RecycleBinWin() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Recycle Bin
      </Typography>
      <Typography variant="body2">This bin is empty.</Typography>
    </Box>
  );
}
