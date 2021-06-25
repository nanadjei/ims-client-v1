
/** Remove sale item from array
 * @param {*} state
 * @param { int } payload - The index of the array. Eg; [0: {'key': 'value}]. 0 is the index
 */
export const REMOVE_SALE_ITEM = (state, payload) => {
    return state.sales.items.splice(payload, 1);

};

/** Set the products that was pulled from the server. 
 * I mean the actual products we want to sell 
 */
export const SET_PRODUCTS = (state, payload) => {
    return (state.products = payload);
};