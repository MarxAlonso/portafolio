/**
 * Hero del inicio: la pila full-stack.
 *
 * El stack se dibuja como tres capas isométricas —frontend, backend y datos—
 * con una ficha por tecnología. Aquí vive lo que se mueve:
 *   · la pila sigue al puntero con inercia y se mece sola;
 *   · una ficha se enciende cada cierto tiempo (o al pasar el puntero) y la
 *     lectura de al lado dice qué es;
 *   · la portada rota sus láminas y cada una resalta su capa.
 */

const menosMovimiento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   Reloj de Lima
   ============================================================ */
function reloj(): () => void {
  const campo = document.querySelector<HTMLElement>('[data-lectura="hora"]');
  if (!campo) return () => {};

  const formato = new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const pintar = () => {
    campo.textContent = formato.format(new Date());
  };

  pintar();
  const id = window.setInterval(pintar, 1000);
  return () => window.clearInterval(id);
}

/* ============================================================
   Pila isométrica
   ============================================================ */

/** Cada cuánto se enciende sola una ficha. */
const RITMO_FICHA = 1700;

function pila(area: HTMLElement, capaActiva: () => string): () => void {
  const raiz = area.querySelector<HTMLElement>('[data-pila]');
  const escena = raiz?.querySelector<HTMLElement>('[data-escena]');
  if (!raiz || !escena) return () => {};

  const fichas = [...raiz.querySelectorAll<HTMLElement>('[data-ficha]')];
  const lectura = {
    nombre: area.querySelector<HTMLElement>('[data-foco="nombre"]'),
    capa: area.querySelector<HTMLElement>('[data-foco="capa"]'),
    nota: area.querySelector<HTMLElement>('[data-foco="nota"]'),
    caja: area.querySelector<HTMLElement>('[data-foco]')?.closest<HTMLElement>('.pila__lectura'),
  };
  const reduce = menosMovimiento();

  let encendida: HTMLElement | null = null;
  const encender = (ficha: HTMLElement) => {
    if (ficha === encendida) return;
    encendida?.removeAttribute('data-on');
    encendida = ficha;
    ficha.toggleAttribute('data-on', true);
    if (lectura.nombre) lectura.nombre.textContent = ficha.dataset.nombre ?? '';
    if (lectura.capa) lectura.capa.textContent = ficha.dataset.capaNombre ?? '';
    if (lectura.nota) lectura.nota.textContent = ficha.dataset.nota ?? '';
    lectura.caja?.style.setProperty('--tinte', ficha.style.getPropertyValue('--tinte'));
  };

  // el puntero manda mientras está sobre una ficha; si no, se encienden solas
  let conPuntero = false;
  const alAzar = () => {
    if (conPuntero || document.hidden) return;
    const capa = capaActiva();
    const candidatas = fichas.filter((f) => f !== encendida && (!capa || f.dataset.capa === capa));
    if (candidatas.length) encender(candidatas[Math.floor(Math.random() * candidatas.length)]);
  };

  const onOver = (e: Event) => {
    const ficha = (e.target as HTMLElement).closest<HTMLElement>('[data-ficha]');
    if (!ficha) return;
    conPuntero = true;
    encender(ficha);
  };
  const onLeave = () => {
    conPuntero = false;
  };
  raiz.addEventListener('pointerover', onOver);
  raiz.addEventListener('focusin', onOver);
  raiz.addEventListener('pointerleave', onLeave);

  if (fichas.length) encender(fichas[0]);
  const idFicha = reduce ? 0 : window.setInterval(alAzar, RITMO_FICHA);

  // inclinación: el puntero empuja la pila y ex/ey lo siguen con inercia
  let mx = 0;
  let my = 0;
  let ex = 0;
  let ey = 0;
  let raf = 0;

  const punteroFino = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const onMove = (e: MouseEvent) => {
    const r = area.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - 0.5;
    my = (e.clientY - r.top) / r.height - 0.5;
  };
  const onOut = () => {
    mx = 0;
    my = 0;
  };

  const frame = (t: number) => {
    ex += (mx - ex) * 0.05;
    ey += (my - ey) * 0.05;
    // se mece sola unos grados, como si flotara
    const vaiven = Math.sin(t / 3800) * 3;
    escena.style.setProperty('--giro', `${(ex * 18 + vaiven).toFixed(2)}deg`);
    escena.style.setProperty('--inclinacion', `${(-ey * 8).toFixed(2)}deg`);
    escena.style.setProperty('--flote', `${(Math.sin(t / 2600) * 8).toFixed(2)}px`);
    raf = requestAnimationFrame(frame);
  };

  if (!reduce) {
    if (punteroFino) {
      area.addEventListener('mousemove', onMove);
      area.addEventListener('mouseleave', onOut);
    }
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    window.clearInterval(idFicha);
    raiz.removeEventListener('pointerover', onOver);
    raiz.removeEventListener('focusin', onOver);
    raiz.removeEventListener('pointerleave', onLeave);
    area.removeEventListener('mousemove', onMove);
    area.removeEventListener('mouseleave', onOut);
  };
}

/* ============================================================
   Portada rotativa
   ============================================================ */

/** Tiempo que cada lámina queda en pantalla. */
const DURACION_LAMINA = 7000;

/**
 * Rota las láminas del texto del hero. El reloj es la barra de avance del paso
 * activo: al terminar su animación CSS se pasa a la siguiente, así que pausar
 * la barra (hover, foco o pestaña oculta) pausa también la rotación.
 */
function portada(raiz: HTMLElement, alCambiar: (i: number) => void): () => void {
  const contenedor = raiz.querySelector<HTMLElement>('.hero__laminas');
  const laminas = [...raiz.querySelectorAll<HTMLElement>('[data-lamina]')];
  const pasos = [...raiz.querySelectorAll<HTMLButtonElement>('[data-paso]')];
  if (!contenedor || laminas.length < 2) return () => {};

  const auto = !menosMovimiento();
  let actual = 0;

  raiz.style.setProperty('--duracion', `${DURACION_LAMINA}ms`);
  if (auto) raiz.toggleAttribute('data-auto', true);

  const mostrar = (i: number) => {
    if (i === actual) return;
    // la primera lámina entra con animaciones de carga: se retiran para que,
    // de aquí en adelante, todas entren y salgan por transición
    if (!contenedor.hasAttribute('data-rotando')) {
      laminas[0]
        .querySelectorAll('.anim-rise, .anim-fade')
        .forEach((el) => el.classList.remove('anim-rise', 'anim-fade'));
      contenedor.toggleAttribute('data-rotando', true);
    }
    actual = i;
    alCambiar(i);
    laminas.forEach((lamina, j) => {
      const activa = j === i;
      lamina.toggleAttribute('data-activa', activa);
      lamina.toggleAttribute('inert', !activa);
      if (activa) lamina.removeAttribute('aria-hidden');
      else lamina.setAttribute('aria-hidden', 'true');
    });
    pasos.forEach((paso, j) => {
      if (j === i) paso.setAttribute('aria-current', 'true');
      else paso.removeAttribute('aria-current');
    });
  };

  const onClick = (e: Event) => {
    const paso = (e.target as HTMLElement).closest<HTMLElement>('[data-paso]');
    if (paso) mostrar(Number(paso.dataset.paso));
  };
  const onFin = (e: AnimationEvent) => {
    // solo cuenta la barra del paso activo, no las entradas del titular
    if ((e.target as Element).matches('.hero__paso[aria-current] i')) {
      mostrar((actual + 1) % laminas.length);
    }
  };
  const pausar = () => raiz.toggleAttribute('data-pausa', true);
  const seguir = () => {
    if (!raiz.matches(':hover, :focus-within') && !document.hidden) {
      raiz.removeAttribute('data-pausa');
    }
  };
  const onVisibilidad = () => (document.hidden ? pausar() : seguir());

  raiz.addEventListener('click', onClick);
  if (auto) {
    raiz.addEventListener('animationend', onFin);
    raiz.addEventListener('pointerenter', pausar);
    raiz.addEventListener('pointerleave', seguir);
    raiz.addEventListener('focusin', pausar);
    raiz.addEventListener('focusout', () => requestAnimationFrame(seguir));
    document.addEventListener('visibilitychange', onVisibilidad);
  }

  return () => {
    raiz.removeEventListener('click', onClick);
    raiz.removeEventListener('animationend', onFin);
    document.removeEventListener('visibilitychange', onVisibilidad);
  };
}

/** Arranca el hero si sus elementos existen en la página. */
export function iniciarHero(): void {
  const area = document.getElementById('hero');
  if (!area) return;

  const pararReloj = reloj();
  const pararPila = pila(area, () => area.dataset.capa ?? '');
  const elPortada = area.querySelector<HTMLElement>('[data-portada]');
  const pararPortada = elPortada
    ? portada(elPortada, (i) => {
        area.dataset.tono = String(i);
        // cada lámina declara la capa de la pila que resalta (ninguna = todas)
        const lamina = elPortada.querySelectorAll<HTMLElement>('[data-lamina]')[i];
        area.dataset.capa = lamina?.dataset.capa ?? '';
      })
    : () => {};

  window.addEventListener('pagehide', () => {
    pararReloj();
    pararPila();
    pararPortada();
  });
}
