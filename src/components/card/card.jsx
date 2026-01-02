import ThreeDCardDemo from './Card3D'
import ProductText from '../ProductText'

export default function ThreeDCard() {
  return (
    <section style={styles.section}>
      {/* Card - Left */}
      <div style={styles.left}>
        <ThreeDCardDemo />
      </div>

      {/* Text - Right */}
      <div style={styles.right}>
        <ProductText />
      </div>
    </section>
  )
}

const styles = {
  section: {
    display: 'flex',
    width: '100%',
    height: '40vh', // section height = 40% of viewport
    alignItems: 'center',
  },

  left: {
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    width: '6%',
    height: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '2rem',
  },
}
