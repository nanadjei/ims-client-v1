import HttpRequest from "@/app/helpers/HttpRequest";

/** Fetch products from the server which contains pagination links */
export const fetchProducts = ({ commit }, payload) => {
    commit("SET_FETCH_PRODUCTS_LOADING", true);
    setTimeout(() => {
        HttpRequest({ url: `products/expirations?page=${payload.page_number}`, type: 'post', user: "admin", data: { paginate: payload.paginate_by, from: payload.query_date && payload.query_date['from'], to: payload.query_date && payload.query_date['to'] } }).then((res) => {
            commit("SET_PRODUCTS", res.data);
            commit("SET_TOTAL_PAGES", res.data.pagination.totalPages);
            commit("SET_FETCH_PRODUCTS_LOADING", false);
        });
    }, 1000);
};

export const searchProduct = ({ commit }, keyword) => {
    setTimeout(() => {
        HttpRequest({ url: `products/search/${keyword}`, type: 'post', user: "admin" }).then((res) => {
            commit("SET_PRODUCTS", res.data);
        });
    }, 1000);
};