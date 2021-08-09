import { incrementor, allowFloatsOnly } from "@/app/helpers/app";
export default {
    data() {
        return {
            tableNumber: 1
        }
    },

    watch: {
        getSaleItems(items) {
            return incrementor(items, this.tableNumber);
        }
    },

    methods: {
    /** Product bluePrint/format */
    stockBluePrint() {
        return {
            number: 1,
            cost_price: "",
            manufacturer: "",
            name: "",
            quantity_remaining: "",
            selling_price: "",
            slug: "",
            stock_quantity: "",
        }
    },

    acceptOnlyNumbers(event, index, key) {
        return allowFloatsOnly(this.getSaleItems, event, index, key);
    },
        /** Call inventory modal */
        // triggerInventoryModal() {
        //     window.$("#inventory-modal").modal("show");
        //     setTimeout(function () {
        //         $("#search-input").focus();
        //     }, 600);
        // },

        /** The below code consist of all methods that */
        /** Get selected dropdown item */
        getSelectedItem(item) {
            return item;
        },

        /** Search for product by name */
        searchProduct(item) {
        if(!item) this.items = [];
        // return item && this.dispatchSearch({ keyword: item, paginate: 6});
        }
    }
};