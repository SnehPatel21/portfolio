'use client';

import { useEffect, useRef } from 'react';

const FloatingShapesBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const shapesRef = useRef([]);
  const activeParticlesRef = useRef([]);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvasRef.current = canvas;
    
    const updateCanvasSize = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '-1';
      canvas.style.pointerEvents = 'auto';

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Reset shapes positions when canvas is resized
      shapesRef.current.forEach(shape => shape.reset());
    };

    containerRef.current.appendChild(canvas);

    class Shape {
      constructor(type) {
        this.type = type;
        this.reset();
        this.layer = Math.random() * 0.5 + 0.25; // Parallax intensity
      }

      reset() {
        const rect = canvas.getBoundingClientRect();
        this.size = this.type === 'star' ? Math.random() * 15 + 10 : Math.random() * 40 + 30;
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.initialY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.3 + 0.2;
        this.thickness = this.type === 'ring' ? this.size * 0.3 : 0;
      }

      drawRing(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 213, 128, ${this.opacity})`;
        ctx.lineWidth = this.thickness;
        ctx.stroke();

        const gradient = ctx.createRadialGradient(0, 0, this.size - this.thickness/2, 
                                                0, 0, this.size + this.thickness/2);
        gradient.addColorStop(0, `rgba(255, 213, 128, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 213, 128, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness * 1.5;
        ctx.stroke();
      }

      drawStar(ctx) {
        ctx.beginPath();
        const spikes = 4;
        const innerRadius = this.size * 0.4;

        for(let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? this.size : innerRadius;
          const angle = (Math.PI / spikes) * i + this.rotation;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if(i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 213, 128, ${this.opacity})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, `rgba(255, 213, 128, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 213, 128, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 213, 128, ${this.opacity * 0.7})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, `rgba(255, 213, 128, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 213, 128, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        switch(this.type) {
          case 'ring':
            this.drawRing(ctx);
            break;
          case 'star':
            this.drawStar(ctx);
            break;
          case 'circle':
            this.drawCircle(ctx);
            break;
        }
        
        ctx.restore();
      }

      update(scrollDelta) {
        const rect = canvas.getBoundingClientRect();
        
        // Parallax effect
        this.y = this.initialY - (window.scrollY * this.layer);
        
        // Regular movement
        this.x += this.vx;
        this.rotation += this.rotationSpeed;

        // Screen wrapping
        if (this.x < -this.size) this.x = rect.width + this.size;
        if (this.x > rect.width + this.size) this.x = -this.size;
        
        // Vertical wrapping based on viewport
        const totalHeight = window.innerHeight;
        if (this.y < -this.size) {
          this.y = totalHeight + this.size;
          this.initialY = this.y + (window.scrollY * this.layer);
        }
        if (this.y > totalHeight + this.size) {
          this.y = -this.size;
          this.initialY = this.y + (window.scrollY * this.layer);
        }
      }

      isClicked(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.size;
      }
    }

    // Initialize shapes
    shapesRef.current = [
      ...Array(5).fill().map(() => new Shape('ring')),
      ...Array(8).fill().map(() => new Shape('star')),
      ...Array(6).fill().map(() => new Shape('circle'))
    ];

    const createPopEffect = (x, y, size) => {
      const particles = [];
      const particleCount = 8;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = 2 + Math.random() * 2;
        
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: size * 0.2,
          alpha: 1
        });
      }
      
      return particles;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * window.devicePixelRatio;
      const y = (e.clientY - rect.top) * window.devicePixelRatio;

      shapesRef.current.forEach((shape, index) => {
        if (shape.isClicked(x, y)) {
          const newParticles = createPopEffect(shape.x, shape.y, shape.size);
          activeParticlesRef.current.push(...newParticles);
          shape.reset();
        }
      });
    };

    const animate = () => {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      const rect = canvasRef.current.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      shapesRef.current.forEach(shape => {
        shape.update(scrollDelta);
        shape.draw(ctx);
      });

      activeParticlesRef.current = activeParticlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha *= 0.95;

        if (particle.alpha > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 213, 128, ${particle.alpha})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('scroll', () => {
      shapesRef.current.forEach(shape => shape.update(0));
    });

    updateCanvasSize();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('click', handleClick);
      canvas.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -2 }}
    />
  );
};

export default FloatingShapesBackground;