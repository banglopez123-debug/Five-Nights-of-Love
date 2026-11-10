
import { useState } from "react";
import GalaxiaAnimada from "../componentes/GalaxiaAnimada";
import { IMAGENES } from "../config/rutas";
import "../estilos/sorpresa.css";

type Props = {
  onVolver: () => void;
};

type Etapa = "galaxia" | "fiesta" | "final";

export default function SorpresaFinal({
  onVolver,
}: Props) {
  const [etapa, setEtapa] =
    useState<Etapa>("galaxia");

  const [portalDesbloqueado, setPortalDesbloqueado] =
    useState(false);

  const [lucesEncendidas, setLucesEncendidas] =
    useState(false);

  function reiniciar() {
    setEtapa("galaxia");
    setPortalDesbloqueado(false);
    setLucesEncendidas(false);
  }

  return (
    <main className="sorpresa-universo">
      {/* BARRA SUPERIOR */}
      <header className="sorpresa-barra">
        <span>★ FIVE NIGHTS OF LOVE ★</span>

        <button
          type="button"
          onClick={onVolver}
        >
          ← MENÚ
        </button>
      </header>

      {/* ETAPA 1: GALAXIA DEL AMOR */}
      {etapa === "galaxia" && (
        <section className="galaxia-pantalla">
          <div className="galaxia-encabezado">
            <p className="sorpresa-etiqueta">
              ✦ NOCHE 22 · MISIÓN SECRETA ✦
            </p>

            <h1>
              NUESTRA GALAXIA DEL AMOR
            </h1>

            <p>
              De todas las estrellas del universo,
              tú eres mi favorita, mi amor. ♡
            </p>
          </div>

          {/* GALAXIA ANIMADA */}
          <GalaxiaAnimada
            onCompletar={() =>
              setPortalDesbloqueado(true)
            }
          />

          {/* PORTAL SECRETO */}
          {portalDesbloqueado ? (
            <div className="portal-desbloqueado">
              <p>
                🌟 ¡HAS DESCUBIERTO MIS 22 RAZONES! 🌟
              </p>

              <p className="portal-mensaje">
                Pero nuestra aventura todavía
                no termina, mi amor...
              </p>

              <button
                type="button"
                className="sorpresa-boton"
                onClick={() => setEtapa("fiesta")}
              >
                ✦ ENTRAR AL PORTAL SECRETO ✦
              </button>
            </div>
          ) : (
            <p className="galaxia-espera">
              ♥ DESCUBRIENDO NUESTRAS 22 RAZONES ♥
            </p>
          )}
        </section>
      )}

      {/* ETAPA 2: FIESTA SECRETA */}
      {etapa === "fiesta" && (
        <section
          className={
            "sorpresa-panel fiesta-panel " +
            (lucesEncendidas
              ? "fiesta-iluminada"
              : "fiesta-oscura")
          }
        >
          {!lucesEncendidas ? (
            <>
              <p className="sorpresa-etiqueta">
                ⚠ ACTIVIDAD ANIMATRÓNICA DETECTADA ⚠
              </p>

              <h1>¿HAY ALGUIEN AQUÍ?</h1>

              <div className="fiesta-interruptor">
                💡
              </div>

              <p className="fiesta-instruccion">
                La habitación está a oscuras...
                Parece que alguien te está esperando.
              </p>

              <button
                type="button"
                className="sorpresa-boton"
                onClick={() =>
                  setLucesEncendidas(true)
                }
              >
                💡 ENCENDER LAS LUCES
              </button>
            </>
          ) : (
            <>
              <div
                className="fiesta-confeti"
                aria-hidden="true"
              >
                🎊 ✨ 🎉 💜 🎊 💕 🎉 ✨
              </div>

              <p className="sorpresa-etiqueta">
                ★ ¡SORPRESA! ★
              </p>

              <h1>
                ¡FELIZ CUMPLEAÑOS, CARLOS!
              </h1>

              <div className="fiesta-globos">
                🎈 🎈 🎂 🎈 🎈
              </div>

              <p className="fiesta-edad">
                ★ 22 AÑITOS ★
              </p>

              <div className="fiesta-personajes">
                {/* FOXY */}
                <div className="fiesta-personaje">
                  <img
                    src={IMAGENES.foxy}
                    alt="Foxy"
                  />

                  <h3>FELIZ</h3>

                  <p>
                    ¡Feliz cumpleaños, Carlos!
                    Has sobrevivido a todas las noches,
                    pero no podrás escapar de tanto amor.
                  </p>
                </div>

                {/* BONNIE OSCURO */}
                <div className="fiesta-personaje">
                  <img
                    src={IMAGENES.bonnieOscuro}
                    alt="Bonnie oscuro"
                  />

                  <h3>CUMPLEAÑOS</h3>

                  <p>
                    ¡Misión completada!
                    Has desbloqueado 22 razones
                    para ser amado.
                  </p>
                </div>

                {/* FREDD */}
                <div className="fiesta-personaje">
                  <img
                    src={IMAGENES.fredd}
                    alt="Fredd"
                  />

                  <h3>MI AMOR</h3>

                  <p>
                    ¡El pastel está listo!
                    Pero alguien tiene una última
                    sorpresa para ti... ♡
                  </p>
                </div>
              </div>

              <div className="fiesta-ultimo-regalo">
                <p>
                  🐻 FREDDY: ¡ESPERA, CARLOS!
                  TIENES UN ÚLTIMO REGALO.
                </p>

                <button
                  type="button"
                  className="sorpresa-boton"
                  onClick={() => setEtapa("final")}
                >
                  ♥ ABRIR EL ÚLTIMO REGALO ♥
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* ETAPA 3: FINAL VERDADERO */}
      {etapa === "final" && (
        <section className="sorpresa-panel final-panel">
          <p className="sorpresa-etiqueta">
            ★ FINAL VERDADERO DESBLOQUEADO ★
          </p>

          <h1>
            22 RAZONES, UN AMOR INFINITO
          </h1>

          <div className="final-ilustracion">
            <img
              src={IMAGENES.nuestraIlustracion}
              alt="Nuestra ilustración con el puerquito rosa"
            />
          </div>

          <blockquote className="final-dedicatoria">
            “De todas las estrellas del universo,
            mi favorita siempre serás tú, Mi amor.
            Te elegiría en esta vida y en mil galaxias más.
            Feliz cumpleaños, mi amor. TE AMOOOO. ♡”
          </blockquote>

          <p className="final-continuara">
            ♡ CONTINUARÁ POR SIEMPRE ♡
          </p>

          <div className="final-acciones">
            <button
              type="button"
              className="sorpresa-boton"
              onClick={reiniciar}
            >
              ↻ REVIVIR NUESTRA GALAXIA
            </button>

            <button
              type="button"
              className="sorpresa-boton secundario"
              onClick={onVolver}
            >
              ← VOLVER AL MENÚ
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
