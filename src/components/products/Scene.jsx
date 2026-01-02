import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import Model from "./Model"

export default function Scene() {
  const scroll = useRef(0)

  return (
    <Canvas
      className="hero-canvas"
      shadows
      camera={{ position: [0, 0, 10], fov: 30 }}
    >
      <color attach="background" args={['#black']} />
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model scroll={scroll} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
