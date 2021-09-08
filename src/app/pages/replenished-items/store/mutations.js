
/** Set the products that was pulled from the server. 
 * I mean the actual products we want to sell 
 */
export const SET_PRODUCTS = (state, payload) => (state.products = payload);

/** When request is been sent to the server
 * and it is busy loading 
 */
export const SET_IS_LOADING = (state, payload) => (state.is_loading = payload);

export const SET_TOTAL_PAGES = (state, payload) => (state.total_pages = payload);
