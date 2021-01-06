import HttpRequest from "@/app/helpers/HttpRequest";
export const fetchProductsAsync = ({ commit }) => {
    setTimeout(() => {
        HttpRequest({ url: "products", type: "get", user: "admin" }).then((res) => {
            commit("SET_PRODUCTS", res.data.data);
        });
    }, 1000);
};

/** Calculate sales items by multiplying each item's quantity by selling price */
export const updateSalesItems = ({ getters, commit }) => {
    const salesItems = [...getters.getSaleItems];
    salesItems.forEach((item) => {
        item.total_cost = item.quantity * item.selling_price;
    });
    return commit('RESET_SALE_ITEM', salesItems);
};

/**
 * Send sale items into database
 * @param { object } saleObj - The saleitems data to be stored in the database. Ie; specified_data and items
 */
export const saveNewSalesItems = ({ commit, dispatch }, saleObj) => {
    try {
        HttpRequest({ url: "sales", type: "post", user: "admin", data: saleObj }).then(() => {
            /** Set sales items back to empty to clear items in table */
            commit("RESET_SALE_ITEM", []);
            window.vm.$toast.success("Products successfully saved");
            /** Make a call to get fresh products so we can see the deducted products been updated */
            dispatch("fetchProductsAsync");
        });

    } catch (error) {
        throw error;
    }
};

/** Print items with POS printer */
export const printSaleItems = (saleObj) => {
    try {
        HttpRequest({ url: "sales/print/invoice", type: "post", user: "admin", data: saleObj }).then(() => {
            // console.log("Items printing...");
        });
    } catch (error) {
        throw error;
    }
};