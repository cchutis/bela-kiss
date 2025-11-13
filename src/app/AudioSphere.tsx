import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

// Custom hook for audio analyser
const useAudioAnalyser = (audioRef: React.RefObject<HTMLAudioElement>) => {
    const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null)

    useEffect(() => {
        if (audioRef.current) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const source = audioContext.createMediaElementSource(audioRef.current)
            const analyserNode = audioContext.createAnalyser()
            analyserNode.fftSize = 256
            source.connect(analyserNode)
            analyserNode.connect(audioContext.destination)

            setAnalyser(analyserNode)
        }
    }, [audioRef])

    return analyser
}

const AudioSphere: React.FC<{ audioRef: React.RefObject<HTMLAudioElement> }> = ({ audioRef }) => {
    const dotsRef = useRef<THREE.Points>(null)
    const analyser = useAudioAnalyser(audioRef)

    useFrame(() => {
        if (!dotsRef.current || !analyser) return

        const dataArray = new Uint8Array(analyser.fftSize)
        analyser.getByteFrequencyData(dataArray)

        const positions = dotsRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
            const index = Math.floor((i / 3) % analyser.fftSize)
            const scale = 1 + dataArray[index] / 255 // Map audio frequency data to scale factor

            positions[i] *= scale
            positions[i + 1] *= scale
            positions[i + 2] *= scale
        }

        dotsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={dotsRef}>
            <sphereGeometry args={[5, 64, 64]} />
            <pointsMaterial color="#ff0000" size={0.05} />
        </points>
    )
}

// Export the container dynamically to prevent SSR issues
const AudioSphereContainer: React.FC<{ audioRef: React.RefObject<HTMLAudioElement> }> = ({ audioRef }) => {
    return (
        <Canvas camera={{ position: [0, 0, 15] }}>
            <ambientLight />
            <AudioSphere audioRef={audioRef} />
        </Canvas>
    )
}

export default dynamic(() => Promise.resolve(AudioSphereContainer), { ssr: false })
