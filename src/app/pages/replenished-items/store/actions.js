import HttpRequest from "@/app/helpers/HttpRequest";

/** Fetch products from the server which contains pagination links */
export const getReplenishedItemsByDate = ({ commit }, payload) => {
    commit("SET_IS_LOADING", true);
    setTimeout(() => {
        HttpRequest({ url: `/restocks?page=${payload.page_number || 1}`, type: 'get', user: "admin", data: { paginate: payload.paginate_by, from: payload.query_date && payload.query_date['from'], to: payload.query_date && payload.query_date['to'] } }).then((res) => {
            commit("SET_PRODUCTS", res.data);
            commit("SET_TOTAL_PAGES", res.data.pagination.totalPages);
            commit("SET_IS_LOADING", false);
        }).catch(err => {
            commit("SET_IS_LOADING", false);
            throw err;
    });
    }, 1000)
};

/**
 * Send sale items into database
 * @param { Object } Data - The data to be stored in the database. Ie; specified_data and items
 */
export const updateRestockData = ({ commit }, data) => {
    HttpRequest({ url: "restocks", type: "post", user: "admin", data: data }).then(() => {
        /** Set sales items back to empty to clear items in table */
        commit("SET_SERVER_ERROR", false);
        window.vm.$toast.success("Products successfully saved");
    }).catch(() => {
        commit("SET_SERVER_ERROR", true);
        window.vm.$toast.error("Products could not save.");
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
