import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { store } from './store'

export default function Shoe(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/nike_air_zoom_pegasus_36-transformed.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8)
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7
  })
  return (
    <group 
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation()
        store.open = true
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        store.open = false
      }}
    >
      <mesh 
        receiveShadow 
        castShadow 
        geometry={nodes.defaultMaterial.geometry} 
        material={materials.NikeShoe} 
        {...props} 
      />
    </group>
  )
}