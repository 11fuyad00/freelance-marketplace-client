import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Advanced particle system for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%, ${
          Math.random() * 0.3 + 0.1
        })`;
        this.oscillation = Math.random() * Math.PI * 2;
      }

      update() {
        this.oscillation += 0.02;
        this.x += this.speedX + Math.cos(this.oscillation) * 0.5;
        this.y += this.speedY + Math.sin(this.oscillation) * 0.5;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `hsla(200, 70%, 60%, ${
              0.1 * (1 - distance / 120)
            })`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      particles = [];
    };
  }, []);

  const features = [
    {
      icon: '🔒',
      title: 'Verified Freelancers',
      desc: 'All freelancers are thoroughly verified with background checks and skill assessments',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      delay: 0.1,
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      desc: 'Escrow protection ensures your money is safe until project completion',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      delay: 0.2,
    },
    {
      icon: '⚡',
      title: 'Quick Hiring',
      desc: 'Find and hire the perfect freelancer in less than 24 hours',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'rgba(168, 85, 247, 0.1)',
      delay: 0.3,
    },
    {
      icon: '🎯',
      title: 'Quality Work',
      desc: 'Guaranteed high-quality deliverables with our satisfaction policy',
      color: 'from-orange-500 to-red-500',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      delay: 0.4,
    },
    {
      icon: '🛡️',
      title: '24/7 Support',
      desc: 'Round-the-clock customer support to help you anytime',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      delay: 0.5,
    },
    {
      icon: '💫',
      title: 'Easy Collaboration',
      desc: 'Built-in tools for seamless communication and project management',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateY: -15,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden"
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      {/* Advanced Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-2xl">
              <div className="bg-slate-900 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Why Choose Us
                </h2>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the difference with our premium freelance platform
            designed for{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              exceptional success
            </span>
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -20,
                scale: 1.02,
                rotateY: 5,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
              custom={feature.delay}
              className="group relative"
            >
              {/* Main Card */}
              <div
                className="relative rounded-3xl p-8 backdrop-blur-xl border border-white/10 bg-white/5 h-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${feature.bgColor}, transparent 70%)`,
                }}
              >
                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100`}
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl text-white mb-6 shadow-2xl relative overflow-hidden`}
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  <span className="relative z-10">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <motion.h3
                  variants={titleVariants}
                  className="text-2xl font-bold text-white mb-4"
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-gray-300 leading-relaxed text-lg"
                >
                  {feature.desc}
                </motion.p>

                {/* Hover Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                />
              </div>

              {/* Floating Particles around card */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100`}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.7 + index * 0.3,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '10%',
                  }}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl text-lg cursor-pointer backdrop-blur-sm border border-white/20"
          >
            Start Your Journey Today
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #ffffff 1px, transparent 1px),
            linear-gradient(180deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </section>
  );
};

export default WhyChooseUs;
