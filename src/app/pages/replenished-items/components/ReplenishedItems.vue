<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Replenished Items</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="navigateToRouter({'name': 'restock'})" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-save"></i> Add Stock
            </button>
          </div>
        </div>
      </div>
    <div slot="content">
      <!-- Content here -->
      <div class="btn-toolbar pb-4" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
          <input id="from" class="form-control" v-model="query_date.from" type="date" >
          </div>
          <div class="btn-group mr-2" role="group" aria-label="Second group">
            <input id="to" class="form-control" v-model="query_date.to" type="date" >
          </div>
          <div class="btn-group mr-2" role="group" aria-label="Third group">
            <button
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" @click="fetchProducts">
              <i v-if="!getIsLoading" class="far fa-paper-plane"></i> <i v-else class="fas fa-spinner fa-spin fa-spin"></i> Submit
            </button>
            <button @click="clearDates" class="btn btn-secondary shadow-sm" title="Click to clear both dates"> Clear </button>
          </div>
        </div>
      <p class="mb-4">This table represent a list of items ready to replenish. Search product in the cell and submit all at once. </p>

      <!-- DataTales Example -->
        <replenishment-table></replenishment-table>
        <!-- Modal to confirm date of restocking items -->
        <!-- <app-modal 
            ref="sendRestockDataModal" 
            modal-id="sendRestockDataModal" 
            title="Please specify date" 
            @onSubmit="submitStockItems" 
            submit-btn-class="btn-primary"
            :disabled="modal.disabled"
            >
            <input type="date" class="form-control" v-model="restock_at" @input="modal.disabled = false"/>
            <span v-show="!restock_at" class="text-danger fs-smaller">Please specify date of restock</span>
          </app-modal> -->
    </div>      
  </auth-layout>
</template>

<style lang="css" scoped>
  .p-t-cell { padding-top: 1.6rem !important }
 
</style>

<script>
import { ucFirst, navigateToRouter, objectSetValues } from "@/app/helpers/app";
import { mapGetters, mapActions, mapMutations } from "vuex";
import AuthLayout from "@/app/layouts/auth/Layout";
import Mixin from "@/app/pages/restock/mixin/mixin";
// import AppModal from "@/app/reusables/AppModal";
// import VueSuggest from '@/app/pages/restock/partials/VueSuggest';
import ReplenishmentTable from '../partials/ReplenishmentTable';

export default {
  name: "ReplenishedItems",
  components: { AuthLayout, ReplenishmentTable },
  mixins: [ Mixin ],
  data() {
    return {
      query_date: {
        from: "",
        to: ""
      },
      cleanInput: false,
      item: {},
      items: [],
      tableNumbering: 1,

      modal: {
        disabled: true,
      },
      
      products: [
        {
          number: 1,
          name: "",
          product_id: "",
          quantity: "",
          cost_price: "",
          total_cost_price: 0.00
        }
      ],
      restock_at:""
    }
  },

  watch: {
    /** Keep watch of item been searched and set array items to []
     * when input is empty
     */
    getSearchedProds(value) {
      return value ? this.items = value.data : this.items = [];
    }
  },

  computed: {
    ...mapGetters({
        getIsLoading: "replenished/getIsLoading"
    }),
  },


  methods: {
    ...mapActions({
      fetchPaginatedProds: "replenished/getReplenishedItemsByDate",
    }),

    ...mapMutations({
      setProds: "replenished/SET_PRODUCTS",
      setServerError: "replenished/SET_SERVER_ERROR"
    }),

     navigateToRouter(name) {
      return navigateToRouter(name);
    },

    clearDates() {
      return objectSetValues(this.query_date, "");
    },

    async validateAndOpenModal() {
      await this.$refs.observer.validate().then((validated) => {
        if (!validated) {
          return;
        }
        return this.$refs.sendRestockDataModal.show();
      });
    },


    /** Search for product by name */
    fetchProducts() {
      return this.fetchPaginatedProds({paginate_by: 15, query_date: this.query_date });
    },

    /** Get selected dropdown item */
    getSelectedItem(item) {
      return this.products[this.vueSuggestIndex].product_id = item.id;
    },

    /** Remove item from storage by index
     *
     * @param { Int } itemIndex - The index of the array item
     */
    removeItemByIndex(itemIndex) {
      this.products.splice(itemIndex, 1);
    },
  },

  mounted() {
    this.setProds([]);
  }
};


</script>
