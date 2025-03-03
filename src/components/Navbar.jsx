import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(26, 0, 51, 0)', 'rgba(26, 0, 51, 0.95)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  const menuItemVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const mobileMenuVariants = {
    closed: { x: '100%' },
    open: { 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      style={{
        backgroundColor,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
        transition: 'backdrop-filter 0.3s, box-shadow 0.3s'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#ffffff',
            cursor: 'pointer',
            background: 'linear-gradient(45deg, #9933ff, #4d0099)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(153, 51, 255, 0.5)'
          }}
        >
          20L Media
        </motion.div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ 
          display: 'flex', 
          gap: '2rem', 
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          <motion.div
            style={{ display: 'flex', gap: '2rem' }}
          >
            {['Home', 'Services', 'Portfolio', 'About'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                variants={menuItemVariants}
                whileHover="hover"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: isScrolled ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  backdropFilter: isScrolled ? 'blur(5px)' : 'none',
                  transition: 'background 0.3s, backdrop-filter 0.3s'
                }}
              >
                {item}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: '0%',
                    height: '2px',
                    background: 'linear-gradient(45deg, #9933ff, #4d0099)',
                    translateX: '-50%'
                  }}
                  whileHover={{
                    width: '80%',
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(153, 51, 255, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #9933ff, #4d0099)',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 10px rgba(153, 51, 255, 0.3)',
              transition: 'box-shadow 0.3s'
            }}
          >
            Contact Us
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.div 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '30px',
            height: '20px',
            cursor: 'pointer',
            zIndex: 1001,
            '@media (max-width: 768px)': {
              display: 'flex'
            }
          }}
        >
          <motion.div 
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
            style={{
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '5px',
              transformOrigin: 'left center'
            }}
          />
          <motion.div 
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            style={{
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '5px'
            }}
          />
          <motion.div 
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
            style={{
              width: '100%',
              height: '2px',
              background: '#ffffff',
              borderRadius: '5px',
              transformOrigin: 'left center'
            }}
          />
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
          variants={mobileMenuVariants}
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'linear-gradient(45deg, #1a0033, #4d0099, #000000)',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            padding: '2rem'
          }}
        >
          {['Home', 'Services', 'Portfolio', 'About'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              variants={mobileMenuItemVariants}
              onClick={handleLinkClick}
              whileTap={{ scale: 0.95 }}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1.5rem',
                margin: '1rem 0',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            variants={mobileMenuItemVariants}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #9933ff, #4d0099)',
              border: 'none',
              padding: '0.8rem 2rem',
              borderRadius: '25px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              marginTop: '2rem',
              boxShadow: '0 0 10px rgba(153, 51, 255, 0.3)'
            }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;