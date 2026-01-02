import RingShowcase from './app'
import ProductText from '../ProductText'

export default function ProductCard() {
  return (
    <section style={styles.section}>
      {/* LEFT: TEXT */}
      <div style={styles.left}>
        <ProductText />
      </div>

      {/* RIGHT: RING */}
      <div style={styles.right}>
        <RingShowcase />
      </div>
    </section>
  )
}

const styles = {
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    background: '#f1efdd',
    color: '#000',
    margin: 0,
    padding: 0
  },
  left: {
    paddingLeft: '8vw'
  },
  right: {
    height: '100%',
    position: 'relative'
  }
}
