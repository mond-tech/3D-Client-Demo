import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__inner layout-grid">
        <div className="site-footer__brand-block">
          <div className="site-footer__brand">MondTech</div>
          <p className="site-footer__tagline">
            Custom 3D apparel experiences—from inspiration to checkout.
          </p>
          <a className="site-footer__cta" href="#customize">
            Start customizing
          </a>
        </div>

        <div className="site-footer__column">
          <div className="site-footer__heading">Explore</div>
          <div className="site-footer__links">
            <a href="#home">Home</a>
            <a href="#gallery">Gallery</a>
            <a href="#customize">Customizer</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="site-footer__column">
          <div className="site-footer__heading">Resources</div>
          <div className="site-footer__links">
            <a href="#">Style guide</a>
            <a href="#">FAQs</a>
            <a href="#">Shipping</a>
            <a href="#">Support</a>
          </div>
        </div>

        <div className="site-footer__column">
          <div className="site-footer__heading">Stay in touch</div>
          <p className="site-footer__meta">
            hello@acme3d.com<br />
            +1 (555) 123-4567
          </p>
          <div className="site-footer__links site-footer__links--row">
            <a href="#">Instagram</a>
            <a href="#">Dribbble</a>
            <a href="#">Behance</a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} MondTech. All rights reserved.</span>
        <div className="site-footer__bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </div>
    </footer>
  )
}

