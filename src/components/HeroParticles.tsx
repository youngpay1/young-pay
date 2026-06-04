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
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0, y: 0, active: false,
  });

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
    const onMouseLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const particles: Particle[] = [];
    const smoke: SmokeBlob[] = [];

    const spawnParticle = (mx?: number) => {
      const isMobile = canvas.width < 768;
      const cx = mx !== undefined
        ? canvas.width * 0.5 + (mx - canvas.width * 0.5) * 0.35
        : canvas.width * 0.5;
      const baseVy = isMobile
        ? -(0.4 + Math.random() * 0.7)
        : -(0.7 + Math.random() * 1.2);
      particles.push({
        x: cx + (Math.random() - 0.5) * canvas.width * 0.35,
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
        vx: (Math.random() - 0.5) * 0.3,
        vy: isMobile ? -(0.04 + Math.random() * 0.08) : -(0.08 + Math.random() * 0.18),
        radius: isMobile ? 30 + Math.random() * 50 : 70 + Math.random() * 130,
        opacity: 0,
        life: 0,
        maxLife: isMobile ? 250 + Math.random() * 150 : 500 + Math.random() * 400,
      });
    };

    for (let i = 0; i < 14; i++) spawnSmoke();

    let frame = 0;
    let animId: number;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      frame++;

      if (frame % (mouse.active ? 2 : 3) === 0) spawnParticle(mouse.active ? mouse.x : undefined);
      if (frame % 35 === 0) spawnSmoke();

      // Soft green smoke blobs
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vx += (Math.random() - 0.5) * 0.012;

        const p = s.life / s.maxLife;
        s.opacity = p < 0.12 ? p / 0.12 : p > 0.72 ? 1 - (p - 0.72) / 0.28 : 1;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        g.addColorStop(0,    `rgba(80, 200, 120, ${s.opacity * 0.09})`);
        g.addColorStop(0.4,  `rgba(60, 170, 100, ${s.opacity * 0.05})`);
        g.addColorStop(0.75, `rgba(30, 120,  70, ${s.opacity * 0.02})`);
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
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (1 - dist / 120) * 1.8;
            p.vx += (dx / dist) * force * 0.11;
            p.vy += (dy / dist) * force * 0.11;
          }
          p.vy += (p.baseVy - p.vy) * 0.018;
          p.vx *= 0.97;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.025;
        p.vx *= 0.985;

        const prog = p.life / p.maxLife;
        p.opacity = prog < 0.12 ? prog / 0.12 : prog > 0.75 ? 1 - (prog - 0.75) / 0.25 : 1;

        ctx.save();

        if (p.glowing) {
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
          glowGrad.addColorStop(0,   `rgba(80, 255, 120, ${p.opacity * 0.5})`);
          glowGrad.addColorStop(0.4, `rgba(40, 200,  80, ${p.opacity * 0.2})`);
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
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
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
