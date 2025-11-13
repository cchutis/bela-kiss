"use client";

import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, TextField, Button, Stack, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import { aimBuddies, AimBuddy } from "../data";
import { OpenWindowOptions } from "../types";

const Header = styled(Box)({
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: "linear-gradient(#0033aa, #002266)",
  color: "#fff",
  fontWeight: 700,
  borderBottom: '1px solid #001844',
});

const Footer = styled(Box)({
  padding: 6,
  background: '#e6e6e6',
  borderTop: '1px solid #aaa',
  boxShadow: 'inset 1px 1px 0 #fff',
});

const GroupHeader = styled(Box)({
  padding: '4px 8px',
  background: '#dcdcdc',
  borderTop: '1px solid #fff',
  borderBottom: '1px solid #aaa',
  cursor: 'default',
  userSelect: 'none',
  fontSize: 12,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

export default function AIMBuddyListWin(props: { openWindow: (opts: OpenWindowOptions) => void }) {
  const { openWindow } = props;
  const [query, setQuery] = React.useState("");
  const [groups, setGroups] = React.useState<Record<string, boolean>>({ Buddies: true, Family: true, Coworkers: true });

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return aimBuddies.filter((b) => b.screenName.toLowerCase().includes(q));
  }, [query]);

  const openChat = (buddy: AimBuddy) => {
    openWindow({ kind: "aim_chat", title: `IM - ${buddy.screenName}`, icon: "/window.svg", bounds: { x: 320, y: 120, width: 380, height: 420 }, payload: { buddyId: buddy.id } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1, bgcolor: '#eaeaea', borderTop: '1px solid #fff' }}>
      <Header>
        <img src="/aim/running-man.png" width={20} height={20} alt="AIM" />
        <span>AIM Buddy List</span>
      </Header>
      <Box sx={{ p: 1, background: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Find a buddy..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>

      {/* Groups */}
      <Box sx={{ flex: 1, overflow: 'auto', background: '#fff' }}>
        {(['Buddies', 'Family', 'Coworkers'] as const).map((gName) => {
          const groupBuddies = filtered.filter((b) => {
            // naive demo grouping by last char hash
            const idx = (b.screenName.charCodeAt(0) + b.id.charCodeAt(1)) % 3;
            if (gName === 'Buddies') return idx === 0;
            if (gName === 'Family') return idx === 1;
            return idx === 2;
          });
          const onlineCount = groupBuddies.filter((b) => b.status === 'online').length;
          const open = groups[gName];
          return (
            <Box key={gName}>
              <GroupHeader onClick={() => setGroups((s) => ({ ...s, [gName]: !s[gName] }))}>
                <span>{gName}</span>
                <span style={{ fontWeight: 400 }}>{onlineCount} / {groupBuddies.length}</span>
              </GroupHeader>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List dense sx={{ py: 0 }}>
                  {groupBuddies.map((b) => (
                    <ListItemButton key={b.id} onDoubleClick={() => openChat(b)}>
                      <ListItemIcon>
                        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 6, background: b.status === 'online' ? '#00cc00' : b.status === 'away' ? '#ffcc00' : '#999' }} />
                      </ListItemIcon>
                      <ListItemText primary={b.screenName} primaryTypographyProps={{ fontSize: 13 }} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </Box>

      <Footer>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined">IM</Button>
            <Button size="small" variant="outlined">Info</Button>
            <Button size="small" variant="outlined">Chat</Button>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined">Away</Button>
            <Button size="small" variant="outlined">Setup</Button>
          </Stack>
        </Stack>
      </Footer>
    </Box>
  );
}
