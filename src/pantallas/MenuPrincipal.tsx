
import { useState } from "react";
import { IMAGENES } from "../config/rutas";
import "../estilos/menu.css";

import Noche1 from "./Noche1";
import NuestraAventura from "./NuestraAventura";
import SorpresaFinal from "./SorpresaFinal";

type Pantalla =
  | "menu"
  | "inicio"
  | "aventura"
  | "playlist"
  | "carta"
  | "sorpresa";

const spotifyPlaylist =
  "https://open.spotify.com/embed/playlist/7513ZQZEax0iRPByCvAVkR";

export default function MenuPrincipal() {
  const [pantalla, setPantalla] =
    useState<Pantalla>("menu");

  const [cartaAbierta, setCartaAbierta] =
    useState(false);

  function cambiarPantalla(destino: Pantalla) {
    setPantalla(destino);
    setCartaAbierta(false);
  }

  // NOCHE 1
  if (pantalla === "inicio") {
    return (
      <Noche1
        onVolver={() => cambiarPantalla("menu")}
        onCompletar={() => cambiarPantalla("aventura")}
      />
    );
  }

  // NUESTRA AVENTURA
  if (pantalla === "aventura") {
    return (
      <NuestraAventura
        onVolver={() => cambiarPantalla("menu")}
        onContinuar={() => cambiarPantalla("playlist")}
      />
    );
  }

  // SORPRESA FINAL
  if (pantalla === "sorpresa") {
    return (
      <SorpresaFinal
        onVolver={() => cambiarPantalla("menu")}
      />
    );
  }

  return (
    <main
      className="juego"
      style={{
        backgroundImage: `url("${IMAGENES.fondoMenu}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* EFECTO DE ESTÁTICA */}
      <div
        className="estatica"
        aria-hidden="true"
      />

      {pantalla === "menu" ? (
        <section className="menu-principal">
          <div className="informacion">
            <span>● GRABANDO</span>
            <span>12:00 A. M.</span>
          </div>

          <div className="contenido-menu">
            {/* CHICA PASTEL */}
            <div className="personajes">
              <img
                src={IMAGENES.chicaPastel}
                alt="Chica Pastel"
                className="chica-inicio"
              />
            </div>

            {/* TÍTULO Y BOTONES */}
            <div className="contenido-derecho">
              <div className="titulo">
                <p>
                  ★ UNA SORPRESA PARA MI AMOR ★
                </p>

                <h1>
                  FIVE NIGHTS OF LOVE
                </h1>

                <span>
                  Cinco secretos, una historia de amor...
                </span>
              </div>

              <nav
                className="botones"
                aria-label="Menú principal"
              >
                <button
                  type="button"
                  onClick={() =>
                    cambiarPantalla("inicio")
                  }
                >
                  ▶ INICIAR PARTIDA
                </button>

                <button
                  type="button"
                  onClick={() =>
                    cambiarPantalla("aventura")
                  }
                >
                  ♥ NUESTRA AVENTURA
                </button>

                <button
                  type="button"
                  onClick={() =>
                    cambiarPantalla("playlist")
                  }
                >
                  ♫ NUESTRA PLAYLIST
                </button>

                <button
                  type="button"
                  onClick={() =>
                    cambiarPantalla("carta")
                  }
                >
                  ✉ UNA CARTA PARA TI
                </button>

                <button
                  type="button"
                  onClick={() =>
                    cambiarPantalla("sorpresa")
                  }
                >
                  ★ SORPRESA FINAL
                </button>
              </nav>
            </div>
          </div>

          <p className="pie">
            UNA AVENTURA CREADA CON AMOR PARA CARLOS ♡
          </p>
        </section>
      ) : (
        <section className="pantalla-secundaria">
          <div className="informacion informacion-interior">
            <span>● GRABANDO</span>
            <span>12:00 A. M.</span>
          </div>

          {/* NUESTRA PLAYLIST */}
          {pantalla === "playlist" && (
            <div className="seccion-contenido spotify-seccion">
              <p className="etiqueta">
                ♫ NUESTRAS CANCIONES ESPECIALES ♫
              </p>

              <h2>NUESTRA PLAYLIST</h2>

              <p className="spotify-dedicatoria">
                Carlos, hay canciones que cuentan
                historias, y estas guardan pequeños
                pedacitos de la nuestra. Cada melodía
                me recuerda lo bonito que es compartir
                mi vida contigo. ♡
              </p>

              <div className="spotify-marco">
                <div className="spotify-encabezado">
                  <span>
                    ♥ NUESTRA MÚSICA ♥
                  </span>

                  <span>
                    ♫ LOVE SONGS ♫
                  </span>
                </div>

                <iframe
                  title="Nuestra playlist de Spotify"
                  src={spotifyPlaylist}
                  width="100%"
                  height="420"
                  style={{
                    border: 0,
                    borderRadius: "12px",
                  }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />

                <p className="spotify-pie">
                  ♥ CADA CANCIÓN, UN RECUERDO CONTIGO ♥
                </p>
              </div>

              <p className="spotify-mensaje">
                Si nuestra historia tuviera una banda
                sonora, estas serían algunas de
                sus canciones. ♡
              </p>

              <button
                type="button"
                className="boton-especial"
                onClick={() =>
                  cambiarPantalla("carta")
                }
              >
                ✉ CONTINUAR A LA CARTA
              </button>
            </div>
          )}

          {/* UNA CARTA PARA TI */}
          {pantalla === "carta" && (
            <div className="seccion-contenido carta-seccion">
              <p className="etiqueta">
                ✉ UN MENSAJE ESPECIAL PARA TI ✉
              </p>

              <h2>UNA CARTA PARA TI</h2>

              {!cartaAbierta ? (
                <div className="carta-presentacion">
                  {/* LADO IZQUIERDO: SOBRE */}
                  <div className="sobre-contenedor">
                    <p className="carta-invitacion">
                      Carlos, hay algo que quiero decirte...
                      Lo escribí con todo mi corazón. ♡
                    </p>

                    <button
                      type="button"
                      className="sobre"
                      onClick={() =>
                        setCartaAbierta(true)
                      }
                      aria-label="Abrir carta de cumpleaños"
                    >
                      <span>✉</span>

                      <small>
                        ♥ HAZ CLIC PARA ABRIR ♥
                      </small>
                    </button>
                  </div>

                  {/* LADO DERECHO: ILUSTRACIÓN */}
                  <div className="carta-ilustracion-lateral">
                    <img
                      src={IMAGENES.nuestraIlustracion}
                      alt="Nuestra ilustración con el cerdito rosa"
                      className="imagen-nuestra-carta"
                    />
                  </div>
                </div>
              ) : (
                <article className="carta-abierta carta-cumpleanos">
                  <div className="carta-decoracion">
                    ♥ ♡ ♥
                  </div>

                  <h3>
                    Feliz cumpleaños, mi amor hermosoooo,
                    mi Carlitos preciosooo. 🥹💜🎂🎉💕
                  </h3>

                  <div className="carta-texto">
                    <p>
                      mi amooor, hoy es un día súper especial
                      porque mi niño hermoso está cumpliendo
                      sus 22 añitoooos. 💗🥳 No sabes lo feliz
                      que me hace poder estar contigo en un día
                      tan bonito como hoy y poder celebrar un
                      añito más en tu vida. 🥹💞 Primero que
                      nada, quiero desearte un muy feliz
                      cumpleaños mi amor. Espero que hoy sea
                      un día lleno de muchísima felicidad,
                      amor, sonrisas, abrazitos, regalitos
                      y sobre todo que te sientas muy amado,
                      porque te mereces eso y muchísimas
                      cosas más, mi niño. 🥰💜
                    </p>

                    <p>
                      No sabes cuánto le agradezco a la vida
                      por haberte puesto en mi camino, mi amor 💕
                      De verdad que eres una de las cositas
                      más bonitas que me han pasado y me hace
                      tan feliz saber que tengo a alguien como
                      tú a mi lado. A veces me pongo a pensar
                      en cómo llegaste a mi vida y en cómo,
                      sin darme cuenta, te fuiste convirtiendo
                      en alguien tan importante para mí.
                      Y ahora no me imagino mis días sin tus
                      mensajes bonitos, sin tus ocurrencias,
                      sin tus besos, sin tus abrazos o tus
                      ataques de amor y sin todas esas cositas
                      que te hacen ser tú. 💗
                    </p>

                    <p>
                      Mi niño, quiero que sepas que te amo
                      muchísimoooo, pero muchísimo más de
                      lo que te imaginas. 🥺❤️ A veces siento
                      que no existen suficientes palabras
                      para explicarte todo lo que siento por
                      ti, porque de verdad eres demasiado
                      especial para mí. Amo tu carita hermosa,
                      tus ojitos, tu sonrisa tan bonita,
                      tu forma de reírte, tus ocurrencias,
                      tus abrazos amo cada cosita de ti,
                      incluso esas que a lo mejor tú no notas,
                      pero que para mí son demasiado bonitas.
                    </p>

                    <p>
                      Y es que tú no sabes lo mucho que me
                      encantas, mi niño precioso me encanta
                      verte sonreír, escucharte hablar de
                      las cosas que te gustan, verte emocionado
                      por algo y saber que estás feliz.
                      Me encanta poder compartir mis días
                      contigo, contarte mis cosas, escucharte
                      y sentir que tengo a mi lado a alguien
                      tan especial. 💞
                    </p>

                    <p>
                      Hoy que cumples tus 22 añitos quiero
                      desearte de todo corazón que la vida
                      te regale muchísimas cosas bonitas,
                      mi amor. 🥺💜 Que nunca te falte salud,
                      amor, felicidad, tranquilidad y
                      muchísimas bendiciones. 🙏🏻💕 Deseo
                      que todos esos sueños y metas que tienes
                      se te vayan cumpliendo poquito a poquito,
                      que todo tu esfuerzo valga la pena y
                      que nunca te rindas, aunque a veces
                      las cosas se pongan difíciles.
                    </p>

                    <p>
                      Quiero que sepas que estoy muy orgullosa
                      de ti, mi vida. 🥹❤️ Tal vez no te lo
                      digo todos los días, pero de verdad
                      admiro mucho la persona que eres y
                      todo lo que haces para salir adelante.
                      Sé que no siempre es fácil, que hay
                      días buenos y otros no tanto, que a
                      veces las cosas no salen como uno
                      quisiera, pero quiero que nunca olvides
                      lo capaz que eres de lograr todo lo
                      que te propongas. 🫶🏻💗
                    </p>

                    <p>
                      Y cuando tengas días difíciles, cuando
                      estés cansadito, triste o sientas que
                      ya no puedes, quiero que recuerdes
                      que aquí estoy yo, mi amor. 🥺💕
                      Para escucharte, apoyarte, darte
                      ánimos, abrazarte muy fuerte y
                      recordarte lo mucho que vales.
                      No quiero que nunca te sientas solo,
                      porque mientras estemos juntos quiero
                      que sepas que tienes a alguien que
                      te ama muchísimo y que siempre va
                      a querer verte bien. 🫂💜
                    </p>

                    <p>
                      También quiero agradecerte por todas
                      las cositas bonitas que has hecho por
                      mí, mi niño. 🥹💞 Gracias por tu cariño,
                      por tus abrazos, por tus besitos,
                      por hacerme reír, por escucharme,
                      por acompañarme y por todos esos
                      momentos que hemos compartido.
                      Gracias por ser mi novio y por dejarme
                      formar parte de tu vida. No sabes lo
                      bonito que se siente tenerte a mi lado
                      y poder decir que eres mi persona
                      favorita.💗
                    </p>

                    <p>
                      Amo todos nuestros momentos juntos,
                      desde los más especiales hasta los más
                      sencillitos. 🥰💕 Porque para mí no
                      necesitamos salir para pasarla bonito.
                      A veces basta con estar contigo en la
                      escuela o comer en la cafetería o en
                      donde sea, platicar de cualquier cosa,
                      reírnos de nuestras locuras, abrazarnos,
                      darnos besos o simplemente disfrutar
                      de estar juntitos. Esos momentitos son
                      los que guardo con muchísimo cariño
                      en mi corazón. Aunque para mí siempre
                      vas a ser mi bebé hermoso, mi niño
                      chiquito al que quiero consentir,
                      cuidar, abrazar y llenar de muchísimos
                      besitos me da mucha felicidad poder
                      ver a la persona en la que te has
                      convertido, te he visto madurar jeje 🤭
                      y pensar en todas las cosas bonitas
                      que todavía te faltan por vivir juntos
                      hasta que nos casemos y estemos viejitos
                      (si Dios quiere y ojalá si) me pone
                      muy feliz bb 🥺.
                    </p>

                    <p>
                      De verdad deseo que nunca pierdas esa
                      esencia tan bonita que tienes, mi cielo
                      que nunca dejes de sonreír, que sigas
                      siendo tú, que disfrutes muchísimo
                      tu vida y que nunca permitas que nadie
                      te haga sentir menos de lo que eres.
                      Porque tú vales muchísimo y mereces
                      que te pasen cosas muy, muy bonitas.
                      🫶🏻💗
                    </p>

                    <p>
                      No sabes lo mucho que deseo verte cumplir
                      cada uno de tus sueños bb 🥺 quiero
                      verte feliz, tranquilo, orgulloso de
                      ti mismo y haciendo todas esas cosas
                      que tanto quieres. Quiero poder celebrar
                      contigo cada logro, por más pequeñito
                      que sea, y decirte una y otra vez lo
                      orgullosa que estoy de ti. 🥰💜
                    </p>

                    <p className="carta-cierre">
                      Felices 22 añitoooos, mi amor hermosoooo.
                      🎉🎂💜
                    </p>

                    <p>
                      Ya estás más viejitoooo, mi niño pero
                      bien sabroso jajajajaja. 🥴🤭💕
                      Pero no importa cuántos años cumplas,
                      para mí siempre vas a ser mi bebé
                      precioso, mi Carlitos bonito,
                      mi niño consentido 🥹💞
                    </p>

                    <p className="carta-cierre">
                      Recuerda que eres mi mundo entero bb
                      TE AMOOOOOOO🥺🌏💓
                    </p>
                  </div>

                  <div className="carta-decoracion">
                    ♥ ♡ ♥
                  </div>

                  <button
                    type="button"
                    className="carta-cerrar"
                    onClick={() =>
                      setCartaAbierta(false)
                    }
                  >
                    ✉ CERRAR CARTA
                  </button>
                </article>
              )}

              {/* CONTINUAR A LA GALAXIA */}
              <button
                type="button"
                className="boton-especial"
                onClick={() =>
                  cambiarPantalla("sorpresa")
                }
              >
                🌌 DESCUBRIR NUESTRA GALAXIA DEL AMOR
              </button>
            </div>
          )}

          {/* REGRESAR AL MENÚ */}
          <button
            type="button"
            className="volver"
            onClick={() =>
              cambiarPantalla("menu")
            }
          >
            ← VOLVER AL MENÚ
          </button>
        </section>
      )}
    </main>
  );
}
