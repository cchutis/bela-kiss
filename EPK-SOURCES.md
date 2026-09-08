# EPK draft sources

Researched September 8, 2026. Content and assets are provisional for band review.

- Bio: https://lambgoat.com/news/49845/bela-kiss-announce-return-with-new-line-up-re-recording-2005-debut-album/ (October 5, 2025 reunion, Long Island, genre, re-recording; lineup corrected by the band). Avoided old lineup listings and other artists named Bela Kiss.
- Reunion photo: https://lambgoat.com/cdn/2025/bela-kiss-25-20251005090014.jpg . Photographer @inaflashpro, Ronkonkoma NY, per band statement quoted in article. Initial 313x161 web copy superseded by user-supplied 1366x2048 promo photo.
- MMXXV release: https://www.sandsoftimerecordings.com/shop/p/bela-kiss-lp and https://www.sandsoftimerecordings.com/listen . Product image https://images.squarespace-cdn.com/content/v1/6491cc6a5185f305d9c27536/fb81e3e1-8ca8-4b26-8a8f-741cc376c58c/IMG_4399.JPG . This is a vinyl promotional composite, not clean album artwork. No individual artwork credit found.
- Video: https://www.youtube.com/watch?v=jHWoiNeBlHs . Label /listen page incorrectly labeled this video as Knight Without His Sky. User correction and YouTube oEmbed confirm Dear, Miss. illneverforgetyourname (MMXXV Edition) — Official Lyric Video.
- Music, email and social links: existing src/app/LandingPage.tsx, also published on belakiss.com.
- Label catalog https://www.sandsoftimerecordings.com/discography lists SOTR-030 and November 15, 2025; homepage gives December 12 for streaming. Page deliberately uses 2025 without conflating physical and digital dates.

## Review / replace next

Confirm booking email and supply clean cover art. Add a current live video and notable shows when supplied. No invented press endorsements, lineup or audience statistics included. Spotify player features the MMXXV album directly.

## Implementation

Route: /epk. Content: src/app/epk/page.tsx. Styling: src/app/epk/epk.module.css. Downloads: public/epk. Existing homepage is unchanged. No dependency changes or publishing required for this local draft.

## Revision: visual identity

Removed acid yellow, oversized stacked title, slogan strip and promotional headings. Uses the existing grunge.mp4 as a muted background texture; hidden for reduced-motion users.

Band logos verified in the user-provided Drive folder BK_LOGOS_2025: https://drive.google.com/drive/u/1/folders/1OjZtEV_W2kNq6wwx-f-0QnwutJ9fDVye . Used matching existing local Downloads/BKLOGO_WHITE.png and BKLOGO_RED.png originals. No logo redraw or generated replacement. Drive also contains WEB AND MEDIA ASSETS and full album art; those have not been imported yet.

## Band-provided corrections and assets

The band confirmed the returning lineup is the original 2005 lineup. This overrides the article wording; both webpage and downloadable bio are corrected. The press link uses a descriptive summary rather than repeating the incorrect lineup headline.

User supplied E9C4C6A4-4982-4A71-A72B-D2514E9CC356.JPG (1366x2048) replaces the small photo; displayed in color with a centered 4:3 CSS crop and offered uncropped for download. Existing @inaflashpro credit retained for the same Ronkonkoma photo. User supplied belakiss.png is the Linktree QR, offered unchanged as a download. Added original Downloads/BKLOGO_DARK.png as the black logo download.

Knight Without His Sky lyric video: https://www.youtube.com/watch?v=AXaSl6PSCug . Confirmed in the official @BelaKissOfficial channel listing and supplied by the user. Added alongside the correctly labeled Dear Miss video.

## Release status correction

Band confirmed MMXXV is self-released and Bela Kiss is currently unsigned. Sands of Time Recordings handled only the vinyl pressing and release. Page and downloadable biography reflect this; Sands of Time links and credit are explicitly for vinyl. This band-provided correction overrides any broader label affiliation inferred from external sources.

## General press kit / discography

Added earlier releases verified from artist catalogs:
- For Those Who Don't Believe (2005), 8 tracks: https://music.apple.com/us/album/for-those-who-dont-believe/104589990
- The Horde (2007), 7 tracks: https://music.apple.com/us/album/the-horde/258777500
- 2008 Demo (2008), 3 tracks: https://belakisslongisland.bandcamp.com/album/2008-demo
- The Closure EP (2009), 4 tracks: https://belakisslongisland.bandcamp.com/album/the-closure-ep-2

Broadened hero, metadata and both biographies to the general band catalog. MMXXV remains the featured latest release, with unsigned/self-release and vinyl-only credits preserved.

MMXXV Spotify album https://open.spotify.com/album/3uJFuHewaNxRFxUhZzNPHG verified from the official artist page album listing. Replaces the artist top-songs embed; adjacent Spotify link also opens this album.
