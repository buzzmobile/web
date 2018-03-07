export const state = () => ({
});
export const getters = {
};
export const actions = {
};
export const mutations = {
    dealsChangedMutation(state, { namespace, deals, dealsPerRow }) {
        const moduleState = state[namespace];
        moduleState.deals = deals;
        moduleState.dealsPerRow = dealsPerRow;
        const splitIntoRows = (state, deals, dealsPerRow) => {
            const dealRows = [];
            let dealColumn = [];
            for (let deal of deals) {
                dealColumn.push(deal);
                if (dealColumn.length === dealsPerRow) {
                    dealRows.push(dealColumn);
                    dealColumn = [];
                }
            }
            return dealRows;
        };
        moduleState.dealRows = splitIntoRows(state, deals, dealsPerRow);
    }
};


