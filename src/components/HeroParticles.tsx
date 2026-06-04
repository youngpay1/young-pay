import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  glowing: boolean;
}

interface SmokeBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; clicking: boolean }>({
    x: 0, y: 0, active: false, clicking: false,
  });
  const scrollRef = useRef<{ vy: number }>({ vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onMouseLeave = () => { mouseRef.current.active = false; mouseRef.current.clicking = false; };
    const onMouseDown = () => { if (canvas.width >= 768) mouseRef.current.clicking = true; };
    const onMouseUp = () => { mouseRef.current.clicking = false; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollRef.current.vy = delta > 0 ? 0 : delta; // only react on scroll up
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const particles: Particle[] = [];
    const smoke: SmokeBlob[] = [];

    const spawnParticle = (mx?: number) => {
      const isMobile = canvas.width < 768;
      const cx = mx !== undefined
        ? canvas.width * 0.5 + (mx - canvas.width * 0.5) * 0.5
        : canvas.width * 0.5;
      const baseVy = isMobile
        ? -(0.4 + Math.random() * 0.7)
        : -(0.7 + Math.random() * 1.2);
      particles.push({
        x: cx + (Math.random() - 0.5) * canvas.width * (isMobile ? 0.85 : 0.35),
        y: canvas.height * 0.88 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 0.4,
        vy: baseVy,
        baseVy,
        size: isMobile ? 0.4 + Math.random() * 0.8 : 0.8 + Math.random() * 1.6,
        opacity: 0,
        life: 0,
        maxLife: isMobile ? 150 + Math.random() * 100 : 200 + Math.random() * 200,
        glowing: Math.random() < 0.3,
      });
    };

    const spawnSmoke = () => {
      const isMobile = canvas.width < 768;
      const cx = canvas.width * 0.5;
      smoke.push({
        x: cx + (Math.random() - 0.5) * canvas.width * 0.45,
        y: canvas.height * (isMobile ? 0.7 : 0.55) + Math.random() * canvas.height * 0.2,
        vx: (Math.random() - 0.5) * 1.8,
        vy: isMobile ? -(0.35 + Math.random() * 0.55) : -(0.7 + Math.random() * 0.9),
        radius: isMobile ? 30 + Math.random() * 50 : 35 + Math.random() * 55,
        opacity: 0,
        life: 0,
        maxLife: isMobile ? 120 + Math.random() * 80 : 180 + Math.random() * 120,
      });
    };

    for (let i = 0; i < 7; i++) spawnSmoke();

    let frame = 0;
    let animId: number;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      frame++;

      const isMobile = canvas.width < 768;
      const spawnRate = mouse.active ? 1 : (isMobile ? 1 : 2);
      scrollRef.current.vy *= 0.85;

      // Burst particles from cursor when hovering
      if (mouse.active && frame % 3 === 0) {
        spawnParticle(mouse.x);
      }

      if (frame % spawnRate === 0) spawnParticle(mouse.active ? mouse.x : undefined);
      if (frame % 30 === 0) spawnSmoke();

      // Soft green smoke blobs
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vx += (Math.random() - 0.5) * 0.18;
        s.vy += (Math.random() - 0.5) * 0.07;
        s.vx *= 0.96;

        const p = s.life / s.maxLife;
        s.opacity = p < 0.12 ? p / 0.12 : p > 0.65 ? 1 - (p - 0.65) / 0.35 : 1;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        g.addColorStop(0,    `rgba(100, 220, 130, ${s.opacity * 0.18})`);
        g.addColorStop(0.4,  `rgba(70,  185, 105, ${s.opacity * 0.11})`);
        g.addColorStop(0.75, `rgba(35,  130,  75, ${s.opacity * 0.05})`);
        g.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) smoke.splice(i, 1);
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (mouse.active) {
          const clicking = mouse.clicking;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractRadius = clicking ? 350 : 200;
          const repelRadius = clicking ? 80 : 55;
          const attractStrength = clicking ? 3.5 : 1.2;
          const repelStrength = clicking ? 9.0 : 4.0;
          const swirlStrength = clicking ? 0.12 : 0.04;

          if (dist < attractRadius && dist > 0) {
            if (dist < repelRadius) {
              const f = (1 - dist / repelRadius) * repelStrength;
              p.vx += (dx / dist) * f * 0.18;
              p.vy += (dy / dist) * f * 0.18;
            } else {
              const f = (1 - dist / attractRadius) * attractStrength;
              p.vx -= (dx / dist) * f * 0.06;
              p.vy -= (dy / dist) * f * 0.06;
              p.vx += (-dy / dist) * f * swirlStrength;
              p.vy += (dx / dist) * f * swirlStrength;
            }
          }
          p.vy += (p.baseVy - p.vy) * 0.012;
          p.vx *= 0.97;
        }

        // Scroll interaction — scroll down accelerates particles up, scroll up pushes them down
        const scrollForce = scrollRef.current.vy * 0.04;
        p.vy -= scrollForce;
        p.vx += scrollRef.current.vy * (Math.random() - 0.5) * 0.02;

        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.025;
        p.vx *= 0.985;

        const prog = p.life / p.maxLife;
        p.opacity = prog < 0.12 ? prog / 0.12 : prog > 0.75 ? 1 - (prog - 0.75) / 0.25 : 1;

        ctx.save();

        if (p.glowing && prog > 0.3) {
          const glowProgress = Math.min(1, (prog - 0.3) / 0.2);
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
          glowGrad.addColorStop(0,   `rgba(80, 255, 120, ${p.opacity * glowProgress * 0.5})`);
          glowGrad.addColorStop(0.4, `rgba(40, 200,  80, ${p.opacity * glowProgress * 0.2})`);
          glowGrad.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = p.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.glowing ? 'rgba(200, 255, 210, 1)' : 'rgba(255, 255, 252, 1)';
        ctx.fill();

        ctx.restore();

        if (p.life >= p.maxLife || p.y < -20) particles.splice(i, 1);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
    />
  );
};

export default HeroParticles;
