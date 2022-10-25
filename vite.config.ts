// noinspection JSUnusedGlobalSymbols
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import electron from 'vite-electron-plugin'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from "vite"

export default defineConfig({
    build: {
        outDir: "dist-app",
        assetsDir: "static",
        sourcemap: true,
    },
    server: {
        host: "127.0.0.1",
        port: 8086
    },
    preview: {
        host: "0.0.0.0",
        port:  8080
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    video: ['src', 'poster'],
                    source: ['src'],
                    img: ['src'],
                    image: ['xlink:href', 'href'],
                    use: ['xlink:href', 'href']
                }
            }
        }),
        vueJsx(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        electron({
            include: [
                // The Electron source codes directory
                'electron',
            ],
        }),
    ],
})
