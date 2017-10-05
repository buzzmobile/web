export default ({ env, store }) => {
    store.dispatch("setEnvFromMiddlewareAction", env);
    console.log(env); //eslint-disable-line no-console
};
