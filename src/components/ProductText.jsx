import { useNavigate } from 'react-router-dom'

export default function ProductText() {
  const navigate = useNavigate()

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Three Stone Ring</h1>

      <p style={styles.description}>
        A refined three-stone ring crafted with precision and brilliance.
        Designed to capture light from every angle, symbolizing past,
        present, and future.
      </p>

      <button
        style={styles.button}
        onClick={() => navigate('/product')}
      >
        VIEW PRODUCT
      </button>
    </div>
  )
}

const styles = {
  wrapper: {
    maxWidth: 420
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#000'
  },
  description: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '2rem',
    color: '#000'
  },
  button: {
    background: '#000',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    cursor: 'pointer'
  }
}
