"use client";

import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Paper)({ padding: 8 });

type ReleaseInfoProps = {
  info: { title: string; type: string; releaseDate: string };
};

export default function ReleaseInfo({ info }: ReleaseInfoProps) {
  return (
    <Card variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Release
      </Typography>
      <Typography variant="body2"><b>Title:</b> {info.title}</Typography>
      <Typography variant="body2"><b>Type:</b> {info.type}</Typography>
      <Typography variant="body2"><b>Release Date:</b> {info.releaseDate}</Typography>
    </Card>
  );
}
