export const setDeals = (state, deals, dealsPerRow) => {
    state.deals = deals;
    state.dealsPerRow = dealsPerRow;
    state.dealRows = splitIntoRows(state, deals, dealsPerRow);
};

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