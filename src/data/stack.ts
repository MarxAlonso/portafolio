import {
  siAngular,
  siAstro,
  siCloudflare,
  siCss,
  siFastapi,
  siFigma,
  siGit,
  siGithub,
  siGo,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siNestjs,
  siNetlify,
  siNextdotjs,
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
  siWordpress,
  type SimpleIcon,
} from 'simple-icons';

export interface Tecnologia {
  nombre: string;
  nota: string;
  /** trazado SVG del logo (viewBox 0 0 24 24) */
  trazo: string;
  /** color de marca, aclarado si no se leería sobre fondo oscuro */
  color: string;
}

export interface Capa {
  id: 'frontend' | 'backend' | 'datos';
  nombre: string;
  tinte: string;
  tecnologias: Tecnologia[];
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
