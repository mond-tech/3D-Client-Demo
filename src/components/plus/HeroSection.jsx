import { Canvas } from '@react-three/fiber'
import { LusionScene } from './LusionScene'
import { Link } from 'react-router-dom'
import "./styles.css"

export function HeroSection() {
  return (
    <div style={{ height: '70vh', position: 'relative' }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 25], fov: 50, near: 1, far: 50 }}
      >
        <LusionScene />
      </Canvas>
      
      <div className="plus-overlay">
         <div className="plus-overlay-content">
          <h2 className="plus-overlay-title">Explore Our Gallery</h2>
          <p className="plus-overlay-description">Discover amazing 3D designs and creative products</p>
          <Link to="/gallery" className="plus-overlay-button">
            View Gallery
          </Link>
        </div>
      </div> 
    </div>
  )
}
