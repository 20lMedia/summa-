import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
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

  const socialLinks = [
    { name: 'Twitter', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ) },
    { name: 'Facebook', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ) },
    { name: 'Instagram', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ) },
    { name: 'LinkedIn', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ) },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        background: 'linear-gradient(45deg, #1a0033, #4d0099, #000000)',
        padding: isMobile ? '3rem 1.5rem 1.5rem' : '4rem 2rem 2rem',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '2rem' : '3rem',
        }}
      >
        <motion.div
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          <motion.h3
            whileHover={{ scale: 1.05 }}
            style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #9933ff, #4d0099)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(153, 51, 255, 0.5)'
            }}
          >
            20L Media
          </motion.h3>
          <p style={{ color: '#e6ccff', lineHeight: '1.6', maxWidth: '300px' }}>
            Transforming digital presence through innovative solutions and creative strategies.
          </p>
        </motion.div>

        <motion.div
          data-aos="fade-up"
          data-aos-delay="200"
          className="footer-links"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Links</h3>
          {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ x: 5, color: '#9933ff' }}
              style={{
                color: '#e6ccff',
                textDecoration: 'none',
                transition: 'color 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              {link}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          data-aos="fade-up"
          data-aos-delay="300"
          className="footer-contact"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e6ccff' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>(123) 456-7890</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e6ccff' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>info@20lmedia.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e6ccff' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>123 Digital Avenue, Tech City, CA 90210</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        data-aos="fade-up"
        className="social-links"
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'center',
          gap: '1.5rem',
          margin: '3rem 0 2rem',
        }}
      >
        {socialLinks.map((social) => (
          <motion.a
            key={social.name}
            href="#"
            whileHover={{ y: -5, color: '#9933ff' }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: '#e6ccff',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem',
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#e6ccff',
          fontSize: '0.9rem',
        }}
      >
        <p>© {new Date().getFullYear()} 20L Media. All rights reserved.</p>
      </motion.div>

      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: isMobile ? '100px' : '150px',
          height: isMobile ? '100px' : '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 51, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: isMobile ? '120px' : '200px',
          height: isMobile ? '120px' : '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(153, 51, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </motion.footer>
  )
}

export default Footer