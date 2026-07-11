import { useEffect, useRef } from "react";

export function Rain() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cnv = ref.current!;
    const ctx = cnv.getContext("2d")!;
    let raf = 0;
    let w = (cnv.width = cnv.offsetWidth);
    let h = (cnv.height = cnv.offsetHeight);
    const onResize = () => {
      w = cnv.width = cnv.offsetWidth;
      h = cnv.height = cnv.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    const drops = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 14 + 8,
      s: Math.random() * 6 + 6,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(150,200,255,0.35)";
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.l);
        ctx.stroke();
        d.y += d.s;
        d.x -= 0.2;
        if (d.y > h) {
          d.y = -10;
          d.x = Math.random() * w;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />;
}
