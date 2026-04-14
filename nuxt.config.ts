import { hash } from "ohash";
import { md3 } from "vuetify/blueprints";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-21",
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      link: [
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  ssr: true,
  routeRules: {
    "/**": { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  modules: [
    "@nuxt/fonts",
    "vuetify-nuxt-module",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/content",
    "nuxt-og-image",
  ],

  vuetify: {
    moduleOptions: {
      styles: { configFile: "assets/styles/settings.scss" },

      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: true,
        prefersReducedMotion: true,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },
    },
    vuetifyOptions: {
      blueprint: md3,
      theme: {
        // default 'system' requires `ssr: false` to avoid hydration warnings
        defaultTheme: "dark",

        themes: {
          light: {},
          dark: {},
        },
      },
      defaults: {
        VCard: {
          rounded: "lg",
        },
        VBtn: {
          rounded: "lg",
        },
      },
    },
  },

  fonts: {
    families: [{ name: "Noto Sans SC", provider: "google", global: true }],
  },

  ogImage: {
    fontSubsets: ["latin", "chinese-simplified"],
    zeroRuntime: true,
  },

  site: {
    url: "https://reviews.0x7f.cc",
  },

  eslint: {
    config: {
      import: {
        package: "eslint-plugin-import-lite",
      },
    },
  },
});
