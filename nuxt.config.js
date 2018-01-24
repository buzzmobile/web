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
            { src: "https://use.fontawesome.com/9a080b10fd.js" },
            { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" },
            { src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" }
        ]
    },
    loading: { color: "#3B8070" },
    router: {
        middleware: ["setEnv"]
    },
    css: [
        "assets/styles/style.css"
    ],
    plugins: [
    ],
    workbox: {
        importScripts: [
            "serviceWorker.js"
        ],
    },
    modules: [
        "@nuxtjs/pwa",
        // Doc: https://github.com/nuxt-community/axios-module#usage
        "@nuxtjs/axios"//,
    // Doc: https://bootstrap-vue.js.org/docs/
    //"bootstrap-vue/nuxt"
    ],
    env: {
        baseApiUrl: process.env.baseApiUrl || "http://localhost:7778/api/",
        DEBUG: true
    },
    axios: {
    // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.baseApiUrl || "http://localhost:7778/api/"
    },
    build: {
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
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
