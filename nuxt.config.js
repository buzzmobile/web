const pkg = require("./package");

module.exports = {
    mode: "universal",
    // Headers of the page
    head: {
        title: "Mopho",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "http-equiv", content: "IE=edge" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ],
        script: [
        ]
    },
    loading: { color: "#cf1d69" },
    router: {
        middleware: ["https"]
    },
    css: [
        "@/assets/styles/tailwind.css"
    ],
    plugins: [
    ],
    workbox: {
        importScripts: [
            "serviceWorker.js"
        ],
    },
    modules: [
        // ["@nuxtjs/localtunnel", { subdomain: "buzzmobile" }], //https://buzzmobile.localtunnel.me/
        "@nuxtjs/pwa",
        "@nuxtjs/axios",
        "nuxt-vuex-router-sync",
        "@nuxtjs/sitemap",
        ["@nuxtjs/google-analytics", { id: "UA-116498889-1" }],
    ],
    icon: {
        sizes: [16, 48, 72, 96, 120, 144, 152, 180, 192, 512, 120, 144, 152, 192, 384, 512, 1024]
    },
    axios: {
    // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.baseApiUrl || "http://localhost:7778/api/",
        credentials: false
    },
    build: {
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.devtool = "source-map";
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
