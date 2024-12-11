// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/sanity"],
  css: ["@/assets/scss/main.scss"],
  components: [{ path: "~/components/", pathPrefix: false }],
  imports: {
    dirs: ["utils/**"],
  },
  sanity: {
    projectId: "xgw9in35",
    dataset: "production",
  },
  runtimeConfig: {
    public: {
      apiTrackingBaseUrl: process.env.NUCXT_PUBLIC_API_TRACKING_BASE_URL || "",
    },
  },

  vite: {
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
  },
});
