

/** Update customer is logged in state */
export const SET_SALES_CREATED_AT = (state, payload) => {
    return (state.sales.created_at = payload);
};

/**
 * Add a new item to the sales item array.
 * @param {*} state 
 * @param { object } payload - The product item to push to the array
 */
export const SET_SALE_ITEM = (state, payload) => {
    return (state.sales.items.push(payload));
};

/** Remove sale item from array
 * @param {*} state
 * @param { int } payload - The index of the array. Eg; [0: {'key': 'value}]. 0 is the index
 */
export const REMOVE_SALE_ITEM = (state, payload) => {
    return state.sales.items.splice(payload, 1);

};

/** Set the entire sale item array */
export const RESET_SALE_ITEM = (state, payload) => {
    return (state.sales.items = payload);
};

/** Set the products that was pulled from the server. 
 * I mean the actual products we want to sell 
 */
export const SET_PRODUCTS = (state, payload) => {
    return (state.products = payload);
};

/** Set this anytime a product is selected from the dropdown items in VueSugguested  */
export const SET_VUESUGGUST_SELECTED_PROD = (state, payload) => state.vueSuggestSelectedProd = payload; 