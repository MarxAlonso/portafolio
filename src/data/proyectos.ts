export interface Proyecto {
  nombre: string;
  /** lo que se lee en la barra de direcciones de la tarjeta */
  dominio: string;
  url: string;
  imagen: string;
  descripcion: string;
  tags: string[];
}

/** Sitios en producción que desarrollé. Las capturas viven en /public/projects. */
export const WEBS: Proyecto[] = [
  {
    nombre: 'Excelsius',
    dominio: 'excelsius.biz',
    url: 'https://www.excelsius.biz/',
    imagen: '/projects/web-excelsius.webp',
    descripcion:
      'Sitio institucional de una empresa de software a medida y cursos en vivo: hero dibujado en canvas, blog y catálogo de cursos.',
    tags: ['Astro', 'TypeScript', 'Canvas', 'SEO'],
  },
  {
    nombre: 'BeSocial Marketing',
    dominio: 'besocial-marketing.com',
    url: 'https://besocial-marketing.com/',
    imagen: '/projects/web-besocial.webp',
    descripcion:
      'Web de una agencia de marketing digital con alcance en Perú, USA y LATAM. Multiidioma, tema claro/oscuro y blog.',
    tags: ['Astro', 'i18n', 'Blog'],
  },
  {
    nombre: 'Ducas Import',
    dominio: 'ducasimport.pe',
    url: 'https://ducasimport.pe/',
    imagen: '/projects/web-ducasimport.webp',
    descripcion:
      'Tienda online de skincare coreano: catálogo por marcas, carrito, cuentas de usuario y canal para mayoristas.',
    tags: ['Next.js', 'E-commerce', 'React'],
  },
  {
    nombre: 'Operación Fortuna',
    dominio: 'carlosampuero.pe',
    url: 'https://carlosampuero.pe/',
    imagen: '/projects/web-carlosampuero.webp',
    descripcion:
      'Plataforma de sorteos por suscripción con Carlos Ampuero: rangos, registro e inicio de sesión de usuarios.',
    tags: ['Next.js', 'React', 'Suscripciones'],
  },
  {
    nombre: 'HomeHelp Salud',
    dominio: 'homehelp.com.pe',
    url: 'https://homehelp.com.pe/',
    imagen: '/projects/web-homehelp.webp',
    descripcion:
      'Servicios de salud a domicilio en Lima: enfermería, cuidado de adulto mayor y alquiler de equipos médicos.',
    tags: ['Next.js', 'React', 'Blog'],
  },
  {
    nombre: 'Carnicentro Marcelo',
    dominio: 'carnicentromarcelo.com',
    url: 'https://carnicentromarcelo.com/',
    imagen: '/projects/web-carnicentro.webp',
    descripcion:
      'Carnicería en Lima con delivery: catálogo de cortes de res y cerdo con precio por kilo, pedidos por WhatsApp y blog.',
    tags: ['Next.js', 'React', 'Catálogo'],
  },
  {
    nombre: 'Chipana Real Estate',
    dominio: 'chipanarealestate.com',
    url: 'https://www.chipanarealestate.com/',
    imagen: '/projects/web-chipanarealestate.webp',
    descripcion:
      'Sitio bilingüe de un agente inmobiliario en Georgia, USA: listado de propiedades, blog y contacto por WhatsApp.',
    tags: ['Next.js', 'i18n', 'Inmobiliaria'],
  },
];

/** Sistemas y proyectos anteriores; cada uno abre su página de detalle. */
export const SISTEMAS: Proyecto[] = [
  {
    nombre: 'Torito Grill',
    dominio: 'caso/torito-grill',
    url: '/ToritoGrill',
    imagen: '/projects/torito-grill.webp',
    descripcion: 'Página web del restaurante Torito Grill, con chatbot integrado.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    nombre: 'AventuraGym',
    dominio: 'caso/aventuragym',
    url: '/AventuraGym',
    imagen: '/projects/aventuragymbd.webp',
    descripcion: 'Página web de la empresa AventuraGym, con base de datos propia.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
  },
  {
    nombre: 'IBSeguros',
    dominio: 'caso/ibseguros',
    url: '/IBSeguros',
    imagen: '/projects/ibseguros.webp',
    descripcion: 'Página web de la empresa IBSeguros, de CorpIBGroup.',
    tags: ['PHP', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    nombre: 'IBContrata',
    dominio: 'caso/ibcontrata',
    url: '/IBContrata',
    imagen: '/projects/ibcontrata.webp',
    descripcion: 'Plataforma IBContrata de CorpIBGroup, migrada de Laravel 7 a Laravel 10.',
    tags: ['Laravel', 'PHP', 'Bootstrap', 'JavaScript'],
  },
  {
    nombre: 'Gimnasio Gym Bros',
    dominio: 'caso/gym-bros',
    url: '/Gimnasio',
    imagen: '/projects/gymbros1.webp',
    descripcion: 'Sistema de escritorio para la gestión de un gimnasio.',
    tags: ['Java', 'MySQL', 'Escritorio'],
  },
  {
    nombre: 'Biblioteca BookWise',
    dominio: 'caso/bookwise',
    url: '/BookWize',
    imagen: '/projects/proyecto1.webp',
    descripcion: 'Sistema de escritorio para la gestión de una biblioteca.',
    tags: ['Java', 'MySQL', 'Escritorio'],
  },
];
