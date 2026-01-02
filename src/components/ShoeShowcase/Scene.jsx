import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { useRef } from 'react'
import Selector from './Selector'
import Shoe from './Shoe'

export default function Scene() {
  return (
    <Canvas
      className="shoe-canvas"
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      <color attach="background" args={['#f1efdd']} />
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <Environment preset="city" />
      <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />
      <Selector>
        <Shoe rotation={[0.3, Math.PI / 1.6, 0]} />
      </Selector>
    </Canvas>
  )
}
