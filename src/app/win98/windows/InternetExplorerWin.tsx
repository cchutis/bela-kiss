"use client";

import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MyspaceBelaKiss from "../myspace/MyspaceBelaKiss";
import { OpenWindowOptions } from "../types";

const Toolbar = styled(Box)({
  display: "flex",
  gap: 6,
  alignItems: "center",
  padding: 6,
  borderBottom: "1px solid #c0c0c0",
  background: "#e8e8e8",
});

export default function InternetExplorerWin(props: {
  showToast: (msg: string) => void;
  openWindow: (opts: OpenWindowOptions) => void;
}) {
  const { showToast, openWindow } = props;
  const [addr, setAddr] = React.useState("http://www.myspace.com/belakiss");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Toolbar>
        <IconButton size="small" aria-label="Back" disabled>
          ◀
        </IconButton>
        <IconButton size="small" aria-label="Forward" disabled>
          ▶
        </IconButton>
        <IconButton size="small" aria-label="Refresh" onClick={() => showToast("Refreshing...")}>⟳</IconButton>
        <TextField
          size="small"
          fullWidth
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          InputProps={{ sx: { fontFamily: 'monospace', background: '#fff' } }}
        />
      </Toolbar>
      <Box sx={{ flex: 1, overflow: "auto", background: "#d6d6d6" }}>
        <MyspaceBelaKiss showToast={showToast} openWindow={openWindow} />
      </Box>
    </Box>
  );
}
