'use client'

import React from 'react'
import styled from '@emotion/styled'
import { Instagram, Facebook, Mail, PlayArrow } from '@mui/icons-material'

const LandingPageContainer = styled('div')({
    height: '100vh',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundSize: 'cover',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 100,
    overflow: 'hidden',
    transform: 'scaleX(-1)',

    video: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        zIndex: -1,
    },
})

const LogoContainer = styled('div')({
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10vh',
})

const Logo = styled('h1')({
    fontFamily: 'Centruy Gothic, sans-serif',
    fontWeight: 100,
    fontSize: '10vw',
    margin: 'auto',
    opacity: 1,
    color: 'salmon',
    position: 'relative',
    filter: 'url(#logoPixelGlitch) drop-shadow(-8px 0 0 #ff004d) drop-shadow(6px 0 0 #00eaff)',
    animation: 'logoJitter 1.2s steps(7, end) infinite',

    '::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        opacity: 0.25,
    },

    '@media (max-width: 768px)': {
        fontSize: '12vw',
    },
    '@media (max-width: 480px)': {
        fontSize: '12vw',
    },
    '@media (min-width: 1200px)': {
        fontSize: '12vw',
    },

    '@keyframes logoJitter': {
        '0%': { transform: 'translateX(0)' },
        '20%': { transform: 'translateX(-0.5px)' },
        '40%': { transform: 'translateX(0.5px)' },
        '60%': { transform: 'translateX(-2px)' },
        '80%': { transform: 'translateX(1px)' },
        '100%': { transform: 'translateX(0)' },
    },
})
const BottomAnchor = styled('div')({
    bottom: '2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5vw',
    letterSpacing: '0.5vw',
    marginBottom: '2vh',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '1vh',
    borderRadius: '1vh',

    p: {
        width: 'fit-content',
        margin: '0 auto',
        fontSize: '1vw',
    },
    a: {
        color: 'white',
        textDecoration: 'underline',
        '&:hover': {
            color: 'maroon',
        },
    },

    span: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1vh',
        img: {
            width: '2vw',
            height: '2vw',
            margin: '0 0.5vw',
        },
    },
    '.mmxxv': {
        fontSize: '2vw',
    },
    '@media (max-width: 768px)': {
        fontSize: '3.5vw',
    },
    '@media (max-width: 480px)': {
        fontSize: '3.5vw',
    },
    '@media (min-width: 1200px)': {
        fontSize: '1.5vw',
    },
})

const IconContainer = styled.div`
    display: flex;
    gap: 50px;
    margin-top: 20px;
`

const Icon = styled.div`
    color: white;
    font-size: 30px;
`

const PlayButton = styled('div')({
    marginBottom: '7vh',
    cursor: 'pointer',
    fontSize: '80px',
})

export default function SsikalebPage() {
    const droneRef = React.useRef<HTMLAudioElement | null>(null)
    const teaserRef = React.useRef<HTMLAudioElement | null>(null)
    const [isTeaserPlaying, setIsTeaserPlaying] = React.useState(false)

    React.useEffect(() => {
        const a = droneRef.current
        if (a) {
            a.loop = true
            a.currentTime = 0
            a.volume = 0.5
            void a.play().catch(() => {})
        }
    }, [])

    return (
        <LandingPageContainer>
            <audio ref={droneRef} src="/drone.wav" preload="auto" />
            <audio ref={teaserRef} src="/teaser-site.mp3" preload="auto" onEnded={() => setIsTeaserPlaying(false)} />
            {/* Hidden SVG filter for logo pixel-glitch only on this page */}
            <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="logoPixelGlitch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="1" seed="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
            <video autoPlay loop playsInline muted>
                <source src="/glitch.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <LogoContainer>
                <Logo>belakiss.</Logo>
            </LogoContainer>
            {/* Center play button matching LandingPage styling */}
            <PlayButton>
                {isTeaserPlaying ? (
                    <img src="/heart.jpeg" alt="Heart" style={{ height: '1em', width: 'auto', mixBlendMode: 'screen' }} />
                ) : (
                    <PlayArrow
                        fontSize="inherit"
                        onClick={() => {
                            const a = teaserRef.current
                            if (a) {
                                a.currentTime = 0
                                a.play()
                                    .then(() => setIsTeaserPlaying(true))
                                    .catch(() => {})
                            }
                        }}
                    />
                )}
            </PlayButton>
            <BottomAnchor>
                <p>FOR THOSE WHO DON&apos;T BELIEVE</p>
                <p className="mmxxv">MMXXV</p>
                <p>OUT 12/12 ON ALL STREAMING PLATFORMS</p>
                <p>
                    <a href="https://www.sandsoftimerecordings.com/shop" rel="noopener" title="Presave: Album (12/12)" target="_blank">
                        PREORDERS LIVE NOW - SANDS OF TIME RECORDINGS SHOP
                    </a>
                </p>
                <p>
                    <a href="https://distrokid.com/hyperfollow/belakiss/for-those-who-dont-believe-mmxxv" rel="noopener" title="Presave: Album (12/12)" target="_blank">
                        PRESAVE FOR THOSE WHO DON&apos;T BELIEVE MMXXV ON SPOTIFY
                    </a>
                </p>
                <IconContainer>
                    <Icon>
                        <a href="https://www.instagram.com/belakissmusic/" rel="noopener" title="Bela Kiss Instagram" target="_blank">
                            <Instagram fontSize="inherit" />
                        </a>
                    </Icon>
                    <Icon>
                        <a href="https://www.tiktok.com/@bela.kiss.music" rel="noopener" title="Bela Kiss TikTok" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                            </svg>
                        </a>
                    </Icon>
                    <Icon>
                        <a href="https://www.facebook.com/belakissmusic/" rel="noopener" title="Bela Kiss Facebook" target="_blank">
                            <Facebook fontSize="inherit" />
                        </a>
                    </Icon>
                    <Icon>
                        <a href="https://open.spotify.com/artist/3Mux7Zs7xghwKYuhLqYL64" rel="noopener" title="Bela Kiss Spotify" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                                />
                            </svg>
                        </a>
                    </Icon>
                    <Icon>
                        <a href="https://music.apple.com/us/artist/bela-kiss/104588855" rel="noopener" title="Bela Kiss Apple Music" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073"
                                />
                            </svg>
                        </a>
                    </Icon>
                    <Icon>
                        <a href="mailto:belakissmusic@gmail.com" rel="noopener" title="Inquiries" target="_blank">
                            <Mail fontSize="inherit" />
                        </a>
                    </Icon>
                </IconContainer>
            </BottomAnchor>
        </LandingPageContainer>
    )
}
