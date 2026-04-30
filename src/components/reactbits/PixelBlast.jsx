import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  const safeHex = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized;

  const int = Number.parseInt(safeHex, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
};

const PixelBlast = ({
  className = '',
  pixelSize = 12,
  color = '#0f7c90',
  accentColor = '#f6a64f',
  speed = 0.8,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return undefined;
    }

    const primary = hexToRgb(color);
    const accent = hexToRgb(accentColor);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(bounds.width * dpr));
      canvas.height = Math.max(1, Math.floor(bounds.height * dpr));
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const addRipple = (event) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        return;
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ripplesRef.current = [
        ...ripplesRef.current.slice(-5),
        { x, y, age: 0, power: 1.1 },
      ];
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', addRipple, { passive: true });
    window.addEventListener('pointerdown', addRipple, { passive: true });

    const render = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const columns = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);
      const t = (time * 0.001) * speed;

      context.clearRect(0, 0, width, height);

      context.fillStyle = 'rgba(255, 252, 248, 0.7)';
      context.fillRect(0, 0, width, height);

      ripplesRef.current = ripplesRef.current
        .map((ripple) => ({ ...ripple, age: ripple.age + 1 }))
        .filter((ripple) => ripple.age < 110);

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * pixelSize;
          const y = row * pixelSize;
          const centerX = x + pixelSize * 0.5;
          const centerY = y + pixelSize * 0.5;

          const wave = Math.sin(column * 0.45 + t * 2.1) + Math.cos(row * 0.38 - t * 1.7);
          let intensity = (wave + 2) / 4;

          ripplesRef.current.forEach((ripple) => {
            const dx = centerX - ripple.x;
            const dy = centerY - ripple.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const ring = ripple.age * 4.4;
            const falloff = Math.exp(-Math.abs(distance - ring) / 22);
            intensity += falloff * 0.9 * ripple.power * (1 - ripple.age / 110);
          });

          intensity = clamp(intensity, 0, 1);

          if (intensity < 0.22) {
            continue;
          }

          const mix = 0.35 + intensity * 0.65;
          const r = Math.round(primary.r * (1 - mix) + accent.r * mix);
          const g = Math.round(primary.g * (1 - mix) + accent.g * mix);
          const b = Math.round(primary.b * (1 - mix) + accent.b * mix);
          const alpha = 0.12 + intensity * 0.3;
          const size = pixelSize * (0.35 + intensity * 0.8);
          const inset = (pixelSize - size) / 2;

          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          context.fillRect(x + inset, y + inset, size, size);
        }
      }

      animationRef.current = window.requestAnimationFrame(render);
    };

    animationRef.current = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', addRipple);
      window.removeEventListener('pointerdown', addRipple);
    };
  }, [accentColor, color, pixelSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none h-full w-full ${className}`.trim()}
      aria-hidden="true"
    />
  );
};

export default PixelBlast;
