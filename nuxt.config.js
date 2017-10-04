module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: "mopho - homepage",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Nuxt.js project" },
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
    css: ["assets/styles/style.css"],
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#3B8070" },
    env: {
        baseApiUrl: process.env.baseApiUrl || "https://buzzmobile-pr-1.herokuapp.com/api/"
    },
    router: {
        middleware: ["setEnv"]
    },
    /*
     ** Build configuration
     */
    build: {
        vendor: ["axios"],
        /*
         ** Run ESLINT on save
         */
        extend (config, ctx) {
            if (ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
                if (ctx.dev) {
                    config.devtool = "eval-source-map";
                }
            }
        }
    }
};
