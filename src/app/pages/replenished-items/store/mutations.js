
/** Set the products that was pulled from the server. 
 * I mean the actual products we want to sell 
 */
export const SET_PRODUCTS = (state, payload) => {
    return (state.products = payload);
};