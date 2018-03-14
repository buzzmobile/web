const pkg = require("./package");

module.exports = {
    mode: "universal",
    // Headers of the page
    head: {
        title: pkg.name,
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: pkg.description },
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
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/axios",
        "nuxt-vuex-router-sync"
    ],
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
