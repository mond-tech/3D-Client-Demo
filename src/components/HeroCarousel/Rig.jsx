import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import { easing } from "maath"

export default function Rig({ children, ...props }) {
  const ref = useRef()
  const scroll = useScroll()

  useFrame((state, delta) => {
    // Auto-rotate continuously based on time
    ref.current.rotation.y += delta * 0.2 // Adjust speed (0.2 = moderate speed)
    
    state.events.update()
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })

  return <group ref={ref} {...props}>{children}</group>
}
