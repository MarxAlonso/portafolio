import { defineConfig } from 'astro/config';

// https://astro.build/config
// Sitio 100% estático: el mismo `dist/` se despliega en Netlify y en Cloudflare sin adaptadores.
export default defineConfig({
  output: 'static',
});
