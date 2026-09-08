"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import SsikalebPreview from "./ssikaleb/page";
import styles from "./home.module.css";

const KONAMI_KEYS = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'] as const;

const TransitionOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    background: 'transparent',
    overflow: 'hidden',
})

const TransitionScene = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    perspective: '1000px',
})

const Flipper = styled('div')({
    position: 'absolute',
    inset: 0,
    transformStyle: 'preserve-3d',
    transformOrigin: 'center',
    animation: 'flipY 1200ms ease-in-out forwards',

    '@keyframes flipY': {
        '0%': { transform: 'rotateY(0deg)' },
        '100%': { transform: 'rotateY(180deg)' },
    },
})

const Face = styled('div')({
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
})

const BackFace = styled(Face)({
    transform: 'rotateY(180deg)',
    overflow: 'hidden',
})


export default function LandingPage() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const dropRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [motion, setMotion] = useState(false);
    const [audioError, setAudioError] = useState("");
    const router = useRouter();
    const konami = useRef<string[]>([]);
    const touchSeq = useRef<string[]>([]);
    const touchStart = useRef<{ x: number; y: number; t: number } | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
            konami.current = [...konami.current, k].slice(-KONAMI_KEYS.length)
            const tail = konami.current.slice(-KONAMI_KEYS.length)
            if (!isTransitioning && tail.length === KONAMI_KEYS.length && KONAMI_KEYS.every((v, i) => tail[i] === v)) {
                setIsTransitioning(true)
            }
        }
        const onTouchStart = (e: TouchEvent) => {
            const t = e.touches[0]
            touchStart.current = { x: t.clientX, y: t.clientY, t: Date.now() }
        }
        const onTouchEnd = (e: TouchEvent) => {
            const s = touchStart.current
            if (!s) return
            const t = e.changedTouches[0]
            const dx = t.clientX - s.x
            const dy = t.clientY - s.y
            const dt = Date.now() - s.t
            const th = 30
            let dir = ''
            if (Math.abs(dx) < th && Math.abs(dy) < th && dt < 350) dir = 'tap'
            else if (Math.abs(dx) > Math.abs(dy)) dir = dx > 0 ? 'right' : 'left'
            else dir = dy > 0 ? 'down' : 'up'
            touchSeq.current = [...touchSeq.current, dir].slice(-10)
            const mobileKonami = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'tap', 'tap']
            const mobileTail = touchSeq.current.slice(-mobileKonami.length)
            if (!isTransitioning && mobileTail.length === mobileKonami.length && mobileKonami.every((v, i) => mobileTail[i] === v)) {
                setIsTransitioning(true)
            }
            touchStart.current = null
        }
        window.addEventListener('keydown', onKey, { passive: false } as AddEventListenerOptions)
        window.addEventListener('touchstart', onTouchStart, { passive: true } as AddEventListenerOptions)
        window.addEventListener('touchend', onTouchEnd)
        return () => {
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('touchstart', onTouchStart)
            window.removeEventListener('touchend', onTouchEnd)
        }
    }, [router, isTransitioning])

    useEffect(() => {
        if (isTransitioning) {
            try {
                if (dropRef.current) {
                    dropRef.current.currentTime = 0
                    // play once when transition starts
                    void dropRef.current.play().catch(() => {})
                } else {
                    // fallback in case ref isn't ready
                    const a = new Audio('/drop.wav')
                    void a.play().catch(() => {})
                }
            } catch {}
            const t = setTimeout(() => {
                router.push('/ssikaleb')
            }, 1200)
            return () => clearTimeout(t)
        }
    }, [isTransitioning, router])


    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setMotion(!preference.matches);
        update();
        preference.addEventListener("change", update);
        return () => preference.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (motion) void videoRef.current?.play().catch(() => {});
        else videoRef.current?.pause();
    }, [motion, isPlaying]);

    const toggleAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            setIsMuted(true);
            return;
        }
        try {
            audio.muted = false;
            await audio.play();
            setIsPlaying(true);
            setIsMuted(false);
            setAudioError("");
        } catch {
            setAudioError("Audio couldn’t start. Try again or use the listening links below.");
        }
    };

    return (
        <main className={`${styles.home} ${isPlaying ? styles.energized : ""} ${motion ? styles.moving : ""}`}>
            <a className={styles.skip} href="#release">Skip to music</a>
            {isPlaying && motion && (
                <div className={styles.signalSwitch} aria-hidden="true">
                    <div className={styles.colorSweep} />
                    <div className={styles.tearBands}><span /><span /><span /></div>
                </div>
            )}
            {isTransitioning && (
                <TransitionOverlay>
                    <TransitionScene>
                        <Flipper>
                            <Face>
                                {isPlaying || !isMuted ? (
                                    <video key="front-glitch" autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100vh', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: -1 }}>
                                        <source src="/Tunnel.m4v" type="video/mp4" />
                                    </video>
                                ) : (
                                    <video key="front-grunge" autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100vh', objectFit: 'cover', transform: 'translate(-50%, -50%)', zIndex: -1 }}>
                                        <source src="/grunge.mp4" type="video/mp4" />
                                    </video>
                                )}
                            </Face>
                            <BackFace>
                                <SsikalebPreview />
                            </BackFace>
                        </Flipper>
                    </TransitionScene>
                </TransitionOverlay>
            )}

            <audio ref={audioRef} src="/loop.mp3" loop preload="none" />
            <audio ref={dropRef} src="/drop.wav" preload="none" />
            <video ref={videoRef} key={isPlaying ? "tunnel" : "grunge"} className={styles.background} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
                <source src={isPlaying ? "/Tunnel.m4v" : "/grunge.mp4"} type="video/mp4" />
            </video>
            <header className={styles.header}>
                <span>LONG ISLAND, NEW YORK</span>
                <nav aria-label="Main navigation">
                    <a href="#release">Music</a>
                    <a href="https://www.sandsoftimerecordings.com/shop/p/bela-kiss-lp">Vinyl ↗</a>
                    <Link href="/epk" className={styles.epkLink}>EPK / Press kit ↗</Link>
                </nav>
            </header>
            <section className={styles.identity} aria-label="Bela Kiss">
                <div className={styles.distortion} aria-hidden="true" />
                <h1><Image src="/epk/bela-kiss-logo-white.png" width={1200} height={400} alt="Bela Kiss" priority sizes="(max-width: 760px) 90vw, 850px" /></h1>
                <div className={styles.identityBottom}>
                    <span>POST-HARDCORE</span>
                    <div className={styles.controls}>
                        <button type="button" onClick={toggleAudio} aria-pressed={isPlaying}>{isPlaying ? "Ⅱ SOUND OFF" : "▷ SOUND ON"}</button>
                        <button type="button" onClick={() => setMotion(!motion)} aria-pressed={motion}>{motion ? "PAUSE VISUALS" : "PLAY VISUALS"}</button>
                    </div>
                </div>
                <p className={styles.audioError} role="status">{audioError}</p>
            </section>
            <section id="release" className={styles.release} aria-labelledby="release-title">
                <a className={styles.record} href="https://www.sandsoftimerecordings.com/shop/p/bela-kiss-lp" aria-label="View MMXXV vinyl editions">
                    <Image src="/epk/mmxxv-record.jpg" width={1024} height={1024} alt="For Those Who Don’t Believe MMXXV vinyl editions" sizes="(max-width: 600px) 180px, 240px" />
                </a>
                <div className={styles.releaseInfo}>
                    <p className={styles.eyebrow}>MMXXV EDITION / OUT NOW</p>
                    <h2 id="release-title">For Those Who<br/>Don’t Believe</h2>
                    <p className={styles.description}>The 2005 debut, re-recorded by the original lineup.</p>
                    <div className={styles.listenLinks}>
                        <a href="https://open.spotify.com/album/3uJFuHewaNxRFxUhZzNPHG">Listen on Spotify ↗</a>
                        <a href="https://music.apple.com/us/album/for-those-who-dont-believe-mmxxv-edition/1858385623">Apple Music ↗</a>
                        <a href="https://distrokid.com/hyperfollow/belakiss/for-those-who-dont-believe-mmxxv">All listening links ↗</a>
                    </div>
                </div>
            </section>
            <footer className={styles.footer}>
                <nav aria-label="Follow Bela Kiss">
                    <a href="https://www.instagram.com/belakissmusic/">Instagram ↗</a>
                    <a href="https://www.tiktok.com/@bela.kiss.music">TikTok ↗</a>
                    <a href="https://www.facebook.com/belakissmusic/">Facebook ↗</a>
                </nav>
                <a href="mailto:belakissmusic@gmail.com">Contact ↗</a>
            </footer>
        </main>
    );
}
