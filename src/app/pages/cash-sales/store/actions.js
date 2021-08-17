import HttpRequest from "@/app/helpers/HttpRequest";
// import { itemsBlueprint } from "@/app/pages/cash-sales/store/state";

// export const fetchProductsAsync = ({ commit }) => {
//     setTimeout(() => {
//         HttpRequest({ url: "products", type: "get", user: "admin" }).then((res) => {
//             commit("SET_PRODUCTS", res.data.data);
//         });
//     }, 1000);
// };

/**
 * 
 * @param { Object } commit - vuex 
 * @param { Object } payload - payload of Word and paginated number
 */
export const searchProduct = ({ commit }, payload) => {
    setTimeout(() => {
        HttpRequest({ url: `products/search/${payload.keyword}`, type: 'post', user: "admin", data: { paginate: payload.paginate } }).then((res) => {
            return commit ("SET_PRODUCTS", res.data.data);
        });
    }, 1000);
};

/** Calculate sales items by multiplying each item's quantity by selling price */
export const updateSalesItems = ({ getters, commit }, payload) => {
    const salesItems = [...getters.getSaleItems];
    const product = payload.product;
    const el = salesItems[payload.tIndex];
    
    const setValues = { 
        name: product.name, 
        product_id: product.id, 
        selling_price: product.selling_price
    }
    Object.assign(el, setValues);
    
    salesItems.forEach((item) => {
        item.total_cost = item.quantity * item.selling_price;
    });
    return commit('RESET_SALE_ITEM', salesItems);
};


/** Recalculate quantity and selling_price */
export const recomputeSalesItems = ({ getters, commit }, prod) => {
    var salesItems = [...getters.getSaleItems];

    const el = salesItems.find(item => item.number === prod.number);

    Object.assign(el, { total_cost: el.quantity * el.selling_price });

    return commit('RESET_SALE_ITEM', salesItems);
}

/**
 * Send sale items into database
 * @param { object } saleObj - The saleitems data to be stored in the database. Ie; specified_data and items
 */
export const saveNewSalesItems = ({ commit }, saleObj) => {
    HttpRequest({ url: "sales", type: "post", user: "admin", data: saleObj }).then(() => {
        /** Set sales items back to empty to clear items in table */
        
        commit("RESET_SALE_ITEM", [{
            number: 1,
            product_id: "",
            name: "",
            quantity: 1,
            selling_price: 0.00,
            total_cost: 0.00
      }
    ]);
        window.vm.$toast.success("Products successfully saved");
        /** Make a call to get fresh products so we can see the deducted products been updated */
        // dispatch("fetchProductsAsync");
    });
};

/** Remove item from sales item */
export const removeSaleItemByIndex = ({ commit, getters }, prod) => {
    const salesItems = [...getters.getSaleItems];
    const results = salesItems.filter(item => prod.number !== item.number);
    return commit('RESET_SALE_ITEM', results);
};

/** Print items with POS printer */
export const printSaleItems = (saleObj) => {
    HttpRequest({ url: "sales/print/invoice", type: "post", user: "admin", data: saleObj }).then(() => {
        // console.log("Items printing...");
    });
};