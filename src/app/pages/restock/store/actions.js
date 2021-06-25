// import HttpRequest from "@/app/helpers/HttpRequest";

/**
 * Send sale items into database
 * @param { object } saleObj - The saleitems data to be stored in the database. Ie; specified_data and items
 */
// export const saveNewSalesItems = ({ commit, dispatch }, saleObj) => {
//     HttpRequest({ url: "sales", type: "post", user: "admin", data: saleObj }).then(() => {
//         /** Set sales items back to empty to clear items in table */
//         commit("RESET_SALE_ITEM", []);
//         window.vm.$toast.success("Products successfully saved");
//         /** Make a call to get fresh products so we can see the deducted products been updated */
//         dispatch("fetchProductsAsync");
//     });
// };
