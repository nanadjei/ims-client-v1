import HttpRequest from "@/app/helpers/HttpRequest";
export const fetchStockoutData = async ({ commit }, payload) => {
    await HttpRequest({ url: `products/out/of/stock?page=${payload.page_number}`, type: 'post', user: "admin", data: { paginate: payload.paginate_by } }).then((res) => {
        commit("SET_STOCKOUT_DATA", res.data);
        commit("SET_TOTAL_PAGES", res.data.pagination.totalPages);
    });
}