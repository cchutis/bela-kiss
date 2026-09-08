import type { Metadata } from "next";
import LandingPage from "./LandingPage";

export const metadata: Metadata = {
  title: "Bela Kiss — Long Island Post-Hardcore",
  description: "Bela Kiss. For Those Who Don’t Believe, MMXXV edition, out now. Listen, find vinyl, and explore the band’s electronic press kit.",
};

export default function Home() {
  return (
   <LandingPage />
  );
}
