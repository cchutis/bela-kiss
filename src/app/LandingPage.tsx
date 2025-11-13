'use client'
import React, { useState, useRef, useEffect } from 'react'
import SsikalebPreview from './ssikaleb/page'
import styled from '@emotion/styled'
import { Instagram, Facebook, Mail, VolumeOff, VolumeUp, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const KONAMI_KEYS = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'] as const

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

const MuteButton = styled('div')({
    position: 'absolute',
    top: '2vh',
    left: '2vw',
    zIndex: 2,
    cursor: 'pointer',
    color: 'white',
    fontSize: '7vh',
})

const LogoContainer = styled('div')({
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10vh',
})

const Logo = styled('h1', {
    shouldForwardProp: (prop) => prop !== '$isPlaying' && prop !== '$isMuted',
})<{ $isPlaying: boolean; $isMuted: boolean }>((props) => ({
    fontFamily: 'Centruy Gothic, sans-serif',
    fontWeight: 100,
    fontSize: '10vw',
    margin: 'auto',
    opacity: props.$isPlaying || !props.$isMuted ? 1 : 0.5,
    color: props.$isPlaying || !props.$isMuted ? 'maroon' : 'white',
    textShadow: props.$isPlaying || !props.$isMuted ? '1px 1px 100px #840573' : 'none',

    '@media (max-width: 768px)': {
        fontSize: '12vw',
    },
    '@media (max-width: 480px)': {
        fontSize: '12vw',
    },
    '@media (min-width: 1200px)': {
        fontSize: '12vw',
    },
}))
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

const LandingPage = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const dropRef = useRef<HTMLAudioElement | null>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const router = useRouter()
    const konami = React.useRef<string[]>([])
    const touchSeq = React.useRef<string[]>([])
    const touchStart = React.useRef<{ x: number; y: number; t: number } | null>(null)

    console.log(
        'YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. YOU ARE NOW A ROBOT. '
    )

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const isArrow = e.key.startsWith('Arrow')
            if (isArrow) e.preventDefault()
            const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
            konami.current.push(k)
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
            touchSeq.current.push(dir)
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
                    void dropRef.current.play()
                } else {
                    // fallback in case ref isn't ready
                    const a = new Audio('/drop.wav')
                    void a.play()
                }
            } catch {}
            const t = setTimeout(() => {
                router.push('/ssikaleb')
            }, 1200)
            return () => clearTimeout(t)
        }
    }, [isTransitioning, router])

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.muted = false
            audioRef.current.play()
            setIsPlaying(true)
            setIsMuted(false)
        }
    }

    return (
        <LandingPageContainer>
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
            <audio ref={audioRef} src="./loop.mp3" loop />
            <audio ref={dropRef} src="/drop.wav" preload="auto" />
            {isPlaying && <MuteButton onClick={toggleMute}>{isMuted ? <VolumeOff fontSize="inherit" /> : <VolumeUp fontSize="inherit" />}</MuteButton>}
            {isPlaying || !isMuted ? (
                <video key="glitch-video" autoPlay loop playsInline>
                    <source src="/Tunnel.m4v" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <video key="grunge-video" autoPlay loop muted playsInline>
                    <source src="/grunge.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <LogoContainer>
                <Logo $isPlaying={isPlaying} $isMuted={isMuted} onClick={handlePlay}>
                    belakiss.
                </Logo>
            </LogoContainer>
            {!isPlaying && (
                <PlayButton>
                    <PlayArrow fontSize="inherit" onClick={handlePlay} />
                </PlayButton>
            )}
            {/* AudioSphere temporarily removed to isolate ReactCurrentOwner error */}
            <BottomAnchor>
                <p>FOR THOSE WHO DON&apos;T BELIEVE</p>
                <p className="mmxxv">MMXXV</p>
                <p>OUT 12/12 ON ALL STREAMING PLATFORMS</p>
                <p>VINYL PREORDERS BEGIN 11/15</p>
                <p>
                    <a href="https://distrokid.com/hyperfollow/belakiss/knight-without-his-sky-mmxxv-edition" rel="noopener" title="Presave: Knight Without His Sky (11/14)" target="_blank">
                        PRESAVE KNIGHT WITHOUT HIS SKY SINGLE ON SPOTIFY - 11/14
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

export default LandingPage
