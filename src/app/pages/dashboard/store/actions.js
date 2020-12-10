import HttpRequest from "@/app/helpers/HttpRequest";
export const fetchDashboardData = async ({ commit }) => {
    await HttpRequest({ url: "dashboard", type: "get", user: "admin" }).then((res) => {
        commit("SET_DASHBOARD_DATA", res.data.data);
    });
}