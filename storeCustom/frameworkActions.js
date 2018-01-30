export default {
    setEnvFromMiddlewareAction ({ commit }, env) {
        commit("setEnvFromMiddlewareMutation", env);
    }
};
