"use client";

import React from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const scroll = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
`;

const Bar = styled(Box)({
  background: '#000',
  color: '#0f0',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

const Inner = styled('div')({
  display: 'inline-block',
  padding: '2px 0',
  animation: `${scroll} 18s linear infinite`,
});

export default function MarqueeBar({ text }: { text: string }) {
  return (
    <Bar>
      <Inner>{text} — {text}</Inner>
    </Bar>
  );
}
