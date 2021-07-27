export default {
    data() {
        return {
            vueSuggestIndex: 0,
            cleanInput: false,
            item: {},
            items: [],
        }
    },

    watch: {
        products(items) {
        this.tableNumbering = 1;
            for( let i = 0; i < items.length; i++ ) {
                items[i].number = this.tableNumbering;
                this.tableNumbering++;
            }
        }
    },

    methods: {
        /** Product bluePrint/format */
        stockBluePrint() {
            return {
                number: 1,
                name: "",
                product_id: "",
                quantity: "",
                cost_price: "",
                total_cost_price: 0.00
            }
        },

        /** Add new table if the user clicks on the last table's name input */
        appendNewBluePrint(index) {
            this.vueSuggestIndex = index;
            if((index + 1) == (this.products.length)) {
                return this.products.push(this.stockBluePrint());
            }
        },

        /** Hide the 1st item in the products array */
        hideTrashCan(index) {
            return index != this.products.indexOf(this.products[0]);
        },

        /** Validate if not last item in the table list */
        returnFalseIfLastItem(index){
            return index <= this.vueSuggestIndex ? true : false;
        },
    },
}