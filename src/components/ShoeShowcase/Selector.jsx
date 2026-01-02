import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { easing } from 'maath'
import { store, useStore } from './store'

export default function Selector({ children }) {
  const ref = useRef()
  const state = useStore()

  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3])

    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
      state.open ? 0 : 0.1,
      delta
    )

    easing.damp3(
      ref.current.scale,
      state.open ? 4 : 0.01,
      state.open ? 0.5 : 0.2,
      delta
    )

    easing.dampC(
      ref.current.material.color,
      state.open ? '#f0f0f0' : '#ccc',
      0.1,
      delta
    )
  })

  return (
    <>
      <mesh ref={ref} raycast={() => null}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          anisotropicBlur={0.1}
          thickness={0.1}
          roughness={0.4}
          toneMapped
        />
      </mesh>

      <group>
        {children}
      </group>
    </>
  )
}
