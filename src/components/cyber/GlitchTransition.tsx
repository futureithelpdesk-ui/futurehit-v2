import { useEffect, useRef } from "react";

export function GlitchTransition() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`;
    const fs = `
      precision highp float;
      uniform vec2 uRes;
      uniform float uTime;
      uniform float uStr;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes.xy;
        float s = uStr;
        float band = step(0.985, hash(vec2(floor(uv.y*120.0), floor(uTime*8.0))));
        float tear = band * (hash(vec2(floor(uTime*30.0), floor(uv.y*60.0))) - 0.5) * 0.25 * s;
        float off = 0.012 * s + tear;
        float r = step(0.0, off);
        float scan = sin(uv.y * uRes.y * 1.2 + uTime*20.0) * 0.5 + 0.5;
        float n = hash(floor(gl_FragCoord.xy + uTime*60.0));
        vec3 col = vec3(0.0);
        col.r = (n + scan*0.3) * (0.6 + 0.4*r);
        col.g = (hash(floor(gl_FragCoord.xy*1.3 - uTime*40.0)));
        col.b = (1.0 - n) * (0.6 + 0.4*(1.0-r));
        col = mix(col, vec3(col.r*1.4, col.g*0.4, col.b*1.6), 0.5);
        float a = s * (0.18 + 0.35*band + 0.25*abs(tear)*10.0);
        gl_FragColor = vec4(col, clamp(a, 0.0, 0.75));
      }
    `;
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uStr = gl.getUniformLocation(prog, "uStr");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let lastY = window.scrollY;
    let lastT = performance.now();
    let strength = 0;

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(now - lastT, 1);
      const v = dy / dt;
      strength = Math.min(1, strength + v * 0.08);
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const start = performance.now();
    const loop = () => {
      strength *= 0.92;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform1f(uStr, strength);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (strength > 0.01) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen" aria-hidden />;
}
