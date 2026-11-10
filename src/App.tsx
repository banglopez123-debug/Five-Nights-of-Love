
import { useEffect, useRef, useState } from "react";
import MenuPrincipal from "./pantallas/MenuPrincipal";
import AccesoRomantico from "./pantallas/AccesoRomantico";
import { MUSICA } from "./config/rutas";
import "./estilos/musica.css";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [reproduciendo, setReproduciendo] =
    useState(false);

  const [accesoPermitido, setAccesoPermitido] =
    useState(false);

  // CONFIGURAR VOLUMEN INICIAL
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
  }, []);

  // ACTIVAR O PAUSAR MÚSICA
  async function controlarMusica() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "No se pudo reproducir la música:",
          error
        );
      }
    } else {
      audio.pause();
    }
  }

  // PERMITIR ACCESO A LA SORPRESA
  function entrarASorpresa() {
    setAccesoPermitido(true);
  }

  return (
    <>
      {/* MÚSICA DE FONDO */}
      <audio
        ref={audioRef}
        src={MUSICA.fondoFnaf}
        loop
        preload="auto"
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
        onEnded={() => setReproduciendo(false)}
        onError={() => {
          setReproduciendo(false);
          console.error("Error al cargar la música");
        }}
      />

      {/* ACCESO ROMÁNTICO O MENÚ PRINCIPAL */}
      {accesoPermitido ? (
        <MenuPrincipal />
      ) : (
        <AccesoRomantico
          onEntrar={entrarASorpresa}
        />
      )}

      {/* BOTÓN PARA CONTROLAR LA MÚSICA */}
      <button
        className="boton-musica"
        onClick={controlarMusica}
        aria-label={
          reproduciendo
            ? "Pausar música"
            : "Reproducir música"
        }
        aria-pressed={reproduciendo}
      >
        {reproduciendo
          ? "♫ MÚSICA: SÍ"
          : "♪ MÚSICA: NO"}
      </button>
    </>
  );
}

export default App;
