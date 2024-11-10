import { defineNuxtConfig } from 'nuxt/config'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
    srcDir: 'src/',
    css: ['~/assets/scss/main.scss'],
    modules: [
        '@vueuse/nuxt',
        '@nuxt/image',
        'vuetify-nuxt-module',
        '@nuxt/eslint',
        'nuxt-particles',
        'vite-svg-loader',
    ],
    vuetify: {
        moduleOptions: {
            includeTransformAssetsUrls: {
                'v-card': [
                    'image',
                    'prepend-avatar',
                    'append-avatar',
                ],
            },
            ssrClientHints: {
                reloadOnFirstRequest: false,
                prefersColorScheme: true,
                prefersColorSchemeOptions: {
                    useBrowserThemeOnly: false,
                },
                viewportSize: true,
            },
            // styles: { configFile: 'assets/custom-vuetify.scss' },
        },
    },
    particles: {
        mode: 'slim', // 'full' | 'slim' | 'basic' | 'custom'
    },

    vite: {
        clearScreen: false,
        build: {
            target: 'esnext',
        },
        vue: {
            script: {
                propsDestructure: true,
            },
        },
        plugins: [svgLoader()],
    },
    app: {
        baseURL: '/',
        head: {
            meta: [{ charset: 'utf-8' }],
        },
    },
    components: {
        dirs: [
            {
                path: '~/components',
                global: true,
                pathPrefix: false,
            },
        ],
    },
})
