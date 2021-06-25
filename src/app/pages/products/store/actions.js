import HttpRequest from "@/app/helpers/HttpRequest";
import cloneDeep from "lodash";

/** Fetch products from the server which contains pagination links */
export const fetchProducts = ({ commit }, payload) => {
    commit("SET_FETCH_PRODUCTS_LOADING", true);
    setTimeout(() => {
        HttpRequest({ url: `products/withpagination?page=${payload.page_number}`, type: 'post', user: "admin", data: { paginate: payload.paginate_by, from: payload.query_date && payload.query_date['from'], to: payload.query_date && payload.query_date['to'] } }).then((res) => {
            commit("SET_PRODUCTS", res.data);
            commit("SET_TOTAL_PAGES", res.data.pagination.totalPages);
            commit("SET_FETCH_PRODUCTS_LOADING", false);
        });
    }, 1000);
};

/** Fetch products from the server which contains pagination links */
// export const fetchProductsByDate = ({ commit }, payload) => {
//     commit("SET_FETCH_PRODUCTS_LOADING", true);
//     setTimeout(() => {
//         HttpRequest({ url: `/query/by/date/interval?page=${payload.page_number}`, type: 'post', user: "admin", data: { paginate: payload.paginate_by, from: payload.query_date && payload.query_date['from'], to: payload.query_date && payload.query_date['to'] } }).then((res) => {
//             commit("SET_PRODUCTS", res.data);
//             commit("SET_TOTAL_PAGES", res.data.pagination.totalPages);
//             commit("SET_FETCH_PRODUCTS_LOADING", false);
//         });
//     }, 1000);
// };

/** Update product item in store and save in database */
export const updateProductItem = ({ commit, dispatch }, payload) => {
    commit("SET_PROD_MODAL_IS_BUSY", true);
    setTimeout(() => {
        HttpRequest({ url: payload.url, type: payload.method, user: "admin", data: payload.data })
            .then((res) => {
                res.data.status == '200' && window.vm.$toast.success("Product successfully saved")
            }).catch(() => window.vm.$toast.error("Sorry, this action cannot be performed!")) ;
        if (payload.method === "post") {
            dispatch("fetchProducts", { page_number: 1, paginate_by: 15 });
        }
        commit("SET_PROD_MODAL_IS_BUSY", false);
    }, 1000);
};


export const searchProduct = ({ commit }, keyword) => {
    setTimeout(() => {
        HttpRequest({ url: `products/search/${keyword}`, type: 'get', user: "admin" }).then((res) => {
            commit("SET_PRODUCTS", res.data);
        });
    }, 1000);
};

/** Sum up the entire stock items */
export const fetchStockSumTotal = ({ commit, }) => {
    commit("SET_STOCK_SUM_TOTAL_IS_BUSY", true);
    setTimeout(() => {
        HttpRequest({ url: 'products/stock/sum/total', type: 'get', user: "admin" }).then((res) => {
            commit("SET_STOCK_SUM_TOTAL", res.data.data);
        });
        commit("SET_STOCK_SUM_TOTAL_IS_BUSY", false);
    }, 1000);
};

/** Remove deleted item from store and database */
export const removeProductById = ({ getters }, id) => {
    const productsFromServer = getters.getProducts;
    cloneDeep(productsFromServer);
    const { data } = productsFromServer;
    productsFromServer.data = data.filter(item => {
        return item.id !== id;
    });
    setTimeout(() => {
        HttpRequest({ url: "products/" + id, type: 'delete', user: "admin" });
    }, 1000);
};

/** Update stock quantities (Zeroing items) */
export const updateStockQuantities = ({ dispatch }) => {
    setTimeout(() => {
        HttpRequest({ url: 'products/erase/stock/quantities', type: 'put', user: "admin" }).then(() => {
            return dispatch("fetchProducts", { page_number: 1, paginate_by: 15 });
        });
    }, 1000);
}

