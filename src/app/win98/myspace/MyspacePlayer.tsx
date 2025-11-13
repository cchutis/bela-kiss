"use client";

import React from "react";
import { Box, IconButton, Slider, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const PlayerBox = styled(Paper)({ padding: 8, display: 'flex', flexDirection: 'column', gap: 8 });

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MyspacePlayer({ src }: { src: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  const onSeek = (_: Event, v: number | number[]) => {
    const a = audioRef.current; if (!a) return;
    const val = Array.isArray(v) ? v[0] : v;
    a.currentTime = val;
    setCurrent(val);
  };

  return (
    <PlayerBox variant="outlined" square>
      <Typography variant="subtitle2" fontWeight={700}>MySpace Player</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶'}
        </IconButton>
        <Slider
          min={0}
          max={duration || 0}
          step={1}
          value={current}
          onChange={onSeek}
          sx={{ flex: 1 }}
        />
        <Typography variant="caption" sx={{ width: 64, textAlign: 'right' }}>
          {fmt(current)} / {fmt(duration || 0)}
        </Typography>
      </Box>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
        preload="auto"
      />
    </PlayerBox>
  );
}
