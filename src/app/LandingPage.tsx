'use client'
import React from 'react'
import styled from 'styled-components'
import { Instagram, Facebook, Mail } from '@mui/icons-material'

const LandingPageContainer = styled('div')({
    height: '100vh',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
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
        opacity: 0.5,
        zIndex: -1,
    },
})

const Logo = styled('h1')({
    fontSize: '10vw',
    letterSpacing: '5vw',
    opacity: 0.8,
    color: 'white',

    '@media (max-width: 768px)': {
        fontSize: '12vw',
        letterSpacing: '4vw',
    },
    '@media (max-width: 480px)': {
        fontSize: '12vw',
        letterSpacing: '2vw',
    },
    '@media (min-width: 1200px)': {
        fontSize: '10vw',
        letterSpacing: '5vw',
    },
})

const BottomAnchor = styled('div')({
    position: 'absolute',
    bottom: '2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    fontSize: '1.5vw',
    letterSpacing: '0.5vw',

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

const BottomRightContact = styled('div')({
    position: 'absolute',
    bottom: '2vh',
    right: '2vw',
    color: 'white',
    fontSize: '16px',
    a: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            animation: 'glow 1s ease-in-out infinite alternate',
        },
    },
    '@keyframes glow': {
        '0%': {
            textShadow: '0 5px 10px white',
        },
        '100%': {
            textShadow: '0 10px 100px white',
        },
    },
    '@media (max-width: 768px)': {
        display: 'none',
    },
})

const MobileOnlyIcon = styled(Icon)({
    '@media (min-width: 768px)': {
        display: 'none',
    },
})

const LandingPage = () => {
    return (
        <LandingPageContainer>
            <video autoPlay loop muted playsInline>
                <source src="./grunge.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <Logo>BELAKISS</Logo>
            <BottomAnchor>
                <p>FOR THOSE WHO DON&apos;T BELIEVE</p>
                <p>20 YEAR ANNIVERSARY RE-RELEASE</p>
                <p>COMING IN 2025</p>
                <IconContainer>
                    <Icon>
                        <a href="https://www.instagram.com/belakissmusic/" rel="noopener" title="Bela Kiss Instagram" target="_blank">
                            <Instagram fontSize="inherit" />
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
                    <MobileOnlyIcon>
                        <a href="mailto:belakissmusic@gmail.com" rel="noopener" title="Inquiries" target="_blank">
                            <Mail fontSize="inherit" />
                        </a>
                    </MobileOnlyIcon>
                </IconContainer>
            </BottomAnchor>
            <BottomRightContact>
                <p>
                    Inquires: &nbsp;
                    <a href="mailto:belakissmusic@gmail.com" rel="noopener" title="Inquiries" target="_blank">
                        belakissmusic@gmail.com
                    </a>
                </p>
            </BottomRightContact>
        </LandingPageContainer>
    )
}

export default LandingPage
