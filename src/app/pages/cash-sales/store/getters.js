
/** Get customer login status froms state */
export const getCreatedAt = (state) => {
    return state.sales.created_at;
};

/** Get sale object */
export const getSalesObj = (state) => {
    return state.sales;
};

/** Get sale items */
export const getSaleItems = (state) => {
    return state.sales.items;
};

/** Get all products which was requested from the server */
export const getProducts = (state) => {
    return state.products;
};

