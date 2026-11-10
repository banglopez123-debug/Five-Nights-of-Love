
import { useState } from "react";
import type { FormEvent } from "react";
import { IMAGENES } from "../config/rutas";
import "../estilos/acceso.css";

type Props = {
  onEntrar: () => void;
};

export default function AccesoRomantico({
  onEntrar,
}: Props) {
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState(false);
  const [correcto, setCorrecto] = useState(false);

  // Verificar nuestra fecha especial
  function verificarFecha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const respuesta = fecha
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    const respuestasValidas = [
      "10 de mayo",
      "10 mayo",
      "10/05",
      "10-05",
      "10/5",
      "10-5",
    ];

    if (respuestasValidas.includes(respuesta)) {
      setError(false);
      setCorrecto(true);
    } else {
      setError(true);
      setCorrecto(false);
    }
  }

  return (
    <main className="acceso-romantico">
      {/* FONDO DE ESTRELLAS */}
      <div
        className="acceso-estrellas"
        aria-hidden="true"
      />

      <section className="acceso-tarjeta">
        <p className="acceso-etiqueta">
          ★ FIVE NIGHTS OF LOVE ★
        </p>

        <div className="acceso-corazon">
          ♥
        </div>

        {!correcto ? (
          <>
            {/* TÍTULO */}
            <h1>
              UNA SORPRESA PARA TI ♡
            </h1>

            {/* IMAGEN DE CUMPLEAÑOS */}
            <div className="acceso-imagen-cumple">
              <img
                src={IMAGENES.cumpleanosFnaf}
                alt="Freddy, Bonnie, Foxy y Chica celebrando un cumpleaños"
              />
            </div>

            {/* MENSAJE ROMÁNTICO */}
            <p className="acceso-descripcion">
              Antes de comenzar nuestra aventura,
              debes recordar una fecha muy especial
              para nosotros dos... 💕
            </p>

            {/* FORMULARIO DE ACCESO */}
            <form
              onSubmit={verificarFecha}
              className="acceso-formulario"
            >
              <label htmlFor="fecha-especial">
                ¿Cuál es nuestra fecha especial? 💗
              </label>

              <input
                id="fecha-especial"
                type="text"
                value={fecha}
                onChange={(e) => {
                  setFecha(e.target.value);
                  setError(false);
                }}
                placeholder="Escribe nuestra fecha..."
                autoComplete="off"
                required
              />

              {/* FECHA INCORRECTA */}
              {error && (
                <p
                  className="acceso-error"
                  role="alert"
                >
                  Ups, mi amor... 🥺💕
                  Esa no es nuestra fecha.
                  ¡Inténtalo otra vez!
                </p>
              )}

              <button type="submit">
                ♥ DESBLOQUEAR SORPRESA ♥
              </button>
            </form>

            <p className="acceso-pista">
              ♡ Solo alguien muy especial
              conoce la respuesta ♡
            </p>
          </>
        ) : (
          <>
            {/* BIENVENIDA DESBLOQUEADA */}
            <div className="acceso-exito">
              <h1>
                ¡BIENVENIDO, MI AMOR! ♡
              </h1>

              <p>
                Sabía que recordarías nuestra
                fecha especial. 🥹💜
              </p>

              <p>
                Preparé esta pequeña aventura
                con todo mi corazón, especialmente
                para ti, Carlitos.
              </p>

              <button
                type="button"
                onClick={onEntrar}
              >
                ▶ COMENZAR NUESTRA AVENTURA
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
