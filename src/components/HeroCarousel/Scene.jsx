import './materials'
import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls } from '@react-three/drei'
import Rig from './Rig'
import Carousel from './Carousel'
import Banner from './Banner'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 15 }}
      className="hero-canvas"
    >
      <color attach="background" args={['#f1efdd']} />
      <fog attach="fog" args={['#a79', 8.5, 12]} />

      <ScrollControls
        pages={4}
        infinite
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <Rig>
          <Carousel />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
      </ScrollControls>

      <Environment preset="dawn" blur={0.5} />
    </Canvas>
  )
}
