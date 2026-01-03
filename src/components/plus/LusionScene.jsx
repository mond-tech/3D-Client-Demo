import * as THREE from "three"
import { useMemo, useReducer, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  Center
} from "@react-three/drei"
import { CuboidCollider, BallCollider, Physics, RigidBody } from "@react-three/rapier"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { easing } from "maath"

const accents = ["#4060ff", "#20ffa0", "#ff4060", "#ffcc00"]
const shuffle = (accent = 0) => [
  { color: "#444", roughness: 0.1 },
  { color: "#444", roughness: 0.75 },
  { color: "#444", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: "white", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: "#444", roughness: 0.5 },
  { color: "white", roughness: 0.5 },
  { color: "#444", roughness: 0.2 },
  { color: "white", roughness: 0.3 },
  { color: accents[accent], roughness: 0.5, accent: true },
  { color: "#666", roughness: 0.4 },
  { color: "white", roughness: 0.6 },
  { color: accents[accent], roughness: 0.3, accent: true },
  { color: "#555", roughness: 0.8 }
]

export function LusionScene() {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])

  return (
    <>
      <color attach="background" args={["#141622"]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
        <Connector position={[10, 6, 3]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
        <Connector position={[-10, 6, 3]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
        <Connector position={[10, -6, 3]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
        <Connector position={[-10, -6, 3]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
        <Connector position={[0, 7, 2]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
        <Connector position={[0, -7, 2]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
      </Physics>

      <EffectComposer disableNormalPass multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </>
  )
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef()
  const [hovered, setHovered] = useState(false)
  const pos = useMemo(() => position || [r(28), r(16), r(10)], [])
  
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta)
    // Remove centering force - let objects stay distributed
    
    // Add hover effects
    if (hovered && api.current) {
      // Apply impulse to move the object away from center when hovered
      const impulseStrength = 0.3
      api.current.applyImpulse({
        x: Math.sin(state.clock.elapsedTime * 3) * impulseStrength,
        y: Math.cos(state.clock.elapsedTime * 3) * impulseStrength,
        z: Math.sin(state.clock.elapsedTime * 2) * impulseStrength
      })
      
      // Add torque for rotation
      api.current.applyTorqueImpulse({
        x: Math.sin(state.clock.elapsedTime * 2) * 0.05,
        y: Math.cos(state.clock.elapsedTime * 2) * 0.05,
        z: Math.sin(state.clock.elapsedTime * 1.5) * 0.05
      })
    }
  })
  
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {children ? children : <Model {...props} hovered={hovered} />}
      </group>
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function Model({ children, color = "white", roughness = 0, hovered = false, ...props }) {
  const ref = useRef()
  const meshRef = useRef()
  const { nodes, materials } = useGLTF("/c-transformed.glb")
  
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta)
    
    // Add rotation animation when hovered
    if (hovered && meshRef.current) {
      meshRef.current.rotation.x += delta * 2
      meshRef.current.rotation.y += delta * 3
      meshRef.current.rotation.z += delta * 1.5
    }
  })
  
  return (
    <group ref={meshRef}>
      <mesh 
        ref={ref} 
        castShadow 
        receiveShadow 
        scale={hovered ? 22 : 20} 
        geometry={nodes.connector.geometry}
      >
        <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
        {children}
      </mesh>
    </group>
  )
}
