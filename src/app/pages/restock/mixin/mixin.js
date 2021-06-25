export default {
    methods: {
        /** Product bluePrint/format */
        stockBluePrint() {
            return {
            number: 1,
            name: "",
            quantity_remaining: 0,
            cost_price: 0.00,
            selling_price: 0.00,
            total_cost_price: 0.00,
            }
        },

        appendNewBluePrint(index) {
            if((index + 1) == (this.products.length)) {
                return this.products.push(this.stockBluePrint());
            }
        }
    },
}