export default {
    setRouterFromMountMutation (state, router) {
        state.router = router;
    },
    setEnvFromMiddlewareMutation (state, env) {
        state.env = env;
    }
};
