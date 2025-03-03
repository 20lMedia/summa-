import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    title: 'Digital Marketing',
    description: 'Strategic social media management and targeted advertising campaigns',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    description: 'Custom website development with modern technologies and responsive design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'Content Creation',
    description: 'Engaging content that tells your brand story and connects with your audience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Brand Strategy',
    description: 'Comprehensive brand development and positioning strategies',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const SkeletonCard = () => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }}
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '2rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}
  >
    <div
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, rgba(153, 51, 255, 0.2), rgba(77, 0, 153, 0.2))',
      }}
    />
    <div
      style={{
        width: '60%',
        height: '24px',
        borderRadius: '12px',
        background: 'linear-gradient(45deg, rgba(153, 51, 255, 0.2), rgba(77, 0, 153, 0.2))',
      }}
    />
    <div
      style={{
        width: '80%',
        height: '60px',
        borderRadius: '12px',
        background: 'linear-gradient(45deg, rgba(153, 51, 255, 0.2), rgba(77, 0, 153, 0.2))',
      }}
    />
  </motion.div>
);

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      offset: 150,
      delay: 100,
      anchorPlacement: 'top-bottom'
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)'
          entry.target.style.opacity = '1'
        } else {
          entry.target.style.transform = 'translateY(50px)'
          entry.target.style.opacity = '0'
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    const section = document.getElementById('services');
    if (section) {
      section.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(section);
    }

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Simulate loading delay - shorter on mobile for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 1000 : 2000);

    return () => {
      if (section) observer.unobserve(section);
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div
      id="services"
      className="services-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(45deg, #1a0033, #4d0099, #000000)',
        padding: isMobile ? '4rem 1rem' : '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        style={{
          textAlign: 'center',
          marginBottom: isMobile ? '3rem' : '4rem',
        }}
      >
        <h2
          style={{
            color: '#ffffff',
            fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.5rem)' : 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '1rem',
          }}
        >
          Our Services
        </h2>
        <p
          style={{
            color: '#e6ccff',
            fontSize: isMobile ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '600px',
            margin: '0 auto',
            padding: isMobile ? '0 1rem' : '0',
          }}
        >
          Elevate your digital presence with our comprehensive suite of services
        </p>
      </motion.div>

      <div
        className="services-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {isLoading ? (
          // Render fewer skeleton cards on mobile
          [...Array(isMobile ? 2 : 4)].map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : (
          // Render actual service cards
          services.map((service, index) => (
            <motion.div
              key={service.title}
              data-aos="fade-up"
              data-aos-delay={index * (isMobile ? 50 : 100)}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * (isMobile ? 0.1 : 0.2),
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: isMobile ? 1.02 : 1.05, 
                y: isMobile ? -3 : -5,
                boxShadow: '0 20px 30px rgba(153, 51, 255, 0.2)',
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                padding: isMobile ? '1.5rem' : '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
              }}
            >
              <motion.div
                style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  marginBottom: '1rem',
                  color: '#9933ff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: isMobile ? '70px' : '80px',
                  width: isMobile ? '70px' : '80px',
                  margin: '0 auto 1rem auto',
                  position: 'relative',
                }}
                whileHover={{
                  filter: 'drop-shadow(0 0 8px rgba(153, 51, 255, 0.6))',
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                    ease: 'easeInOut'
                  }
                }}
              >
                {service.icon}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(153, 51, 255, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
              <h3
                style={{
                  color: '#ffffff',
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  marginBottom: '0.8rem',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  color: '#e6ccff',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: '1.6',
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Services;