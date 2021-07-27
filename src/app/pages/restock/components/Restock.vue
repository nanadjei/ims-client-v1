<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Products Restock</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div v-show="products && products.length" class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="validateAndOpenModal" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-save"></i> Submit
            </button>
          </div>
        </div>
      </div>
    <div slot="content">
      <!-- Content here -->
      <p class="mb-4">This table represent a list of items ready to replenish. Search product in the cell and submit all at once. </p>
      <div v-if="isServerError" class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
          Stocks unable to save. Kindly check your form and fill them properly.
        </div>
      </div>
        <!-- DataTales Example -->
        <div class="row">
          <div class="col-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Restock Table</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive pb-6">
                  <ValidationObserver ref="observer">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost Price</th>
                        <th>Total Cost</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in products" :key="index">
                        <td>{{ item.number }}</td> 
                        <td width="50%">
                          <vue-suggest 
                            :rules="returnFalseIfLastItem(index) ? 'required' : ''"
                            :index="index"
                            :suggested-list="items"
                            :clean-input="cleanInput"
                            @onInputChange="searchProduct"
                            @focus="appendNewBluePrint(index)" 
                            @onSelect="getSelectedItem"
                            >
                          </vue-suggest>
                        </td>
                        <!-- @input="allowFloatsOnly($event, index, 'quantity')" -->
                        
                        <td width="10%">
                          <ValidationProvider
                            :rules="returnFalseIfLastItem(index) ? 'required' : ''"
                            name="quantity"
                            v-slot="{ errors }">
                          <input :class="['qty contenteditable', errors[0] ? 'was-invalid' : '']" 
                              v-model="item.quantity"
                              name="quantity"
                              autocomplete="off"
                              @keypress="allowFloatsOnly($event, index, 'quantity')"
                            />
                        </ValidationProvider>
                        </td>
                        <td width="20%">
                          <ValidationProvider
                            :rules="returnFalseIfLastItem(index) ? 'required' : ''"
                            name="cost_price"
                            v-slot="{ errors }">
                          <input :class="['qty contenteditable', errors[0] ? 'was-invalid' : '']" 
                              name="cost_price"
                              autocomplete="off"
                              v-model="item.cost_price" 
                              @keypress="allowFloatsOnly($event, index, 'cost_price')"
                              />
                          </ValidationProvider>
                        </td>
                        <td class="p-t-cell">{{ item.total_cost_price = (item.quantity * item.cost_price).toFixed(2) }}</td> 
                        <td class="p-t-cell text-center">
                          <i v-if="hideTrashCan(index)" @click="removeItemByIndex(index)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Items Summary</h6>
              </div>
              <div class="card-body">
                  <p>
                    Total Cost: <strong>GHS {{ aggregateTotalCostOfProd.toFixed(2) }}</strong>
                  </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal to confirm date of restocking items -->
        <app-modal 
            ref="sendRestockDataModal" 
            modal-id="sendRestockDataModal" 
            title="Please specify date" 
            @onSubmit="submitStockItems" 
            submit-btn-class="btn-primary"
            :disabled="modal.disabled"
            >
            <input type="date" class="form-control" v-model="restock_at" @input="modal.disabled = false"/>
            <span v-show="!restock_at" class="text-danger fs-smaller">Please specify date of restock</span>
          </app-modal>
    </div>
  </auth-layout>
</template>

<style lang="css" scoped>
  .p-t-cell { padding-top: 1.6rem !important }
 
</style>

<script>
import { debounce } from "lodash";
import { ucFirst, sum } from "@/app/helpers/app";
import { mapGetters, mapActions, mapMutations } from "vuex";
import AuthLayout from "@/app/layouts/auth/Layout";
import Mixin from "@/app/pages/restock/mixin/mixin";
import AppModal from "@/app/reusables/AppModal";
import VueSuggest from '@/app/pages/restock/partials/VueSuggest';

export default {
  name: "Restock",
  components: { AuthLayout, VueSuggest, AppModal },
  mixins: [ Mixin ],
  data() {
    return {
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
        getSearchedProds: "restock/getProducts",
        isServerError: "restock/getServerError"
    }),

    /** Sum up the total of sales
     * spread all the sales items from store and sum up their total_costs
     */
    aggregateTotalCostOfProd() {
      return sum(...[this.products], "total_cost_price");
    }
  },


  methods: {
    ...mapActions({
      dispatchSearch: "restock/searchProduct",
      createRestock: "restock/storeRestockData"
    }),

    ...mapMutations({
      setSearchedProds: "restock/SET_PRODUCTS",
      setServerError: "restock/SET_SERVER_ERROR"
    }),

    async validateAndOpenModal() {
      await this.$refs.observer.validate().then((validated) => {
        if (!validated) {
          return;
        }
        return this.$refs.sendRestockDataModal.show();
      });
    },

    

    /** When modal is confirmed */
    async submitStockItems() {
      await this.createRestock({ 
        products: this.products.length == 1 ? this.products : this.products.slice(0, -1), 
        restock_at: this.restock_at 
        }).then(() => {
        if(this.isServerError !== true) {
          this.products = [this.stockBluePrint()]
          this.cleanInput = true;
          this.restock_at = "";
        }
        return this.$refs.sendRestockDataModal.close();
      })
    },
    
    /**
     * Allow only float numbers in input fields
     * return 
     */
    allowFloatsOnly(event, index, key) {
      var value = this.products[index][key];

      let keyCode = (event.keyCode ? event.keyCode : event.which);
       // only allow number and one dot
        if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || value.indexOf('.') != -1)) event.preventDefault();
    },

    /** Search for product by name */
    searchProduct: debounce(function(item) {
      if(!item) this.items = [];
      return item && this.dispatchSearch({ keyword: item, paginate: 6});
    }, 400),

    /** Get selected dropdown item */
    getSelectedItem(item) {
      return this.products[this.vueSuggestIndex].product_id = item.id;
    },

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },


    /** Remove item from storage by index
     *
     * @param { Int } itemIndex - The index of the array item
     */
    removeItemByIndex(itemIndex) {
      this.products.splice(itemIndex, 1);
    },
  }
};


</script>
