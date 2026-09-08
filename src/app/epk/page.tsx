import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./epk.module.css";

export const metadata: Metadata = {
  title: "Bela Kiss — Electronic Press Kit",
  description: "Bela Kiss electronic press kit. Biography, discography, videos, press assets and contact. Unsigned post-hardcore from Long Island, New York.",
};

export default function EpkPage() {
  return (
    <main className={styles.epk}>
      <a className={styles.skip} href="#music">Skip to music</a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark}><Image src="/epk/bela-kiss-logo-white.png" width={150} height={50} alt="Bela Kiss home" /></Link>
        <span className={styles.label}>LONG ISLAND, NY / ELECTRONIC PRESS KIT</span>
        <nav aria-label="Press kit"><a href="#story">The band</a><a href="#music">Music</a><a href="#press">Press</a><a href="#contact">Contact ↗</a></nav>
      </header>
      <section className={styles.hero} aria-labelledby="epk-title">
        <video className={styles.texture} autoPlay muted loop playsInline aria-hidden="true" tabIndex={-1}><source src="/grunge.mp4" type="video/mp4" /></video>
        <div className={styles.heroTop}><span>LONG ISLAND, NEW YORK</span><span>PRESS KIT</span></div>
        <h1 id="epk-title"><Image src="/epk/bela-kiss-logo-white.png" width={1200} height={400} alt="Bela Kiss" priority /></h1>
        <div className={styles.heroBottom}><p>LONG ISLAND<br/>POST-HARDCORE</p><a className={styles.button} href="#music">LISTEN <span>↓</span></a><span className={styles.sideNote}>UNSIGNED<br/>BOOKING & PRESS</span></div>
      </section>
      <section id="story" className={styles.section}>

        <div className={styles.story}><div><figure className={styles.photo}><Image src="/epk/bela-kiss-promo-2025.jpg" width={1366} height={2048} sizes="(max-width: 760px) 88vw, 580px" alt="Bela Kiss reunited in Ronkonkoma, New York in 2025"/><figcaption>RONKONKOMA, NY / 2025<br/>PHOTO: @INAFLASHPRO</figcaption></figure></div><div><h2>Biography</h2><p>Bela Kiss is an unsigned post-hardcore band from Long Island, New York. Their catalog includes the 2005 debut, <i>For Those Who Don’t Believe</i>, <i>The Horde</i> (2007), <i>2008 Demo</i>, and <i>The Closure EP</i> (2009).</p><p>In 2025, the band reunited with its original 2005 lineup and revisited its 2005 debut, <i>For Those Who Don’t Believe</i>.</p><p>Re-recorded from the ground up, the MMXXV edition is self-released. Sands of Time Recordings handled the vinyl pressing and release.</p><a className={styles.textLink} href="https://www.instagram.com/belakissmusic/">Follow @belakissmusic ↗</a></div></div>
      </section>
      <section id="music" className={styles.section}>
        <h2>Discography</h2><div className={styles.sectionLabel}>LATEST RELEASE / 2025</div>
        <h2>For Those Who Don’t Believe</h2>
        <div className={styles.releaseMeta}><span>MMXXV EDITION</span><span>SELF-RELEASED</span><span>RE-RECORDED / 2025</span></div>
        <div className={styles.recordGrid}><a href="https://www.sandsoftimerecordings.com/shop/p/bela-kiss-lp" className={styles.recordImage}><Image src="/epk/mmxxv-record.jpg" width={1024} height={1024} alt="For Those Who Don't Believe MMXXV white and red vinyl editions from Sands of Time Recordings"/><span>VINYL / SANDS OF TIME RECORDINGS / SOTR-030 ↗</span></a><div><iframe className={styles.player} title="Listen to For Those Who Don’t Believe (MMXXV Edition) on Spotify" src="https://open.spotify.com/embed/album/3uJFuHewaNxRFxUhZzNPHG?utm_source=generator&theme=0" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /><div className={styles.platforms}><a href="https://open.spotify.com/album/3uJFuHewaNxRFxUhZzNPHG">Spotify ↗</a><a href="https://music.apple.com/us/artist/bela-kiss/104588855">Apple Music ↗</a></div></div></div>
        <div className={styles.catalog}>
          {[
            { title: "The Closure EP", year: "2009", detail: "EP · 4 tracks", url: "https://belakisslongisland.bandcamp.com/album/the-closure-ep-2", platform: "Bandcamp" },
            { title: "2008 Demo", year: "2008", detail: "Demo · 3 tracks", url: "https://belakisslongisland.bandcamp.com/album/2008-demo", platform: "Bandcamp" },
            { title: "The Horde", year: "2007", detail: "7 tracks", url: "https://music.apple.com/us/album/the-horde/258777500", platform: "Apple Music" },
            { title: "For Those Who Don’t Believe", year: "2005", detail: "Original recording · 8 tracks", url: "https://music.apple.com/us/album/for-those-who-dont-believe/104589990", platform: "Apple Music" },
          ].map((release) => (
            <article className={styles.catalogRelease} key={release.year}>
              <span className={styles.catalogYear}>{release.year}</span>
              <div><h3>{release.title}</h3><p>{release.detail}</p></div>
              <a href={release.url} aria-label={`Listen to ${release.title} on ${release.platform}`}>{release.platform} ↗</a>
            </article>
          ))}
        </div>
        <h2 className={styles.videosHeading}>Videos</h2>
        <div className={styles.videoLabel}><span>DEAR, MISS. ILLNEVERFORGETYOURNAME</span><span>OFFICIAL LYRIC VIDEO / MMXXV</span></div><iframe className={styles.video} title="Bela Kiss — Dear, Miss. illneverforgetyourname (MMXXV Edition) — Official Lyric Video" src="https://www.youtube-nocookie.com/embed/jHWoiNeBlHs" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"/><a className={styles.textLink} href="https://www.youtube.com/watch?v=jHWoiNeBlHs">Watch on YouTube ↗</a>
        <div className={styles.videoLabel}><span>KNIGHT WITHOUT HIS SKY</span><span>OFFICIAL LYRIC VIDEO / MMXXV</span></div><iframe className={styles.video} title="Bela Kiss — Knight Without His Sky (MMXXV Edition) — Official Lyric Video" src="https://www.youtube-nocookie.com/embed/AXaSl6PSCug" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"/><a className={styles.textLink} href="https://www.youtube.com/watch?v=AXaSl6PSCug">Watch on YouTube ↗</a>
      </section>
      <section id="press" className={styles.section}><div className={styles.pressGrid}><div><h2>Press</h2><a className={styles.pressArticle} href="https://lambgoat.com/news/49845/bela-kiss-announce-return-with-new-line-up-re-recording-2005-debut-album/"><span>LAMBGOAT / OCTOBER 05, 2025</span><h3>Bela Kiss return to re-record their 2005 debut <span>↗</span></h3><p>Read the reunion announcement</p></a></div><div className={styles.downloads}><h3>Downloads & links</h3><a href="/epk/bela-kiss-promo-2025.jpg" download>Promo photo <span>JPG ↓</span></a><a href="/epk/bela-kiss-logo-black.png" download>Black logo <span>PNG ↓</span></a><a href="/epk/bela-kiss-logo-white.png" download>White logo <span>PNG ↓</span></a><a href="/epk/bela-kiss-logo-red.png" download>Red logo <span>PNG ↓</span></a><a href="/epk/bela-kiss-bio.txt" download>Short biography <span>TXT ↓</span></a><a href="https://www.sandsoftimerecordings.com/shop/p/bela-kiss-lp">Vinyl — Sands of Time Recordings <span>↗</span></a><a href="/epk/bela-kiss-linktree-qr.png" download>Linktree QR code <span>PNG ↓</span></a></div></div></section>
      <section id="contact" className={`${styles.section} ${styles.contact}`}><h2>Contact</h2><p>Booking & press</p><a className={styles.email} href="mailto:belakissmusic@gmail.com">belakissmusic@gmail.com ↗</a><div className={styles.platforms}><a href="https://www.instagram.com/belakissmusic/">Instagram ↗</a><a href="https://www.facebook.com/belakissmusic/">Facebook ↗</a><a href="https://www.tiktok.com/@bela.kiss.music">TikTok ↗</a></div></section>
      <footer className={styles.footer}><Link href="/"><Image src="/epk/bela-kiss-logo-red.png" width={150} height={50} alt="Bela Kiss home" /></Link><span>LONG ISLAND, NEW YORK</span><a href="#epk-title">BACK TO TOP ↑</a></footer>
    </main>
  );
}
