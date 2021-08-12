import { debounce } from "lodash";
import { mapActions } from "vuex";
import { incrementor, allowFloatsOnly } from "@/app/helpers/app";
export default {
    data() {
        return {
            tableNumber: 1
        }
    },

    computed: {
        ifObjIsEmpty(){
            return Object.keys(this.activeItem).length === 0;
        }
    },

    watch: {
        getSaleItems(items) {
            return incrementor(items, this.tableNumber);
        }
    },

    methods: {
    ...mapActions({
        updateSalesItems: "cashsales/updateSalesItems",
        recomputeSalesItems: "cashsales/recomputeSalesItems"
    }),

    /** Product bluePrint/format */
    stockBluePrint() {
        return {
            number: 1,
            product_id: "",
            name: "",
            quantity: 1,
            selling_price: 0.00,
            total_cost: 0.00
        }
    },

    acceptOnlyNumbers(event, index, key) {
        return allowFloatsOnly(this.getSaleItems, event, index, key);
    },

    recalculateSale(item){
        return item.quantity && this.recomputeSalesItems(item);
    },

    /** Get selected dropdown item */
    getSelectedItem(item) {
        if(item.quantity == 0) return;
        return this.updateSalesItems({ tIndex: this.vueSuggestIndex, product: item })
    },

    /** Search for product by name */
    handleSearch: debounce(function(item) {
    if(!item) this.items = [];
    return item && this.searchProduct({ keyword: item, paginate: 6});
    }, 200)
    }
};