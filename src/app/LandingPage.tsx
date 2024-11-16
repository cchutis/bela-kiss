"use client";
import React from 'react';
import styled from 'styled-components';

const LandingPageContainer = styled("div")({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundSize: 'cover',
 fontFamily: 'Montserrat, sans-serif',
 fontWeight: 100,

   'video': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
    opacity: 0.3,
    zIndex: -1,
  }

})


const Logo = styled("h1")({
  fontSize: '10vw', // Adjust this base size as needed
  letterSpacing: '5vw', // Adjust this for better scaling
  opacity: 0.8,

  // Minimum and maximum limits for better control
  '@media (max-width: 768px)': {
    fontSize: '8vw',
    letterSpacing: '4vw',
  },
  '@media (max-width: 480px)': {
    fontSize: '6vw',
    letterSpacing: '2vw',
  },
  '@media (min-width: 1200px)': {
    fontSize: '10vw', // Ensure the font scales well for larger screens too
    letterSpacing: '5vw',
  },
});


const LandingPage = () => {
  return (
<LandingPageContainer>
         
      <video autoPlay loop muted playsInline>
        <source src="./grunge.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <Logo>BELAKISS</Logo>

    
</LandingPageContainer>

  );
};

export default LandingPage;