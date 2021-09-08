
/** Set the products that was pulled from the server. 
 * I mean the actual products we want to sell 
 */
export const SET_PRODUCTS = (state, payload) => {
    return (state.products = payload);
};

/** Set if saving stocks data results in a server error */
export const SET_SERVER_ERROR = (state, payload) => {
    return (state.server_error = payload);
};