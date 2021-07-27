import HttpRequest from "@/app/helpers/HttpRequest";


/**
 * Send sale items into database
 * @param { Object } Data - The data to be stored in the database. Ie; specified_data and items
 */
export const storeRestockData = ({ commit }, data) => {
    HttpRequest({ url: "restocks", type: "post", user: "admin", data: data }).then(() => {
        /** Set sales items back to empty to clear items in table */
        commit("SET_SERVER_ERROR", false);
        window.vm.$toast.success("Products successfully saved");
    }).catch(() => {
        commit("SET_SERVER_ERROR", true);
    });
};

/**
 * 
 * @param { Object } commit - vuex 
 * @param { Object } payload - payload of Word and paginated number
 */
export const searchProduct = ({ commit }, payload) => {
    setTimeout(() => {
        HttpRequest({ url: `products/search/${payload.keyword}`, type: 'post', user: "admin", data: { paginate: payload.paginate } }).then((res) => {
            return commit ("SET_PRODUCTS", res.data);
        });
    }, 1000);
};
