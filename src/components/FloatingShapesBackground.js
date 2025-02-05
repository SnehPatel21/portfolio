'use client';

import { useEffect, useRef } from 'react';

const FloatingShapesBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const shapesRef = useRef([]);
  const activeParticlesRef = useRef([]);
  const lastScrollYRef = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });

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

      shapesRef.current.forEach(shape => shape.reset());
    };

    containerRef.current.appendChild(canvas);

    class Shape {
      constructor(type) {
        this.type = type;
        this.reset();
        this.layer = Math.random() * 0.5 + 0.25;
        this.mouseDistance = 0;
        this.originalX = 0;
        this.originalY = 0;
      }

      reset() {
        const rect = canvas.getBoundingClientRect();
        this.size = this.type === 'star' ? Math.random() * 15 + 10 : Math.random() * 40 + 30;
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.initialY = this.y;
        
        // Reduced base velocities for smoother movement
        this.vx = (Math.random() - 0.5) * 0.8;  // Reduced from 2.0
        this.vy = (Math.random() - 0.5) * 0.8;  // Reduced from 2.0
        
        // Subtle upward drift
        this.vy -= 0.2;  // Reduced upward tendency
        
        // Parameters for fluid motion
        this.seed = Math.random() * 1000;  // Random starting point for sine waves
        this.uniqueOffset = Math.random() * Math.PI * 2;  // Unique offset for each shape
        this.floatAmplitude = Math.random() * 0.5 + 0.2;  // How much it floats
        this.floatSpeed = Math.random() * 0.001 + 0.001;  // Speed of floating motion
        
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01; // Slower rotation
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
        const outerRadius = this.size;
        const innerRadius = this.size * 0.4;
        const smoothing = 0.15;

        for(let i = 0; i < spikes * 2; i++) {
          const isOuter = i % 2 === 0;
          const radius = isOuter ? outerRadius : innerRadius;
          const nextRadius = isOuter ? innerRadius : outerRadius;
          
          const angle = (Math.PI / spikes) * i + this.rotation;
          const nextAngle = (Math.PI / spikes) * (i + 1) + this.rotation;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          const nextX = Math.cos(nextAngle) * nextRadius;
          const nextY = Math.sin(nextAngle) * nextRadius;
          
          if(i === 0) {
            ctx.moveTo(x, y);
          }

          const cpX = (x + nextX) * (1 + smoothing) / 2;
          const cpY = (y + nextY) * (1 + smoothing) / 2;
          
          ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
        }
        
        ctx.closePath();

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, `rgba(255, 213, 128, ${this.opacity})`);
        gradient.addColorStop(0.7, `rgba(255, 213, 128, ${this.opacity * 0.7})`);
        gradient.addColorStop(1, `rgba(255, 213, 128, 0)`);
        
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

      updateMouseInteraction(mouseX, mouseY) {
        const dx = this.originalX - mouseX;
        const dy = this.originalY - mouseY;
        this.mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 200;
        
        if (this.mouseDistance < interactionRadius) {
          const strength = (1 - this.mouseDistance / interactionRadius) * 30;
          const angle = Math.atan2(dy, dx);
          const repulsionX = Math.cos(angle) * strength;
          const repulsionY = Math.sin(angle) * strength;
          
          this.x += repulsionX * 0.1;
          this.y += repulsionY * 0.1;
        } else {
          this.x += (this.originalX - this.x) * 0.05;
          this.y += (this.originalY - this.y) * 0.05;
        }
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

      update(scrollDelta, mouseX, mouseY) {
        const rect = canvas.getBoundingClientRect();
        const time = Date.now();
        
        // Fluid motion using multiple sine waves
        const floatX = Math.sin(time * this.floatSpeed + this.uniqueOffset) * this.floatAmplitude;
        const floatY = Math.cos(time * this.floatSpeed + this.uniqueOffset) * this.floatAmplitude;
        
        // Apply base movement with fluid motion
        this.x += this.vx + floatX;
        this.y += this.vy + floatY;
        
        this.rotation += this.rotationSpeed;
      
        // Gentler mouse interaction
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        this.mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        const interactionRadius = 100; // Reduced radius
        
        if (this.mouseDistance < interactionRadius) {
          const strength = (1 - this.mouseDistance / interactionRadius) * 2; // Very gentle repulsion
          const angle = Math.atan2(dy, dx);
          
          // Extremely subtle repulsion
          this.vx += Math.cos(angle) * strength * 0.01;
          this.vy += Math.sin(angle) * strength * 0.01;
        }
      
        // Very gentle damping
        this.vx *= 0.995;
        this.vy *= 0.995;
      
        // Maintain subtle minimum movement
        const minSpeed = 0.2;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed < minSpeed) {
          const angle = Math.random() * Math.PI * 2;
          this.vx += Math.cos(angle) * 0.1;
          this.vy += Math.sin(angle) * 0.1;
        }
      
        // Reasonable speed cap
        const maxSpeed = 1.5;
        if (currentSpeed > maxSpeed) {
          this.vx = (this.vx / currentSpeed) * maxSpeed;
          this.vy = (this.vy / currentSpeed) * maxSpeed;
        }
      
        // Smooth screen wrapping
        if (this.x < -this.size) {
          this.x = rect.width + this.size;
          this.vx = Math.abs(this.vx) * -0.5;
        }
        if (this.x > rect.width + this.size) {
          this.x = -this.size;
          this.vx = Math.abs(this.vx) * 0.5;
        }
        
        const totalHeight = window.innerHeight;
        if (this.y < -this.size) {
          this.y = totalHeight + this.size;
          this.vy = Math.abs(this.vy) * -0.5;
          this.initialY = this.y + (window.scrollY * this.layer);
        }
        if (this.y > totalHeight + this.size) {
          this.y = -this.size;
          this.vy = Math.abs(this.vy) * 0.5;
          this.initialY = this.y + (window.scrollY * this.layer);
        }
      }

      isClicked(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.size;
      }
    }

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

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX * window.devicePixelRatio,
        y: e.clientY * window.devicePixelRatio
      };
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
        shape.update(scrollDelta, mousePosition.current.x, mousePosition.current.y);
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
    window.addEventListener('mousemove', handleMouseMove);
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
      window.removeEventListener('mousemove', handleMouseMove);
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