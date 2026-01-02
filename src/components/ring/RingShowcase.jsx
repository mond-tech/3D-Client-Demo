import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  useGLTF,
  Center,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  MeshRefractionMaterial,
  useEnvironment,
  Environment
} from '@react-three/drei'
import { EffectComposer, Bloom, N8AO, ToneMapping } from '@react-three/postprocessing'
import { useControls, Leva } from 'leva'
import './styles.css'

/* ---------------- RING ---------------- */

function Ring({ frame, diamonds, env, ...props }) {
  const { nodes, materials } = useGLTF('/3-stone-transformed.glb')

  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial
          color={frame}
          roughness={0.15}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh castShadow geometry={nodes.mesh_9.geometry} material={materials.WhiteMetal} />

      <instancedMesh
        castShadow
        args={[nodes.mesh_4.geometry, null, 65]}
        instanceMatrix={nodes.mesh_4.instanceMatrix}
      >
        <MeshRefractionMaterial
          color={diamonds}
          side={THREE.DoubleSide}
          envMap={env}
          aberrationStrength={0.02}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}

useGLTF.preload('/3-stone-transformed.glb')

/* ---------------- CANVAS CONTENT (HOOKS LIVE HERE) ---------------- */

function Scene() {
  const { shadow, frame, diamonds } = {
    shadow: '#000000',
    frame: '#fff0f0',
    diamonds: '#ffffff'
  }

  const env = useEnvironment({
    files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr'
  })

  return (
    <>
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />

      <group position={[0, -0.25, 0]}>
        <Center top position={[0, -0.12, 0]} rotation={[-0.1, 0, 0.085]}>
          <Ring frame={frame} diamonds={diamonds} env={env} scale={0.1} />
        </Center>

        <AccumulativeShadows temporal frames={100} color={shadow} opacity={1.05}>
          <RandomizedLight radius={5} position={[10, 5, -5]} />
        </AccumulativeShadows>
      </group>

      <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2.25} />

      <EffectComposer>
        <N8AO aoRadius={0.15} intensity={4} distanceFalloff={2} />
        <Bloom luminanceThreshold={3.5} intensity={0.85} levels={9} mipmapBlur />
        <ToneMapping />
      </EffectComposer>

      <Environment map={env} background blur={1} />
    </>
  )
}

/* ---------------- EXPORTED COMPONENT ---------------- */

export default function RingShowcase() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#f1efdd'
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [-5, 5, 14], fov: 20 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 5,
          pointerEvents: 'auto'
        }}
      >
        
      </div>
    </section>
  )
}
