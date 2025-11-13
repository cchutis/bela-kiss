"use client";

import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Paper)({ padding: 8 });

type Comment = { id: number; author: string; body: string };

export default function Comments({ items }: { items: Comment[] }) {
  return (
    <Card variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Comments
      </Typography>
      <List dense>
        {items.map((c, idx) => (
          <React.Fragment key={c.id}>
            <ListItem alignItems="flex-start" sx={{ py: 0.5 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'body2', fontWeight: 700 }}
                secondaryTypographyProps={{ variant: 'body2' }}
                primary={c.author}
                secondary={c.body}
              />
            </ListItem>
            {idx < items.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
}
