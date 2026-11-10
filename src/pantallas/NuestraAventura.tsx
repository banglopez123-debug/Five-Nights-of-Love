
import { useRef, useState } from "react";
import { VIDEOS } from "../config/rutas";
import "../estilos/aventura.css";

type Props = {
  onVolver: () => void;
  onContinuar: () => void;
};

export default function NuestraAventura({
  onVolver,
  onContinuar,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reproduciendo, setReproduciendo] =
    useState(false);

  const [terminado, setTerminado] = useState(false);

  // REPRODUCIR O PAUSAR VIDEO
  async function reproducirVideo() {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error(
          "No se pudo reproducir el video",
          error
        );
      }
    } else {
      video.pause();
    }
  }

  // REINICIAR VIDEO
  function reiniciarVideo() {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;
    setTerminado(false);

    void video.play().catch(console.error);
  }

  return (
    <section className="aventura-pantalla">
      {/* INFORMACIÓN SUPERIOR */}
      <header className="aventura-header">
        <span>♥ NUESTRA HISTORIA ♥</span>
        <span>CAPÍTULO ESPECIAL</span>
      </header>

      {/* TÍTULO */}
      <div className="aventura-introduccion">
        <p className="aventura-etiqueta">
          ★ UN RECUERDO PARA CARLOS ★
        </p>

        <h1>NUESTRA AVENTURA</h1>

        <p>
          Toda historia tiene un comienzo...
          pero la nuestra es mi favorita. ♡
        </p>
      </div>

      {/* REPRODUCTOR DEL CÓMIC */}
      <div className="aventura-marco">
        <div className="aventura-marco-superior">
          <span>● RECUERDO ESPECIAL</span>
          <span>♥ LOVE STORY ♥</span>
        </div>

        <video
          ref={videoRef}
          className="aventura-video"
          src={VIDEOS.nuestraHistoria}
          controls
          playsInline
          preload="metadata"
          onPlay={() => {
            setReproduciendo(true);
            setTerminado(false);
          }}
          onPause={() => setReproduciendo(false)}
          onEnded={() => {
            setReproduciendo(false);
            setTerminado(true);
          }}
        >
          Tu navegador no puede reproducir este video.
        </video>

        <div className="aventura-marco-inferior">
          <span>
            ♥ NUESTRO PEQUEÑO UNIVERSO ♥
          </span>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="aventura-controles">
        <button
          type="button"
          onClick={reproducirVideo}
        >
          {reproduciendo
            ? "Ⅱ PAUSAR CÓMIC"
            : "▶ REPRODUCIR CÓMIC"}
        </button>

        <button
          type="button"
          onClick={reiniciarVideo}
        >
          ↻ VOLVER A VER
        </button>
      </div>

      {/* DEDICATORIA */}
      <div className="aventura-dedicatoria">
        <span className="aventura-corazon">
          ♥
        </span>

        <p>
          Carlos, si nuestra historia fuera un libro,
          tú serías mi capítulo favorito.
        </p>

        <p>
          Y si fuera una película, quisiera verla
          una y mil veces, siempre contigo.
        </p>

        {terminado && (
          <p className="aventura-mensaje-final">
            ♡ FIN DEL CAPÍTULO...
            PERO NO DE NUESTRA HISTORIA ♡
          </p>
        )}
      </div>

      {/* NAVEGACIÓN */}
      <div className="aventura-navegacion">
        <button
          type="button"
          onClick={onVolver}
        >
          ← VOLVER AL MENÚ
        </button>

        <button
          type="button"
          className="aventura-siguiente"
          onClick={onContinuar}
        >
          ♫ NUESTRA PLAYLIST →
        </button>
      </div>
    </section>
  );
}
