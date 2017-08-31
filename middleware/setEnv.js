export default ({ env, store }) => {
    store.dispatch("setEnvFromMiddlewareAction", env);
};
