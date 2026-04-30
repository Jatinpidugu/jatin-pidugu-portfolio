import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

const DistortBlob = ({ position = [0, 0, 0], color = '#cc785c', speed = 1.4, distort = 0.45, scale = 2.5 }) => {
  const ref = useRef()
  useFrame(({ mouse, clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.x = mouse.y * 0.4 + Math.sin(t * 0.3) * 0.2
    ref.current.rotation.y = mouse.x * 0.4 + Math.cos(t * 0.2) * 0.2
  })
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
    </Float>
  )
}

const Torus = ({ position = [0, 0, 0], color = '#bd5d3a', scale = 1 }) => {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.getElapsedTime() * 0.15
    ref.current.rotation.y = clock.getElapsedTime() * 0.2
  })
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.8, 0.25, 40, 100]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    </Float>
  )
}

const Hero3DScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#faf9f5" />
        <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#cc785c" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#e7c8a8" />

        <DistortBlob position={[2.4, 0.6, 0]} color="#cc785c" scale={1.8} distort={0.5} speed={1.6} />
        <DistortBlob position={[-2.6, -0.8, -1]} color="#bd5d3a" scale={1.3} distort={0.6} speed={1.2} />
        <Torus position={[-1.8, 1.4, 0.5]} color="#3d3929" scale={0.6} />
        <Torus position={[2.0, -1.6, 0.5]} color="#8a7d65" scale={0.5} />

        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}

export default Hero3DScene
