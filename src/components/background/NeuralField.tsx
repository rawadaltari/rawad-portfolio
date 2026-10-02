import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
  phase: number;
}

const LINK_DISTANCE = 140;
const POINTER_RADIUS = 180;

function readRgb(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/**
 * Subtle interactive neural-network field rendered on a single <canvas>.
 * - pauses when off-screen or the tab is hidden
 * - DPR capped at 2, node count scales with area
 * - static single frame when the user prefers reduced motion
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = false;
    let ready = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    let colors = { node: readRgb('--node', '236 238 240'), accent: readRgb('--node-accent', '255 138 76') };

    const seed = () => {
      const density = width < 640 ? 22000 : 15000;
      const count = Math.round(Math.min(80, Math.max(18, (width * height) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.7,
        accent: Math.random() < 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (!running) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const n = nodes.length;

      for (let i = 0; i < n; i++) {
        const a = nodes[i]!;
        if (!reduceMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -20) a.x = width + 20;
          else if (a.x > width + 20) a.x = -20;
          if (a.y < -20) a.y = height + 20;
          else if (a.y > height + 20) a.y = -20;
        }

        for (let j = i + 1; j < n; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DISTANCE * LINK_DISTANCE) continue;
          const d = Math.sqrt(d2);
          let alpha = (1 - d / LINK_DISTANCE) * 0.16;
          let rgb = colors.node;
          if (pointer.active) {
            const mx = (a.x + b.x) / 2 - pointer.x;
            const my = (a.y + b.y) / 2 - pointer.y;
            const pd = Math.sqrt(mx * mx + my * my);
            if (pd < POINTER_RADIUS) {
              alpha += (1 - pd / POINTER_RADIUS) * 0.35;
              rgb = colors.accent;
            }
          }
          ctx.strokeStyle = `rgb(${rgb} / ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const p of nodes) {
        const pulse = p.accent ? 0.55 + Math.sin(t / 900 + p.phase) * 0.35 : 0.45;
        ctx.fillStyle = `rgb(${p.accent ? colors.accent : colors.node} / ${pulse.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.accent ? p.r + 0.6 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!ready || running || reduceMotion || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const parent = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    parent.addEventListener('pointermove', onMove, { passive: true });
    parent.addEventListener('pointerleave', onLeave);

    // Re-read colours when the theme changes.
    const mo = new MutationObserver(() => {
      colors = { node: readRgb('--node', colors.node), accent: readRgb('--node-accent', colors.accent) };
      if (!running) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Defer the first animated frame until the browser is idle so it never competes with first paint.
    resize();
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const cancelRic = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = ric(() => {
      ready = true;
      start();
    }, { timeout: 2000 });

    return () => {
      cancelRic(idleId);
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}
