"use client";

import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Paper)({ padding: 8 });

type Bulletin = { id: number; text: string };

export default function Bulletins({ items }: { items: Bulletin[] }) {
  return (
    <Card variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700}>Bulletins</Typography>
      <List dense>
        {items.map((b) => (
          <ListItem key={b.id} sx={{ py: 0 }}>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={b.text} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
