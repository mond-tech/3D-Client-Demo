import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './FloatingNavbar.css'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Customize', to: '/customize' },
  { name: 'Contact', to: '/contact' }
]

export default function FloatingNavbar() {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      const scrollingDown = current > lastScrollY.current
      const shouldHide = scrollingDown && current > 24
      setHidden(shouldHide)
      lastScrollY.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`floating-nav ${hidden ? 'floating-nav--hidden' : ''}`}>
      <div className="floating-nav__inner">
        <div className="floating-nav__brand">MondTech</div>
        <nav className="floating-nav__links">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `floating-nav__link ${isActive ? 'floating-nav__link--active' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <NavLink className="floating-nav__cta" to="/customize">
          Login
        </NavLink>
      </div>
    </div>
  )
}

