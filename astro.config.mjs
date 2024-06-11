import { defineConfig } from 'astro/config';

export default defineConfig({
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
  },
  vite: {
    ssr: {
      noExternal: ['@apollo/client', 'graphql'],
    },
  },
 output: 'hybrid'  });
