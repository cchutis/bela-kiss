"use client";

import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Paper)({ padding: 8 });

type CTA = { label: string; href: string; kind?: "primary" | "secondary" };

export default function CTAs(props: { ctas: CTA[]; onClickCTA?: (label: string) => void }) {
  const { ctas, onClickCTA } = props;
  return (
    <Card variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Listen / Support
      </Typography>
      <Stack direction="row" spacing={1}>
        {ctas.map((c) => (
          <Button
            key={c.label}
            size="small"
            variant={c.kind === 'secondary' ? 'outlined' : 'contained'}
            href={c.href}
            onClick={(e) => { e.preventDefault(); onClickCTA?.(c.label); }}
          >
            {c.label}
          </Button>
        ))}
      </Stack>
    </Card>
  );
}
