/** Get sale items */
export const getProducts = (state) => {
    return state.products;
};

/** If items saved successfully */
export const getServerError = (state) => {
    return state.server_error;
}