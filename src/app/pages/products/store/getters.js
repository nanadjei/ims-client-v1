
/** Get customer login status froms state */
export const getProducts = (state) => state.products;

export const getFetchProductsLoading = (state) => state.fetch_products_loading;

export const getTotalPages = (state) => state.total_pages;

export const getCurrentPage = (state) => state.current_page;

export const getProductInContext = (state) => state.product_in_context;

/** When a product is busy updating - loader */
export const getProdModalIsBusy = (state) => state.prod_modal_is_busy;

export const getProdModalInEditMode = (state) => state.prod_modal_in_edit_mode;

/** When refreshing or quering products sum total */
export const getSetStockSumTotalIsBusy = (state) => state.stock_sum_total_is_busy;

export const getSetStockSumTotal = (state) => state.stock_sum_total;


