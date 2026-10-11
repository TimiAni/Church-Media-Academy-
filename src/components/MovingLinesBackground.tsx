import React, { useEffect, useRef } from 'react';

interface TechNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

interface DataPulse {
  fromNode: number;
  toNode: number;
  progress: number; // 0 to 1
  speed: number;
}

export const MovingLinesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive tech grid linkup
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Tech Nodes Initialization
    let nodes: TechNode[] = [];
    let pulses: DataPulse[] = [];

    const initNodes = () => {
      // Density based on viewport area
      const nodeCount = Math.floor((width * height) / 24000) + 18;
      nodes = Array.from({ length: Math.min(nodeCount, 55) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1.8, // 1.8 to 3.6px
        pulseOffset: Math.random() * Math.PI * 2
      }));

      // Active flowing data pulses in green
      pulses = Array.from({ length: 12 }, () => ({
        fromNode: Math.floor(Math.random() * nodes.length),
        toNode: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: Math.random() * 0.007 + 0.004
      }));
    };

    initNodes();

    let time = 0;
    const connectionDistance = 140;

    const render = () => {
      time += 0.01;
      // Fully clear canvas for complete transparency
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle, translucent digital crosshairs in soft mint/emerald
      const gridStep = 90;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.lineWidth = 0.5;

      for (let gx = gridStep; gx < width; gx += gridStep) {
        for (let gy = gridStep; gy < height; gy += gridStep) {
          ctx.beginPath();
          ctx.moveTo(gx - 2.5, gy);
          ctx.lineTo(gx + 2.5, gy);
          ctx.moveTo(gx, gy - 2.5);
          ctx.lineTo(gx, gy + 2.5);
          ctx.stroke();
        }
      }

      // 2. Update and Draw Tech Nodes & Translucent Green Connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 10 || node.x > width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > height - 10) node.vy *= -1;

        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 180 && distToMouse > 0) {
          node.x -= (dx / distToMouse) * 0.6;
          node.y -= (dy / distToMouse) * 0.6;
        }

        // Connect nodes to neighboring nodes (Clean, transparent green circuit)
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(5, 150, 105, ${alpha})`; // Translucent emerald
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Connect node to cursor if near
        if (distToMouse < 200) {
          const mouseAlpha = (1 - distToMouse / 200) * 0.28;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(16, 185, 129, ${mouseAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw Node Core with pulsing green glow
        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.5 + 0.5;
        const currentRadius = node.radius + pulse * 0.8;

        // Outer glow (translucent green)
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.08 + pulse * 0.12})`;
        ctx.fill();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#059669'; // Emerald green
        ctx.fill();
      }

      // 3. Flow Effect: Data packets streaming along connection lines in emerald
      pulses.forEach(pulse => {
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.fromNode = Math.floor(Math.random() * nodes.length);
          let closest = (pulse.fromNode + 1) % nodes.length;
          let minDist = 999999;
          for (let k = 0; k < nodes.length; k++) {
            if (k === pulse.fromNode) continue;
            const d = Math.hypot(
              nodes[pulse.fromNode].x - nodes[k].x,
              nodes[pulse.fromNode].y - nodes[k].y
            );
            if (d < connectionDistance && d < minDist) {
              minDist = d;
              closest = k;
            }
          }
          pulse.toNode = closest;
        }

        const start = nodes[pulse.fromNode];
        const end = nodes[pulse.toNode];

        if (start && end) {
          const dist = Math.hypot(start.x - end.x, start.y - end.y);
          if (dist < connectionDistance * 1.3) {
            const currentX = start.x + (end.x - start.x) * pulse.progress;
            const currentY = start.y + (end.y - start.y) * pulse.progress;

            ctx.beginPath();
            ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#34d399';
            ctx.shadowBlur = 5;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 4. Subtle green radar broadcast wave
      const radarTime = (time * 0.35) % 4;
      const radarRadius = radarTime * 80;
      const radarAlpha = Math.max(0, 1 - radarTime / 4) * 0.08;

      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.35, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16, 185, 129, ${radarAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-65"
      style={{
        background: 'transparent'
      }}
      aria-hidden="true"
    />
  );
};
