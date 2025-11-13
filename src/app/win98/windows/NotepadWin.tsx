"use client";

import React from "react";
import { Box, TextField } from "@mui/material";

const seed = `Bela Kiss – Release Notes\n\nTitle: Graveyard Waltz\nType: Single\nRelease: Oct 31, 2025\n\nCredits:\n- Vocals/Guitars: Bela\n- Production: Midnight Assembly\n- Mastering: The Crypt\n\nThank you for listening. // Bela Kiss`;

export default function NotepadWin() {
  const [text, setText] = React.useState(seed);
  return (
    <Box sx={{ p: 1, height: 1, bgcolor: '#fff' }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        fullWidth
        minRows={12}
        sx={{ fontFamily: 'monospace', '& textarea': { fontFamily: 'monospace' } }}
      />
    </Box>
  );
}
