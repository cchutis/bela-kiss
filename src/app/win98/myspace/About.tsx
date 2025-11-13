"use client";

import React from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Paper)({ padding: 8, display: 'flex', flexDirection: 'column', gap: 8 });

export default function About(props: { onAddFriend: () => void; onSendMessage: () => void }) {
  const { onAddFriend, onSendMessage } = props;
  return (
    <Card variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700}>About Me</Typography>
      <Typography variant="body2">
        Bela Kiss crafts nocturnal rock for haunted highways and neon alleys. New single
        "Graveyard Waltz" descends Oct 31, 2025. See you in the dark.
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="contained" onClick={onAddFriend}>Add Bela Kiss as a Friend</Button>
        <Button size="small" variant="outlined" onClick={onSendMessage}>Send Message</Button>
      </Stack>
      <Typography variant="caption" color="text.secondary">Mood: Currently feeling… vampiric.</Typography>
    </Card>
  );
}
