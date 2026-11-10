
const BASE = import.meta.env.BASE_URL;

export function rutaPublica(archivo: string): string {
  return `${BASE}${archivo.replace(/^\/+/, "")}`;
}

export const IMAGENES = {
  // FONDOS
  fondoMenu: rutaPublica(
    "imagenes/fondos/fondo-menu.png"
  ),
  cumpleanosFnaf: rutaPublica(
    "imagenes/fondos/cumpleanos-fnaf.png"
  ),

  // PERSONAJES
  chicaPastel: rutaPublica(
    "imagenes/personajes/chicapastel.png"
  ),
  chica: rutaPublica(
    "imagenes/personajes/chica.png"
  ),
  freddy: rutaPublica(
    "imagenes/personajes/freddy.png"
  ),
  bonnie: rutaPublica(
    "imagenes/personajes/bonnie.png"
  ),
  foxy: rutaPublica(
    "imagenes/personajes/foxy.png"
  ),
  bonnieOscuro: rutaPublica(
    "imagenes/personajes/Bonnieoscuro.png"
  ),
  fredd: rutaPublica(
    "imagenes/personajes/FREDD.png"
  ),
  nuestraIlustracion: rutaPublica(
    "imagenes/personajes/nuestra-ilustracion.png"
  ),

  // ESCENARIOS
  escenarioFreddy: rutaPublica(
    "imagenes/escenarios/escenario-freddy.jpg"
  ),
  pasilloBonnie: rutaPublica(
    "imagenes/escenarios/pasillo-bonnie.jpg"
  ),
  cocinaChica: rutaPublica(
    "imagenes/escenarios/cocina-chica.jpg"
  ),
};

export const VIDEOS = {
  nuestraHistoria: rutaPublica(
    "videos/nuestra-historia.mp4"
  ),
};

export const MUSICA = {
  fondoFnaf: rutaPublica(
    "musica/fondo-fnaf.mp4"
  ),
};
