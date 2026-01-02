import React from 'react'
import Home from './homepage'
import TshirtCustomize from './components/tshirtCustomize/TshirtCustomize'
import HeroCarousel from './components/HeroCarousel'
import Products from './components/products'
import FloatingNavbar from './components/FloatingNavbar'
import Footer from './components/Footer'
import { Routes, Route, Outlet } from 'react-router-dom'
import ShoeShowcase from './components/ShoeShowcase'
import ProductCard from './components/ring/card'
import ThreeDCard from './components/card/card'
import { HeroSection } from './components/plus/HeroSection'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <>
                <HeroCarousel />
                <TshirtCustomize />
                <ShoeShowcase />
                <ProductCard />
                {/* <ThreeDCard /> */}
                <HeroSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/gallery"
            element={
              <section id="gallery">
                <Products />
              </section>
            }
          />
          <Route
            path="/customize"
            element={
              <section id="customize" className="page-blank">
                <div className="page-blank__inner">
                  <h1>Customize</h1>
                  <p>Coming soon.</p>
                </div>
              </section>
            }
          />
          <Route
            path="/contact"
            element={
              <section id="contact" className="page-blank">
                <div className="page-blank__inner">
                  <h1>Contact</h1>
                  <p>Content coming soon.</p>
                </div>
              </section>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

function Layout() {
  return (
    <>
      <FloatingNavbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default App