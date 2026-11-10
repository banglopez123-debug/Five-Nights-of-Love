import { useEffect, useRef } from "react";

const REASONS: [string, string][] = [
  ["💜", "Porque tu sonrisa ilumina hasta mis días más oscuros."],
  ["🥹", "Porque tus abrazos son mi lugar favorito."],
  ["💕", "Porque me haces reír incluso cuando estoy triste."],
  ["🤭", "Porque amo cada una de tus ocurrencias."],
  ["💗", "Porque contigo hasta los momentos más sencillos son especiales."],
  ["✨", "Porque me encanta verte feliz y emocionado."],
  ["🫶", "Porque siempre quiero escuchar lo que tienes que contarme."],
  ["💞", "Porque me haces sentir muy amada."],
  ["🥰", "Porque adoro tus ojitos y tu carita hermosa."],
  ["💋", "Porque cada besito tuyo es un regalo."],
  ["🌷", "Porque amo compartir mis días contigo."],
  ["💜", "Porque contigo puedo ser yo misma."],
  ["🥹", "Porque eres mi persona favorita."],
  ["🏡", "Porque me encanta imaginar nuestro futuro juntos."],
  ["🌟", "Porque estoy orgullosa de todo lo que logras."],
  ["💕", "Porque me inspiras a seguir creciendo."],
  ["🌙", "Porque siempre quiero apoyarte en tus sueños."],
  ["🤭", "Porque nuestras locuras son mis mejores recuerdos."],
  ["💗", "Porque me haces feliz con los detalles más pequeños."],
  ["🫂", "Porque amo la persona en la que te estás convirtiendo."],
  ["💜", "Porque volvería a elegirte una y mil veces."],
  ["🥺🌏💓", "Porque tú eres mi mundo entero, Carlitos."],
];

const TILT = 0.38; // inclinación del disco de la galaxia
const SHOW = 6; // segundos que se ve cada razón
const GAP = 1.2; // segundos entre una razón y la siguiente
const CYCLE = REASONS.length * GAP;

interface Star { r: number; a: number; size: number; tw: number }
interface HeartPoint { x: number; y: number; size: number; ph: number }
interface Label { lines: string[]; r: number; a: number; speed: number; start: number }
interface Floater { x: number; y: number; s: number; v: number; ph: number }

function wrapText(str: string, max: number): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const w of str.split(" ")) {
    if ((cur + " " + w).trim().length > max) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  lines.push(cur);
  return lines;
}

function newFloater(init: boolean): Floater {
  return {
    x: Math.random(),
    y: init ? Math.random() : 1.05,
    s: 8 + Math.random() * 16,
    v: 0.02 + Math.random() * 0.04,
    ph: Math.random() * 6.28,
  };
}

function drawHeartShape(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x, y - size * 0.3, x - size, y - size * 0.3, x - size, y + size * 0.3);
  ctx.bezierCurveTo(x - size, y + size * 0.8, x, y + size * 1.0, x, y + size * 1.3);
  ctx.bezierCurveTo(x, y + size * 1.0, x + size, y + size * 0.8, x + size, y + size * 0.3);
  ctx.bezierCurveTo(x + size, y - size * 0.3, x, y - size * 0.3, x, y + size * 0.3);
  ctx.fill();
}

type Props = {
  /** Se llama una sola vez cuando ya salieron las 22 razones */
  onCompletar?: () => void;
};

export default function GalaxiaAnimada({ onCompletar }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompletarRef = useRef(onCompletar);
  onCompletarRef.current = onCompletar;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, cx = 0, cy = 0, S = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H * 0.66;
      S = Math.min(W, H);
    };
    resize();
    window.addEventListener("resize", resize);

    // Galaxia en espiral
    const stars: Star[] = Array.from({ length: 2800 }, () => {
      const r = Math.pow(Math.random(), 1.4);
      const arm = Math.floor(Math.random() * 3) * ((Math.PI * 2) / 3);
      return {
        r,
        a: arm + r * 5 + (Math.random() - 0.5) * (0.25 + r * 0.5),
        size: Math.random() * 1.6 + 0.4,
        tw: Math.random() * 6.28,
      };
    });

    // Corazón hecho de partículas
    const heartPts: HeartPoint[] = Array.from({ length: 2200 }, () => {
      const t = Math.random() * Math.PI * 2;
      const edge = Math.random() < 0.4;
      const s = edge ? 1 + (Math.random() - 0.5) * 0.06 : Math.sqrt(Math.random());
      return {
        x: 16 * Math.pow(Math.sin(t), 3) * s,
        y: (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s,
        size: Math.random() * 1.8 + 0.5,
        ph: Math.random() * 6.28,
      };
    });

    // Las 22 razones orbitando
    const labels: Label[] = REASONS.map(([emoji, text], i) => ({
      lines: wrapText(`${emoji} ${i + 1}. ${text}`, 28),
      r: 0.38 + (i % 4) * 0.15,
      a: i * 2.4,
      speed: 0.05 + (i % 3) * 0.02,
      start: i * GAP,
    }));

    // Corazoncitos que suben
    const floaters: Floater[] = Array.from({ length: 14 }, () => newFloater(true));

    let last = performance.now();
    let t0 = -1;
    let raf = 0;

    // Avisar a la pantalla cuando ya se mostró la razón 22
    const timer = window.setTimeout(
      () => onCompletarRef.current?.(),
      ((REASONS.length - 1) * GAP + SHOW) * 1000
    );

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (t0 < 0) t0 = now;
      const t = (now - t0) / 1000;
      const R = S * 0.62;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      // Resplandor de fondo
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      g.addColorStop(0, "rgba(120,0,20,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, TILT);
      ctx.translate(-cx, -cy);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 6.28);
      ctx.fill();
      ctx.restore();

      ctx.globalCompositeOperation = "lighter";

      // Estrellas de la galaxia
      for (const p of stars) {
        p.a += (dt * 0.5) / (0.25 + p.r * 1.2);
        const rr = p.r * R;
        const x = cx + Math.cos(p.a) * rr;
        const y = cy + Math.sin(p.a) * rr * TILT;
        const al = (0.25 + 0.75 * (1 - p.r)) * (0.7 + 0.3 * Math.sin(t * 2 + p.tw));
        ctx.fillStyle = `rgba(255,${Math.floor(40 + 90 * (1 - p.r))},${Math.floor(50 + 60 * (1 - p.r))},${al})`;
        ctx.fillRect(x, y, p.size, p.size);
      }

      // Agujero negro
      ctx.globalCompositeOperation = "source-over";
      const br = S * 0.05;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, TILT);
      ctx.shadowColor = "#ff2a4d";
      ctx.shadowBlur = 25;
      ctx.fillStyle = "#000";
      ctx.strokeStyle = "rgba(255,230,230,0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, br, 0, 6.28);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Corazón de partículas
      ctx.globalCompositeOperation = "lighter";
      const pulse = 1 + 0.05 * Math.sin(t * 2.2) + 0.02 * Math.sin(t * 6);
      const hs = (S / 38) * pulse;
      const hx = cx;
      const hy = H * 0.3 + Math.sin(t) * 4;
      for (const p of heartPts) {
        const j = Math.sin(t * 3 + p.ph) * 1.2;
        ctx.fillStyle = `rgba(255,${Math.floor(30 + 50 * Math.abs(Math.sin(p.ph)))},60,${0.55 + 0.4 * Math.sin(t * 2 + p.ph)})`;
        ctx.fillRect(hx + p.x * hs + j, hy - p.y * hs + j, p.size, p.size);
      }

      // Razones en órbita (aparecen, giran y se desvanecen)
      ctx.globalCompositeOperation = "source-over";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const items: { l: Label; alpha: number; x: number; y: number; z: number }[] = [];
      for (const l of labels) {
        l.a += l.speed * dt;
        const u = ((((t - l.start) % CYCLE) + CYCLE) % CYCLE) / SHOW;
        if (u > 1) continue;
        const alpha = Math.min(u / 0.15, (1 - u) / 0.15, 1);
        const rr = l.r * R;
        items.push({
          l,
          alpha,
          x: cx + Math.cos(l.a) * rr,
          y: cy + Math.sin(l.a) * rr * TILT,
          z: Math.sin(l.a),
        });
      }
      items.sort((a, b) => a.z - b.z);
      for (const it of items) {
        const sc = 0.85 + 0.25 * it.z;
        const fs = Math.max(11, S * 0.021 * sc);
        ctx.font = `bold ${fs}px "Segoe UI", system-ui, sans-serif`;
        ctx.shadowColor = "#ff4d8d";
        ctx.shadowBlur = 12;
        ctx.fillStyle = `rgba(255,190,220,${it.alpha * (0.7 + (0.3 * (it.z + 1)) / 2)})`;
        it.l.lines.forEach((ln, k) =>
          ctx.fillText(ln, it.x, it.y + (k - (it.l.lines.length - 1) / 2) * fs * 1.25)
        );
      }
      ctx.shadowBlur = 0;

      // Corazoncitos flotando
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        f.y -= f.v * dt;
        if (f.y < -0.1) floaters[i] = newFloater(false);
        const x = f.x * W + Math.sin(t + f.ph) * 12;
        const y = f.y * H;
        ctx.fillStyle = "rgba(255,60,110,0.55)";
        ctx.shadowColor = "#ff2a6d";
        ctx.shadowBlur = 14;
        drawHeartShape(ctx, x, y, f.s * 0.5);
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="galaxia-animada">
      <canvas ref={canvasRef} className="galaxia-canvas" />
    </div>
  );
}