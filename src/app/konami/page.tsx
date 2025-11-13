"use client"

import React from 'react'
import styled from '@emotion/styled'

const Page = styled('div')({
  height: '100vh',
  minHeight: '100vh',
  width: '100vw',
  position: 'relative',
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

export default function KonamiPage() {
  return (
    <Page>
      <video autoPlay loop playsInline muted>
        <source src="/glitch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Page>
  )
}
