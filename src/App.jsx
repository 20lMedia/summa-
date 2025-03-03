import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'
import './App.css'
import './responsive.css'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Footer />
    </div>
  )
}

export default App
