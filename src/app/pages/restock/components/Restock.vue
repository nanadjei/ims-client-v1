<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Products Restock</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div v-show="products && products.length" class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="submitSales" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-save"></i> Submit
            </button>
          </div>
        </div>
      </div>
    <div slot="content">
      <!-- Content here -->
      <p class="mb-4">This table represent a list of items ready to replenish. Search product in the cell and submit all at once. </p>

        <!-- DataTales Example -->
        <div class="row">
          <div class="col-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Restock Table</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost Price</th>
                        <th>Selling Price</th>
                        <th>Total Cost</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in products" :key="index">
                        <td>{{ item.number }}</td> 
                        <td width="50%">
                          <!-- <input class="qty contenteditable" v-model="item.name" @click="appendNewBluePrint" @input="updateSalesItems"/> -->
                          <vue-suggestion :items="autoCompleteProds" 
                              v-model="item.name"
                              :setLabel="setLabel"
                              @focus="appendNewBluePrint(index)"
                              :itemTemplate="AutoComplete"
                              @changed="inputChange" 
                              @selected="itemSelected">
                          </vue-suggestion>
                        </td>
                        <td width="10%">
                          <input class="qty contenteditable" v-model="item.quantity_remaining" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"/>
                          </td>
                        <td width="10%">
                          <input class="qty contenteditable" v-model="item.cost_price" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"/>
                          </td>
                        <td class="p-t-cell">{{ parseFloat(item.selling_price).toFixed(2) }}</td>
                        <td class="p-t-cell">{{ item.total_cost_price.toFixed(2) }}</td> 
                        <td class="p-t-cell text-center"><i @click="removeItemByIndex(index)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i></td>
                      </tr>
                    </tbody>
                  </table>
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
                    <!-- Total Cost: <strong>GHS {{ aggregateTotalCostOfSalesItems.toFixed(2) }}</strong> -->
                  </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </auth-layout>
</template>

<style lang="css" scoped>
  .p-t-cell { padding-top: 1.6rem !important }
 
</style>

<script>
import { VueSuggestion } from 'vue-suggestion';
import { ucFirst } from "@/app/helpers/app";
import { mapGetters, mapActions } from "vuex";
import AuthLayout from "@/app/layouts/auth/Layout";
import Mixin from "@/app/pages/restock/mixin/mixin";
import AutoComplete from "@/app/pages/restock/partials/AutoComplete";

export default {
  name: "Restock",
  components: { AuthLayout, VueSuggestion },
  mixins: [ Mixin ],
  data() {
    return {
      tableNumbering: 1,
      autoCompleteProds: [
        { id: 1, name: 'Golden Retriever'},
        { id: 2, name: 'Cat'},
        { id: 3, name: 'Squirrel'},
      ],

      AutoComplete,
      
      products: [
        {
          number: 1,
          name: "",
          quantity_remaining: 0,
          cost_price: 0.00,
          selling_price: 0.00,
          total_cost_price: 0.00,
        }
      ]
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

  computed: {
    ...mapGetters({
      
    }),

    /** Sum up the total of sales
     * spread all the sales items from store and sum up their total_costs
     */
    aggregateTotalCostOfSalesItems() {
      return true;
      // return this.sum([...this.getSaleItems], "total_cost");
    },
  },


  methods: {
    ...mapActions({
      dispatchSalesItems: "cashsales/saveNewSalesItems"
    }),

     inputChange(item) {
      return item;
    },

    setLabel (item) {
      return item.name;
    },

    itemSelected(item) {
      return item;
    },

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },

    /** Send sales items to the server */
    submitSales() {
      return this.dispatchSalesItems(this.getSalesObj);
    },


    /** Sum an a properties of an object inside an array
     *
     * @param { Array } items - The array with the object.
     * Eg; const person = [ {'name' => 'Elvis', 'age' => '20'}, {'name' => 'Douglas', 'age' => '40'} ];
     * @param { String } propToSum - The property to sum. Eg; 'age';
     */
    sum(items, propToSum) {
      return items.reduce((x, y) => {
        return x + y[propToSum];
      }, 0);
    },

    /** Update all sales items */
    updateSalesItems() {
      this.$store.dispatch("cashsales/updateSalesItems");
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
