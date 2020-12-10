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
