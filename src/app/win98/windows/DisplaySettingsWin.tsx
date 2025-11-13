"use client";

import React from "react";
import { Box, TextField, RadioGroup, FormControlLabel, Radio, Button, Stack, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { DisplaySettings } from "../types";

const Section = styled(Box)({ padding: 8 });

export default function DisplaySettingsWin(props: { initial?: DisplaySettings }) {
  const [url, setUrl] = React.useState<string>(props.initial?.wallpaperUrl || "");
  const [mode, setMode] = React.useState<DisplaySettings["wallpaperMode"]>(props.initial?.wallpaperMode || "tile");
  const [preset, setPreset] = React.useState<NonNullable<DisplaySettings["iconPreset"]>>(props.initial?.iconPreset || "win98");

  const apply = () => {
    const detail: DisplaySettings = { wallpaperUrl: url || null, wallpaperMode: mode, iconPreset: preset };
    window.dispatchEvent(new CustomEvent<DisplaySettings>(
      "bk-apply-settings",
      { detail } as CustomEventInit<DisplaySettings>
    ));
  };

  const clear = () => {
    setUrl("");
    setMode("tile");
    setPreset("win98");
    const detail: DisplaySettings = { wallpaperUrl: null, wallpaperMode: "tile", iconPreset: "win98" };
    window.dispatchEvent(new CustomEvent<DisplaySettings>(
      "bk-apply-settings",
      { detail } as CustomEventInit<DisplaySettings>
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Section>
        <TextField
          label="Wallpaper URL"
          fullWidth
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/win98-wallpaper.png or https://..."
        />
      </Section>
      <Section>
        <FormLabel component="legend" sx={{ mr: 2 }}>Wallpaper Mode:</FormLabel>
        <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value as DisplaySettings["wallpaperMode"])}>
          <FormControlLabel value="tile" control={<Radio />} label="Tile" />
          <FormControlLabel value="center" control={<Radio />} label="Center" />
          <FormControlLabel value="stretch" control={<Radio />} label="Stretch" />
        </RadioGroup>
      </Section>
      <Section>
        <FormLabel component="legend" sx={{ mr: 2 }}>Icon Preset:</FormLabel>
        <RadioGroup row value={preset} onChange={(e) => setPreset(e.target.value as NonNullable<DisplaySettings["iconPreset"]>)}>
          <FormControlLabel value="win95" control={<Radio />} label="Win95" />
          <FormControlLabel value="win98" control={<Radio />} label="Win98" />
          <FormControlLabel value="win2k" control={<Radio />} label="Win2K" />
        </RadioGroup>
      </Section>
      <Section>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={apply}>Apply</Button>
          <Button variant="outlined" onClick={clear}>Reset</Button>
        </Stack>
      </Section>
    </Box>
  );
}
