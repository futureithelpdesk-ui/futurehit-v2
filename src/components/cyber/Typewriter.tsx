import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 35, className = "", onDone }: { text: string; speed?: number; className?: string; onDone?: () => void }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, onDone]);
  return (
    <span className={className}>
      {out}
      <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] -mb-[2px] animate-pulse bg-red-500/80 align-middle" />
    </span>
  );
}
