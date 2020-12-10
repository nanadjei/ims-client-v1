<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Cash Sales</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div v-show="getSaleItems && getSaleItems.length" class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="submitSales" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-save"></i> Submit Sales
            </button>
          </div>
          <div class="btn-group mr-2" role="group" aria-label="Second group">
            <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#make-sales-modal">
              <i class="fas fa-calendar-alt"></i> Change Sales Date
            </button>
          </div>
          <div class="btn-group" role="group" aria-label="Third group">
            <button @click="printSaleItems" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-print"></i> Print Invoice
            </button>
          </div>
        </div>
      </div>
    <div slot="content">
      <!-- Content here -->
      <p class="mb-4">This table represent a list of items ready for sale. You can change the value of a quantity by clicking on any cell in the quantity column. </p>

        <!-- DataTales Example -->
        <div class="row">
          <div class="col-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Sales Table</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Selling Price</th>
                        <th>Item Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in getSaleItems" :key="index">
                        <td width="50%">{{ _ucFirst(item.name) }}</td>
                        <td class="p-0 width-none" width="10%">
                          <!-- <input ref="qty" class="qty contenteditable" v-model="sales.items[index].quantity" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"/> -->
                          <input :id="'input-'+ item.id" class="qty contenteditable" v-model="item.quantity" @input="updateSalesItems" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"/>
                          </td>
                        <td>{{ parseFloat(item.selling_price).toFixed(2) }}</td>
                        <td>{{ item.total_cost.toFixed(2) }}</td> 
                        <td><i @click="removeItemByIndex(index)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i></td>
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
                    Total Cost: <strong>GHS {{ aggregateTotalCostOfSalesItems.toFixed(2) }}</strong>
                  </p>
              </div>
            </div>
          </div>
        </div>


    <!-- Inventory Modal -->
    <inventory-modal></inventory-modal>

    <!-- Sales Date Modal-->
    <div class="modal fade" id="make-sales-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">What date do you want to make your sales?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input type="date" v-model="sales.created_at" @input="setNewDateInStore" class="form-control" />
            </div>
              <p class="fs-smaller">Format: Month/Day/Year</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" type="button" data-dismiss="modal">Submit</button>
          </div>
        </div>
      </div>
    </div>

    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/app/layouts/auth/Layout";
import { ucFirst } from "@/app/helpers/app";
import InventoryModal from "@/app/pages/cash-sales/partials/InventoryModal";
import { mapGetters, mapActions } from "vuex";
import Mixin from "@/app/pages/cash-sales/mixins/mixin";
export default {
  name: "CashSales",
  components: { AuthLayout, InventoryModal },
  mixins: [Mixin],
  data() {
    return {
      sales: {
        created_at: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      salesCreatedAt: "cashsales/getCreatedAt",
      getSaleItems: "cashsales/getSaleItems",
      getSalesObj: "cashsales/getSalesObj",
    }),

    /** Sum up the total of sales
     * spread all the sales items from store and sum up their total_costs
     */
    aggregateTotalCostOfSalesItems() {
      return this.sum([...this.getSaleItems], "total_cost");
    },
  },
  methods: {
    ...mapActions({
      dispatchSalesItems: "cashsales/saveNewSalesItems",
      dispatchPrintSaleItems: "cashsales/printSaleItems",
    }),

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },

    /** Send sales items to the server */
    submitSales() {
      return this.dispatchSalesItems(this.getSalesObj);
    },

    printSaleItems() {
      return this.dispatchPrintSaleItems(this.getSalesObj);
    },

    /**
     * Before a new sale can be recorded there should be the date at which the sale was made.
     * At store "form.created_at" should be equal to today's date by default.
     */
    setFormCreatedAtToTodaysDate(date = new Date()) {
      return this.$store.commit(
        "cashsales/SET_SALES_CREATED_AT",
        this.$moment(date).format("YYYY-MM-DD")
      );
    },

    /** When the user changes the date it should be updated in store */
    setNewDateInStore() {
      this.setFormCreatedAtToTodaysDate(this.sales.created_at);
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
      this.$store.commit("cashsales/REMOVE_SALE_ITEM", itemIndex);
    },
  },
  mounted() {
    this.setFormCreatedAtToTodaysDate();
    this.sales.created_at = this.salesCreatedAt;
    // this.sales.items = this.getSaleItems;
    /** Fetch products from server */
    this.$store.dispatch("cashsales/fetchProductsAsync");
  },
};
</script>
