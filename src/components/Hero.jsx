import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Instances, Instance } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef, useMemo } from 'react'
import * as THREE from 'three'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Fragments = () => {
  const [exploded, setExploded] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const fragmentsRef = useRef([])
  const curveRef = useRef()
  const dataPointsRef = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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

  const positions = useMemo(() => {
    const pos = []
    // Reduce number of fragments on mobile for better performance
    const numFragments = isMobile ? 50 : 100
    for(let i = 0; i < numFragments; i++) {
      const phi = Math.acos(-1 + (2 * i) / numFragments)
      const theta = Math.sqrt(numFragments * Math.PI) * phi
      const radius = 1 + Math.random() * 0.3
      pos.push([
        Math.cos(theta) * Math.sin(phi) * radius,
        Math.sin(theta) * Math.sin(phi) * radius,
        Math.cos(phi) * radius
      ])
    }
    return pos
  }, [isMobile])

  const dataPoints = useMemo(() => {
    const points = []
    // Reduce number of data points on mobile
    const numPoints = isMobile ? 8 : 12
    for(let i = 0; i < numPoints; i++) {
      points.push({
        x: (i / (numPoints - 1)) * 10 - 5,
        y: Math.sin(i * 0.5) * 2 + Math.random() * 0.5,
        z: Math.cos(i * 0.5) * 2
      })
    }
    return points
  }, [isMobile])

  useEffect(() => {
    const explosionTimer = setTimeout(() => setExploded(true), 2000)
    const statsTimer = setTimeout(() => setShowStats(true), 3500)
    return () => {
      clearTimeout(explosionTimer)
      clearTimeout(statsTimer)
    }
  }, [])

  useFrame(({ clock }) => {
    if (exploded && fragmentsRef.current) {
      const time = clock.getElapsedTime()
      fragmentsRef.current.forEach((fragment, i) => {
        if (fragment) {
          // Reduce animation complexity on mobile
          const uniqueSpeed = isMobile ? 0.1 * (1 + Math.sin(i * 0.3)) : 0.2 * (1 + Math.sin(i * 0.5 + time * 0.3))
          const pulseScale = isMobile ? 0.5 : 0.6 + Math.sin(time * 1.5 + i * 0.5) * 0.4
          const rotationSpeed = isMobile ? 0.03 : 0.05 * (1 + Math.sin(i * 0.2))
          
          const angle = time * (isMobile ? 0.2 : 0.3) + i * (Math.PI * 2 / positions.length)
          const radius = exploded ? (time * uniqueSpeed) % (isMobile ? 10 : 15) : 0
          
          fragment.position.x = positions[i][0] * radius * Math.cos(angle) * (1 + scrollY * (isMobile ? 0.0002 : 0.0005))
          fragment.position.y = positions[i][1] * radius * Math.sin(angle) * (1 - scrollY * (isMobile ? 0.0005 : 0.001))
          fragment.position.z = positions[i][2] * radius * (1 + scrollY * (isMobile ? 0.0004 : 0.0008))
          
          // Reduce rotation calculations on mobile
          if (!isMobile || i % 2 === 0) { // Only update every other fragment on mobile
            fragment.rotation.x += rotationSpeed * Math.sin(time * 0.3)
            fragment.rotation.y += rotationSpeed * Math.cos(time * 0.2)
          }
          
          fragment.scale.setScalar(
            exploded ? 
            Math.max(0.15, pulseScale - (fragment.position.length() * (isMobile ? 0.02 : 0.03))) : 
            2.0
          )
        }
      })
    }

    if (showStats) {
      const time = clock.getElapsedTime()
      // Reduce animation complexity for data points on mobile
      const updateFrequency = isMobile ? 2 : 1 // Update less frequently on mobile
      
      dataPointsRef.current.forEach((point, i) => {
        if (point && i % updateFrequency === 0) {
          point.position.y = dataPoints[i].y + Math.sin(time + i) * (isMobile ? 0.1 : 0.2)
          point.rotation.y += isMobile ? 0.01 : 0.02
        }
      })

      if (curveRef.current) {
        curveRef.current.rotation.y += isMobile ? 0.002 : 0.005
      }
    }
  })

  return (
    <>
      <Instances limit={isMobile ? 50 : 100}>
        <sphereGeometry args={[0.8, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
        <meshStandardMaterial
          color="#9933ff"
          wireframe
          transparent
          opacity={0.8}
          emissive="#4d0099"
          emissiveIntensity={1.2}
        />
        {positions.map((pos, i) => (
          <Instance
            key={i}
            ref={(el) => (fragmentsRef.current[i] = el)}
            position={exploded ? [pos[0] * 20, pos[1] * 20, pos[2] * 20] : [0, 0, 0]}
            scale={2.0}
          />
        ))}
      </Instances>

      {showStats && (
        <>
          <mesh ref={curveRef}>
            <tubeGeometry args={[new THREE.CatmullRomCurve3(
              dataPoints.map(p => new THREE.Vector3(p.x, p.y, p.z))
            ), isMobile ? 32 : 64, 0.1, isMobile ? 4 : 8, false]} />
            <meshStandardMaterial
              color="#9933ff"
              emissive="#4d0099"
              emissiveIntensity={1}
              transparent
              opacity={0.7}
            />
          </mesh>
          {dataPoints.map((point, i) => (
            <mesh
              key={i}
              ref={(el) => (dataPointsRef.current[i] = el)}
              position={[point.x, point.y, point.z]}
            >
              <sphereGeometry args={[0.15, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive="#9933ff"
                emissiveIntensity={2}
              />
            </mesh>
          ))}
        </>
      )}
    </>
  )
}

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2
      })
    }
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Initial check
    checkMobile()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <motion.div 
      className="hero-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        background: 'linear-gradient(45deg, #1a0033, #4d0099, #000000)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
      <motion.div 
        className="hero-content" 
        data-aos="fade-up" 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
          padding: '0 20px',
          transform: `translateY(${scrollY * (isMobile ? 0.1 : 0.2)}px)`
        }}>
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}
        >
          {"20L Media".split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{
                display: 'inline-block',
                textShadow: '0 0 20px rgba(153, 51, 255, 0.5)'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{ 
            color: '#e6ccff', 
            fontSize: 'clamp(1rem, 3vw, 1.5rem)', 
            maxWidth: '800px', 
            margin: '0 auto',
            textShadow: '0 0 10px rgba(230, 204, 255, 0.3)',
            padding: isMobile ? '0 1rem' : '0'
          }}
        >
          Transforming Digital Presence Through Innovation
        </motion.p>
      </motion.div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas 
          camera={{ position: [0, 0, 5] }}
          // Optimize Canvas for mobile
          frameloop={isMobile ? "demand" : "always"}
          dpr={isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio}
        >
          <motion.group
            animate={{
              scale: 1 + scrollY * (isMobile ? 0.0005 : 0.001),
              rotateY: scrollY * (isMobile ? 0.05 : 0.1) + mousePosition.x * (isMobile ? 1 : 2),
              rotateX: mousePosition.y * (isMobile ? 1 : 2)
            }}
            transition={{ type: 'spring', stiffness: isMobile ? 30 : 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Fragments />
          </motion.group>
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={isMobile ? 1.5 : 3} 
            // Reduce sensitivity on mobile
            rotateSpeed={isMobile ? 0.5 : 1}
          />
        </Canvas>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  )
}

export default Hero