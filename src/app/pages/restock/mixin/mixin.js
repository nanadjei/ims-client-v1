import { incrementor } from "@/app/helpers/app";
import { mapMutations } from "vuex";
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
            return incrementor(items, this.tableNumbering = 1);
        }
    },

    methods: {
        ...mapMutations({
            "setServerError": "restock/SET_SERVER_ERROR"
        }),

        showExpirationModal(item) {
            this.expiration.number = item.number;
            this.expiration.date = item.expired_at;
            return this.$refs.expiredAtModal.show();
        },

        hideExpirationModal() {
            return this.$refs.expiredAtModal.close();
        },

        /** Add new table if the user clicks on the last table's name input */
        appendNewBluePrintWith(arrayItems, index) {
            this.setServerError(false);
            this.vueSuggestIndex = index;
            if((index + 1) == (arrayItems.length)) {
                return arrayItems.push(this.stockBluePrint());
            }
        },

        /** Hide the 1st item in the products array */
        hideTrashCanWith(arrayItems, index) {
            return index != arrayItems.indexOf(arrayItems[0]);
        },

        /** Validate if not last item in the table list */
        returnFalseIfLastItem(index){
            this.setServerError(false);
            return index <= this.vueSuggestIndex ? true : false;
        },
    },
}