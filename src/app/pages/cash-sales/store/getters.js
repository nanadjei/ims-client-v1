
/** Get customer login status froms state */
export const getCreatedAt = (state) => state.sales.created_at;

/** Get sale object */
export const getSalesObj = (state) => state.sales;

/** Get sale items */
export const getSaleItems = (state) => state.sales.items;

/** Get all products which was requested from the server */
export const getProducts = (state) => state.products;

