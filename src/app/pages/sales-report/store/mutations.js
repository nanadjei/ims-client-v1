/** Set sales report data */
export const SET_SALES_REPORT = (state, payload) => {
    return (state.sales_report = payload);
};

export const SET_QUERYING_SALES_REPORT = (state, payload) => {
    return (state.querying_sales_report = payload);
};
