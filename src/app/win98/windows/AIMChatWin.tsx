"use client";

import React from "react";
import { Box, Divider, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { aimBuddies, aimSeedChats, AimMessage } from "../data";

const Header = styled(Box)({
  padding: 6,
  background: "linear-gradient(#004, #223)",
  color: "#fff",
  fontWeight: 700,
});

export default function AIMChatWin(props: { payload?: { buddyId: string } }) {
  const buddyId = props.payload?.buddyId;
  const buddy = aimBuddies.find((b) => b.id === buddyId);
  const [messages, setMessages] = React.useState<AimMessage[]>(() => (buddyId ? (aimSeedChats[buddyId] || []) : []));
  const [input, setInput] = React.useState("");

  const send = () => {
    if (!input.trim()) return;
    const msg: AimMessage = { from: 'you', text: input.trim(), ts: Date.now() };
    setMessages((m) => [...m, msg]);
    setInput("");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1, bgcolor: '#fff' }}>
      <Header>{buddy ? `IM with ${buddy.screenName}` : 'IM'}</Header>
      <Divider />
      <Box sx={{ flex: 1, overflow: 'auto', p: 1, background: '#f7f7f7' }}>
        <List dense>
          {messages.map((m, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemText
                primaryTypographyProps={{ fontSize: 13 }}
                secondaryTypographyProps={{ fontSize: 12 }}
                primary={`${m.from}: ${m.text}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
        <TextField size="small" fullWidth value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
        <Button variant="contained" onClick={send}>Send</Button>
      </Box>
    </Box>
  );
}
