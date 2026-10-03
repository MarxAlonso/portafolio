import {
  siAngular,
  siAstro,
  siBootstrap,
  siCisco,
  siCloudflare,
  siCss,
  siDiscord,
  siEclipseide,
  siFastapi,
  siFigma,
  siGit,
  siGithub,
  siGo,
  siHtml5,
  siIntellijidea,
  siJavascript,
  siKotlin,
  siLaravel,
  siMysql,
  siNestjs,
  siNetlify,
  siNextdotjs,
  siNgrok,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
  siZoom,
  type SimpleIcon,
} from 'simple-icons';

export interface Tecnologia {
  nombre: string;
  nota: string;
  /** trazado SVG del logo (viewBox 0 0 24 24, salvo que se indique `caja`) */
  trazo: string;
  /** color de marca, aclarado si no se leería sobre fondo oscuro */
  color: string;
  /** viewBox del trazo cuando no es el de simple-icons */
  caja?: string;
}

export interface Capa {
  id: 'frontend' | 'backend' | 'datos';
  nombre: string;
  tinte: string;
  tecnologias: Tecnologia[];
}

export interface Herramienta extends Tecnologia {
  tipo: string;
  tinte: string;
}

/** Los logos muy oscuros (Next.js, GitHub…) se perderían sobre el fondo. */
function legible(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luz = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luz < 0.12) return '#e9edf7';
  if (luz > 0.42) return `#${hex}`;
  // tonos medios: se mezclan con blanco para ganar contraste
  const k = 0.38;
  const mezcla = [r, g, b].map((c) => Math.round(c + (255 - c) * k).toString(16).padStart(2, '0'));
  return `#${mezcla.join('')}`;
}

const tec = (icono: SimpleIcon, nombre: string, nota: string): Tecnologia => ({
  nombre,
  nota,
  trazo: icono.path,
  color: legible(icono.hex),
});

export const CAPAS: Capa[] = [
  {
    id: 'frontend',
    nombre: 'Frontend',
    tinte: '#a78bfa',
    tecnologias: [
      tec(siReact, 'React', 'Interfaces por componentes'),
      tec(siNextdotjs, 'Next.js', 'Apps full-stack con React'),
      tec(siAstro, 'Astro', 'Sitios rápidos y estáticos'),
      tec(siAngular, 'Angular', 'Aplicaciones empresariales'),
      tec(siTypescript, 'TypeScript', 'Tipado de punta a punta'),
      tec(siJavascript, 'JavaScript', 'El lenguaje de la web'),
      tec(siTailwindcss, 'Tailwind', 'Estilos utilitarios'),
      tec(siHtml5, 'HTML', 'Marcado semántico'),
      tec(siCss, 'CSS', 'Diseño y animación'),
    ],
  },
  {
    id: 'backend',
    nombre: 'Backend',
    tinte: '#4ade80',
    tecnologias: [
      tec(siNodedotjs, 'Node.js', 'Servidores en JavaScript'),
      tec(siNestjs, 'NestJS', 'APIs modulares'),
      tec(siPython, 'Python', 'Scripts y servicios'),
      tec(siFastapi, 'FastAPI', 'APIs rápidas en Python'),
      tec(siGo, 'Go', 'Servicios concurrentes'),
      tec(siOpenjdk, 'Java', 'Sistemas robustos'),
      tec(siSpringboot, 'Spring Boot', 'Backends en Java'),
      tec(siPhp, 'PHP', 'Web del lado del servidor'),
      tec(siLaravel, 'Laravel', 'Framework PHP completo'),
    ],
  },
  {
    id: 'datos',
    nombre: 'Datos y herramientas',
    tinte: '#ffb257',
    tecnologias: [
      tec(siPostgresql, 'PostgreSQL', 'Base de datos relacional'),
      tec(siMysql, 'MySQL', 'Base de datos relacional'),
      tec(siGit, 'Git', 'Control de versiones'),
      tec(siGithub, 'GitHub', 'Repositorios y colaboración'),
      tec(siWordpress, 'WordPress', 'Sitios con Elementor y Divi'),
      tec(siNetlify, 'Netlify', 'Despliegue continuo'),
      tec(siCloudflare, 'Cloudflare', 'Despliegue en el edge'),
      tec(siFigma, 'Figma', 'Diseño de interfaces'),
      tec(siPostman, 'Postman', 'Pruebas de APIs'),
    ],
  },
];

/** La pila del hero es de 3×3 por capa; la sección de stack admite una ficha más. */
const EXTRA: Record<Capa['id'], Tecnologia> = {
  frontend: tec(siBootstrap, 'Bootstrap', 'Maquetación con componentes'),
  backend: tec(siKotlin, 'Kotlin', 'Lenguaje moderno sobre la JVM'),
  datos: tec(siVercel, 'Vercel', 'Despliegue de frontends'),
};

export const STACK: Capa[] = CAPAS.map((capa) => ({
  ...capa,
  tecnologias: [...capa.tecnologias, EXTRA[capa.id]],
}));

const TIPOS = {
  editor: { tipo: 'Editor · IDE', tinte: '#5ed3ff' },
  versiones: { tipo: 'Versiones', tinte: '#ff8a65' },
  redes: { tipo: 'APIs · Redes', tinte: '#4ade80' },
  diseno: { tipo: 'Diseño', tinte: '#a78bfa' },
  equipo: { tipo: 'Comunicación', tinte: '#ffb257' },
};

const herramienta = (icono: SimpleIcon, nombre: string, nota: string, tipo: keyof typeof TIPOS): Herramienta => ({
  ...tec(icono, nombre, nota),
  ...TIPOS[tipo],
});

export const HERRAMIENTAS: Herramienta[] = [
  {
    // simple-icons ya no distribuye los logos de Microsoft
    nombre: 'Visual Studio Code',
    nota: 'Mi editor principal del día a día',
    trazo:
      'M180.828 252.605a15.872 15.872 0 0 0 12.65-.486l52.501-25.262a15.94 15.94 0 0 0 9.025-14.364V41.197a15.939 15.939 0 0 0-9.025-14.363l-52.5-25.263a15.877 15.877 0 0 0-18.115 3.084L74.857 96.35l-43.78-33.232a10.614 10.614 0 0 0-13.56.603L3.476 76.494c-4.63 4.211-4.635 11.495-.012 15.713l37.967 34.638-37.967 34.637c-4.623 4.219-4.618 11.502.012 15.714l14.041 12.772a10.614 10.614 0 0 0 13.56.604l43.78-33.233 100.507 91.695a15.853 15.853 0 0 0 5.464 3.571Zm10.464-183.649-76.262 57.889 76.262 57.888V68.956Z',
    caja: '0 0 256 254',
    color: '#3aa0f3',
    ...TIPOS.editor,
  },
  herramienta(siIntellijidea, 'IntelliJ IDEA', 'Backends en Java y Kotlin', 'editor'),
  herramienta(siEclipseide, 'Eclipse', 'Aplicaciones Java de escritorio', 'editor'),
  herramienta(siGit, 'Git', 'Ramas, commits y control de versiones', 'versiones'),
  herramienta(siPostman, 'Postman', 'Pruebas y documentación de APIs', 'redes'),
  herramienta(siNgrok, 'ngrok', 'Túneles para exponer localhost', 'redes'),
  herramienta(siCisco, 'Cisco Packet Tracer', 'Simulación y diseño de redes', 'redes'),
  herramienta(siFigma, 'Figma', 'Prototipos y diseño de interfaces', 'diseno'),
  herramienta(siDiscord, 'Discord', 'Coordinación con el equipo', 'equipo'),
  herramienta(siZoom, 'Zoom', 'Reuniones con clientes', 'equipo'),
];
