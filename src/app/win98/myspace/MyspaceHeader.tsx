"use client";

import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const Header = styled(Box)({
  background: "#003399",
  color: "#fff",
  padding: 12,
});

const Banner = styled(Box)({
  height: 120,
  background:
    "linear-gradient(90deg, #000 0, #333 30%, #990000 60%, #330000 100%)",
  border: "2px solid #111",
  marginBottom: 12,
});

export default function MyspaceHeader() {
  return (
    <Header>
      <Banner />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src="/globe.svg" sx={{ width: 64, height: 64, bgcolor: '#fff' }} />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Bela Kiss</Typography>
          <Typography variant="caption">myspace.com/belakiss</Typography>
        </Box>
      </Box>
    </Header>
  );
}
