// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/sanity'],
  css: ['@/assets/scss/main.scss'] ,
  components: [
    {path: '~/components/', pathPrefix: false}
  ],
  sanity: {
    projectId: "d5b7ce2c-25da-4286-9b1c-3166880f682b",
    dataset: "production",
  },
  vite:{
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/foundations/variables" as *;
            @use "@/assets/scss/foundations/functions" as *;
            @use "@/assets/scss/foundations/mixins" as *;
          `,
        },
      },
    },
  } 
})