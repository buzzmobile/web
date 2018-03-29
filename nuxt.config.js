const pkg = require("./package");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

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
    ],
    icon: {
        sizes: [16, 48, 72, 96, 120, 144, 152, 180, 192, 512, 120, 144, 152, 192, 384, 512, 1024]
    },
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.baseApiUrl || "http://localhost:7778/api/",
        credentials: false
    },
    env: {
        dealRedirectTimeoutMs: process.env.dealRedirectTimeoutMs || isProd ? 3000 : 500
    },
    css: [
        "@/assets/styles/tailwind.css"
    ],
    build: {
        extractCSS: true,
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
            if (!ctx.isDev) {
                config.plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([
                            path.join(__dirname, "./pages/**/*.vue"),
                            path.join(__dirname, "./layouts/**/*.vue"),
                            path.join(__dirname, "./components/**/*.vue")
                        ]),
                        extractors: [
                            {
                                extractor: class {
                                    static extract(content) {
                                        return content.match(/[A-z0-9-:/]+/g) || [];
                                    }
                                },
                                extensions: ["vue"],
                            }
                        ],
                        whitelistPatterns: [/bg-s9-/, /bg-iphone-/],
                        whitelist: ["html", "body", "nuxt-loading"]
                    })
                );
            }
        }
    }
};
