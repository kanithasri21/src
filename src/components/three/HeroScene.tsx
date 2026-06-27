import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({
  position,
  color,
  geometry,
  speed = 1,
}: {
  position: [number, number, number]
  color: string
  geometry: 'box' | 'torus' | 'octahedron'
  speed?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.y = t * 0.5
  })

  const geo = useMemo(() => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[0.8, 0.8, 0.8]} />
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.6]} />
    }
  }, [geometry])

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        {geo}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe={geometry === 'octahedron'}
        />
      </mesh>
    </Float>
  )
}

function CodeSymbol({ position, char }: { position: [number, number, number]; char: string }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const { x, y } = state.pointer
    ref.current.position.x = position[0] + x * 0.3
    ref.current.position.y = position[1] + y * 0.3
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <planeGeometry args={[0.6, 0.6]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const { x, y } = state.pointer
    groupRef.current.rotation.y = x * 0.15
    groupRef.current.rotation.x = y * 0.1
  })

  return (
  <>
    <ambientLight intensity={0.4} />
    <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
    <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8B5CF6" />

    <group ref={groupRef}>
      <FloatingShape position={[-2.5, 1.5, -2]} color="#3B82F6" geometry="box" speed={0.8} />
      <FloatingShape position={[2.8, -1, -3]} color="#06B6D4" geometry="torus" speed={1.2} />
      <FloatingShape position={[1.5, 2, -4]} color="#8B5CF6" geometry="octahedron" speed={1} />
      <FloatingShape position={[-1.8, -1.8, -2.5]} color="#3B82F6" geometry="box" speed={0.6} />
      <FloatingShape position={[3, 1.8, -5]} color="#06B6D4" geometry="octahedron" speed={0.9} />
    </group>

    <CodeSymbol position={[-3, 0, -1]} char="<" />
    <CodeSymbol position={[3.2, 0.5, -2]} char=">" />
  </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
