export const setDeals = (state, deals, dealsPerRow) => {
    state.deals = deals;
    state.dealsPerRow = dealsPerRow;
    const dealRows = [];
    let dealColumn = [];
    for (let deal of state.deals) {
        dealColumn.push(deal);
        if (dealColumn.length === dealsPerRow) {
            dealRows.push(dealColumn);
            dealColumn = [];
        }
    }
    state.dealRows = dealRows;
};