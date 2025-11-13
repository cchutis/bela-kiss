"use client";

import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MyspaceHeader from "./MyspaceHeader";
import MyspacePlayer from "./MyspacePlayer";
import ReleaseInfo from "./ReleaseInfo";
import About from "./About";
import Bulletins from "./Bulletins";
import Comments from "./Comments";
import MarqueeBar from "./MarqueeBar";
import { bulletins, comments, releaseInfo } from "../data";
import CTAs from "./CTAs";
import type { OpenWindowOptions } from "../types";

const Root = styled(Box)({
  maxWidth: 920,
  margin: "12px auto",
  border: "1px solid #666",
  background: "#f8f8f8",
  boxShadow: "0 0 0 2px #fff inset",
});

const Columns = styled(Box)({
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  gap: 12,
  padding: 12,
});

const Sidebar = styled(Box)({ display: "flex", flexDirection: "column", gap: 12 });
const Main = styled(Box)({ display: "flex", flexDirection: "column", gap: 12 });

export default function MyspaceBelaKiss(props: {
  showToast: (msg: string) => void;
  openWindow: (opts: OpenWindowOptions) => void;
}) {
  const { showToast } = props;
  return (
    <Root>
      <MarqueeBar text="New single 'Graveyard Waltz' out Oct 31 — East Coast tour soon — Add us & say hi!" />
      <MyspaceHeader />
      <Columns>
        <Sidebar>
          <MyspacePlayer src="/loop.mp3" />
          <ReleaseInfo info={releaseInfo} />
          <CTAs
            ctas={releaseInfo.ctas as unknown as Array<{ label: string; href: string; kind?: 'primary' | 'secondary' }>}
            onClickCTA={(label) => showToast(label)}
          />
        </Sidebar>
        <Main>
          <About onAddFriend={() => showToast("Friend request sent!")} onSendMessage={() => showToast("Message sent!")} />
          <Bulletins items={bulletins} />
          <Comments items={comments} />
        </Main>
      </Columns>
    </Root>
  );
}
