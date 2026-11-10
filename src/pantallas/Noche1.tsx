
import { useState } from "react";
import { IMAGENES } from "../config/rutas";
import "../estilos/noche1.css";

type Props = {
  onVolver: () => void;
  onCompletar: () => void;
};

// CÁMARAS, ESCENARIOS Y FRAGMENTOS
const camaras = [
  {
    id: 1,
    nombre: "CAM 01",
    lugar: "ESCENARIO PRINCIPAL",
    personaje: IMAGENES.freddy,
    fondo: IMAGENES.escenarioFreddy,
    pista:
      "Si pudiera elegir entre todas las estrellas del universo...",
  },
  {
    id: 2,
    nombre: "CAM 02",
    lugar: "PASILLO DE BONNIE",
    personaje: IMAGENES.bonnie,
    fondo: IMAGENES.pasilloBonnie,
    pista:
      "...no buscaría la más brillante ni la más perfecta...",
  },
  {
    id: 3,
    nombre: "CAM 03",
    lugar: "COCINA DE CHICA",
    personaje: IMAGENES.chica,
    fondo: IMAGENES.cocinaChica,
    pista:
      "...te elegiría a ti, porque desde que llegaste a mi vida, hasta mis noches más oscuras tienen luz.",
  },
];

const fraseFinal =
  "Si pudiera elegir entre todas las estrellas del universo, " +
  "no buscaría la más brillante ni la más perfecta... " +
  "te elegiría a ti, porque desde que llegaste a mi vida, " +
  "hasta mis noches más oscuras tienen luz.";

export default function Noche1({
  onVolver,
  onCompletar,
}: Props) {
  // CÁMARA SELECCIONADA
  const [camaraActual, setCamaraActual] = useState(0);

  // PISTAS DESCUBIERTAS
  const [pistasEncontradas, setPistasEncontradas] =
    useState<number[]>([]);

  // MENSAJE FINAL
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const camara = camaras[camaraActual];

  const pistaEncontrada =
    pistasEncontradas.includes(camara.id);

  const todasEncontradas =
    pistasEncontradas.length === camaras.length;

  // DESCUBRIR PISTA
  function encontrarPista() {
    setPistasEncontradas((anteriores) => {
      if (anteriores.includes(camara.id)) {
        return anteriores;
      }

      return [...anteriores, camara.id];
    });
  }

  // CAMBIAR DE CÁMARA
  function seleccionarCamara(index: number) {
    setCamaraActual(index);
  }

  return (
    <section className="noche1">
      {/* INFORMACIÓN SUPERIOR */}
      <header className="noche1-header">
        <span>● GRABANDO</span>
        <span>NOCHE 1 — 12:00 A. M.</span>
      </header>

      {!mostrarFinal ? (
        <div className="noche1-contenido">
          <h2>OFICINA DE SEGURIDAD</h2>

          <p className="noche1-instrucciones">
            Carlos, tres animatrónicos guardan
            fragmentos de un mensaje especial.
            Encuéntralos para descubrir el secreto.
          </p>

          {/* MONITOR DE VIGILANCIA */}
          <div
            className="monitor"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(10, 5, 18, 0.35),
                  rgba(10, 5, 18, 0.65)
                ),
                url("${camara.fondo}")
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* ENCABEZADO DEL MONITOR */}
            <div className="monitor-superior">
              <span>● REC</span>
              <span>{camara.nombre}</span>
            </div>

            <h3>{camara.lugar}</h3>

            {/* PERSONAJE */}
            <img
              key={camara.id}
              src={camara.personaje}
              alt={`Animatrónico en ${camara.lugar}`}
              className="personaje-camara"
            />

            {/* FRAGMENTO ROMÁNTICO */}
            <div className="monitor-inferior">
              {pistaEncontrada ? (
                <div className="pista-descubierta">
                  <span className="pista-corazon">
                    ♥
                  </span>

                  <p className="pista-texto">
                    {camara.pista}
                  </p>

                  <small>
                    FRAGMENTO {camara.id} ENCONTRADO
                  </small>
                </div>
              ) : (
                <button
                  type="button"
                  className="buscar-pista"
                  onClick={encontrarPista}
                >
                  ♥ DESCUBRIR FRAGMENTO
                </button>
              )}
            </div>
          </div>

          {/* SELECTOR DE CÁMARAS */}
          <div className="selector-camaras">
            {camaras.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={
                  camaraActual === index
                    ? "camara-boton activa"
                    : "camara-boton"
                }
                onClick={() =>
                  seleccionarCamara(index)
                }
              >
                {item.nombre}
                {pistasEncontradas.includes(item.id)
                  ? " ♥"
                  : ""}
              </button>
            ))}
          </div>

          {/* ESTADO DE ENERGÍA */}
          <div className="estado-noche">
            <span>ENERGÍA: 100%</span>
          </div>

          {/* CORAZONES DE PROGRESO */}
          <div className="progreso-pistas">
            {camaras.map((item) => (
              <span
                key={item.id}
                className={
                  pistasEncontradas.includes(item.id)
                    ? "pista-indicador encontrada"
                    : "pista-indicador"
                }
              >
                {pistasEncontradas.includes(item.id)
                  ? "♥"
                  : "?"}
              </span>
            ))}
          </div>

          {/* DESBLOQUEAR MENSAJE */}
          {todasEncontradas && (
            <div className="mensaje-desbloqueado">
              <p>
                ♥ ¡HAS ENCONTRADO LOS TRES FRAGMENTOS! ♥
              </p>

              <button
                type="button"
                className="completar-noche"
                onClick={() => setMostrarFinal(true)}
              >
                ★ REVELAR MENSAJE SECRETO
              </button>
            </div>
          )}
        </div>
      ) : (
        /* PANTALLA FINAL */
        <div className="noche1-final">
          <p className="etiqueta-final">
            ★ 6:00 A. M. ★
          </p>

          <h2>¡NOCHE COMPLETADA!</h2>

          <div className="noche1-corazon">
            ♥
          </div>

          <h3>UN MENSAJE PARA CARLOS ♡</h3>

          <div className="carta-secreta-noche">
            <p className="frase-final">
              "{fraseFinal}"
            </p>
          </div>

          <p className="dedicatoria-noche">
            Y si tuviera que vivir mil noches más,
            en cada una de ellas volvería a elegirte.
          </p>

          <strong className="te-amo-noche">
            TE AMO ♡
          </strong>

          <button
            type="button"
            className="completar-noche"
            onClick={onCompletar}
          >
            ♥ CONTINUAR NUESTRA AVENTURA
          </button>
        </div>
      )}

      {/* VOLVER AL MENÚ */}
      <button
        type="button"
        className="noche1-volver"
        onClick={onVolver}
      >
        ← VOLVER AL MENÚ
      </button>
    </section>
  );
}
