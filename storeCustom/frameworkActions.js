export default {
    setRouterFromMountAction ({ commit }, router) {
        commit("setRouterFromMountMutation", router);
    },
    setEnvFromMiddlewareAction ({ commit }, env) {
        commit("setEnvFromMiddlewareMutation", env);
    }
};
