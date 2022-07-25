

/** Set sales report data */
export const SET_PRODUCTS = (state, payload) => {
    return (state.products = payload);
};

export const SET_FETCH_PRODUCTS_LOADING = (state, payload) => {
    return (state.fetch_products_loading = payload);
};

export const SET_TOTAL_PAGES = (state, payload) => {
    return (state.total_pages = payload);
};

export const SET_PRODUCT_IN_CONTEXT = (state, payload) => {
    return (state.product_in_context = payload);
};

/** Loader for when an product is been updated */
export const SET_PROD_MODAL_IS_BUSY = (state, payload) => {
    return (state.prod_modal_is_busy = payload);
};

export const SET_PROD_MODAL_IN_EDIT_MODE = (state, payload) => {
    return (state.prod_modal_in_edit_mode = payload);
};

export const SET_STOCK_SUM_TOTAL_IS_BUSY = (state, payload) => state.stock_sum_total_is_busy = payload;

export const SET_STOCK_SUM_TOTAL = (state, payload) => state.stock_sum_total = payload;
