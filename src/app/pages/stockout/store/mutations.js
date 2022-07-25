export const SET_STOCKOUT_DATA = (state, payload) => {
    return (state.products = payload);
};

export const SET_TOTAL_PAGES = (state, payload) => {
    return (state.total_pages = payload);
};