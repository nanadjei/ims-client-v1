
/** Get customer login status froms state */
export const getProducts = (state) => {
    return state.products;
};

export const getFetchProductsLoading = (state) => {
    return state.fetch_products_loading;
};

export const getTotalPages = (state) => {
    return state.total_pages;
};

export const getCurrentPage = (state) => {
    return state.current_page;
};

export const getProductInContext = (state) => {
    return state.product_in_context;
};

/** When a product is busy updating - loader */
export const getProdModalIsBusy = (state) => {
    return state.prod_modal_is_busy;
};

export const getProdModalInEditMode = (state) => {
    return state.prod_modal_in_edit_mode;
};


