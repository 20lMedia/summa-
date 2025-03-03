import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import * as THREE from 'three'
import AOS from 'aos'
import 'aos/dist/aos.css'

const GrowthGraph = () => {
  const [graphData] = useState({
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    customers: [150, 300, 450, 750, 1200, 2000]
  })

  const graphRef = useRef()
  const barsRef = useRef([])
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Optimize geometry for mobile
  const barGeometry = useMemo(() => {
    // Use lower polygon count for mobile
    const segmentCount = isMobile ? 1 : 2
    return new THREE.BoxGeometry(0.5, 1, 0.2, segmentCount, segmentCount, segmentCount)
  }, [isMobile])
  
  const barMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#9933ff',
    metalness: 0.5,
    roughness: 0.2,
    transparent: true,
    opacity: 0.8
  }), [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        // Reduce animation complexity on mobile
        const scrollInfluence = isMobile ? Math.min(scrollY * 0.0002, 0.1) : Math.min(scrollY * 0.0005, 0.3)
        bar.scale.y = Math.max(
          0.1,
          (graphData.customers[i] / Math.max(...graphData.customers)) *
          (isMobile ? 1 : (1 + Math.sin(time * 0.5 + i * 0.2) * 0.1)) *
          (1 + scrollInfluence)
        )
        bar.position.y = bar.scale.y / 2
        
        // Reduce rotation effects on mobile
        if (!isMobile) {
          bar.rotation.z = Math.sin(time * 0.3 + i * 0.1) * 0.05 * scrollInfluence
        }
      }
    })

    if (graphRef.current) {
      // Simplified rotation for mobile
      if (isMobile) {
        graphRef.current.rotation.y = Math.sin(time * 0.1) * 0.05 + (scrollY * 0.00005)
      } else {
        graphRef.current.rotation.y = Math.sin(time * 0.2) * 0.1 + (scrollY * 0.0001)
        graphRef.current.rotation.x = Math.cos(time * 0.3) * 0.05 * Math.min(scrollY * 0.0002, 0.1)
      }
    }
  })

  return (
    <group ref={graphRef}>
      {graphData.customers.map((value, i) => {
        const x = (i - (graphData.customers.length - 1) / 2) * (isMobile ? 0.9 : 1.2)
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh
              ref={(el) => (barsRef.current[i] = el)}
              geometry={barGeometry}
              material={barMaterial}
              position={[0, value / 2000, 0]}
              scale={[1, value / 1000, 1]}
            >
              <meshStandardMaterial
                color="#9933ff"
                emissive="#4d0099"
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
              />
            </mesh>
            <Html position={[0, -0.5, 0]} center>
              <div style={{ color: '#e6ccff', fontSize: isMobile ? '10px' : '12px' }}>
                {graphData.months[i]}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
      offset: 120,
      delay: 100,
      anchorPlacement: 'top-bottom'
    })
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  
  // Create scroll-based transformations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1.05])
  const graphScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1.1])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="portfolio-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(45deg, #1a0033, #4d0099, #000000)',
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements with scroll parallax */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: isMobile ? '100px' : '200px',
          height: isMobile ? '100px' : '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 51, 255, 0.1) 0%, transparent 70%)',
          transform: `translateY(${scrollY * 0.2}px)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: isMobile ? '150px' : '300px',
          height: isMobile ? '150px' : '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 51, 255, 0.1) 0%, transparent 70%)',
          transform: `translateY(${-scrollY * 0.15}px)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      
      <motion.div
        className="portfolio-content"
        data-aos="fade-up"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)`
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: '#ffffff',
            fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.5rem)' : 'clamp(2rem, 5vw, 3rem)',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            textShadow: '0 0 20px rgba(153, 51, 255, 0.5)',
            opacity: titleOpacity,
            scale: titleScale,
          }}
          transition={{
            duration: 1.2,
            type: 'spring',
            stiffness: 100,
            damping: 15
          }}
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          Our Growth Story
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            color: '#e6ccff',
            fontSize: isMobile ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '800px',
            margin: '0 auto 4rem auto',
            lineHeight: 1.6,
            padding: isMobile ? '0 1rem' : 0
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Watch our customer base expand as we continue to deliver exceptional digital solutions
        </motion.p>

        <motion.div 
          className="canvas-container"
          style={{ 
            height: isMobile ? '40vh' : '60vh', 
            width: '100%', 
            position: 'relative',
            scale: graphScale,
          }}
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <Canvas 
            camera={{ position: [0, 2, isMobile ? 6 : 5], fov: isMobile ? 70 : 60 }}
            // Reduce performance impact on mobile
            frameloop={isMobile ? "demand" : "always"}
            dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <GrowthGraph />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
              // Reduce rotation speed on mobile
              rotateSpeed={isMobile ? 0.5 : 1}
              // Disable autoRotate on mobile to save performance
              autoRotate={!isMobile}
            />
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '4rem'
          }}
        >
          {[
            { title: '2000+', subtitle: 'Active Customers' },
            { title: '85%', subtitle: 'Growth Rate' },
            { title: '95%', subtitle: 'Customer Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '2rem',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: isMobile ? '2rem' : '5rem',
              }}
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
              data-aos-anchor-placement="center-bottom"
            >
              <h3
                style={{
                  color: '#ffffff',
                  fontSize: isMobile ? 'clamp(1.3rem, 4vw, 2rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
                  marginBottom: '0.5rem'
                }}
                data-aos="zoom-in"
                data-aos-delay={300 + index * 150}
                data-aos-anchor-placement="center-bottom"
              >
                {stat.title}
              </h3>
              <p 
                style={{ color: '#e6ccff' }}
                data-aos="fade-up"
                data-aos-delay={400 + index * 150}
                data-aos-anchor-placement="center-bottom"
              >
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Portfolio