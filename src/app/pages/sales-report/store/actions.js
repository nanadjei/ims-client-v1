import HttpRequest from "@/app/helpers/HttpRequest";
export const fetchSalesReport = ({ commit }, fetchByReportDates) => {
    commit("SET_QUERYING_SALES_REPORT", true);
    setTimeout(() => {
        HttpRequest({ url: "sales/report", type: "post", user: "admin", data: fetchByReportDates }).then((res) => {
            commit("SET_SALES_REPORT", res.data.data);
            commit("SET_QUERYING_SALES_REPORT", false);
        });
    }, 1000);
};

/** Delete a sale item */
export const deleteSale = ({ commit, getters }, id) => {
        setTimeout(() => {
            HttpRequest({ url: `sales/${id}`, type: "delete", user: "admin" }).then(() => {
                const salesItems = [...getters.getSalesReport];
                const results = salesItems.filter(item => id !== item.id);
                commit('SET_SALES_REPORT', results);
            return window.vm.$toast.success("Item deleted");
            });
        }, 1000);
    }
