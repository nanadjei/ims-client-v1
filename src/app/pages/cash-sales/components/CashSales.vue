<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Cash Sales</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div v-show="getSaleItems && getSaleItems.length" class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="validateNfireConfirmModal" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-save"></i> Submit Sales
            </button>
          </div>
          <!-- <div class="btn-group mr-2" role="group" aria-label="Second group">
            <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#select-date-modal">
              <i class="fas fa-calendar-alt"></i> Change Sales Date
            </button>
          </div> -->
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
      
      <div v-if="showSalesError" class="alert alert-danger d-flex align-items-center" role="alert">
        <div>
          Some fields are required. Kindly check your table and fill them properly.
        </div>
      </div>

        <!-- DataTales Example -->
        <div class="row">
          <div class="col-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Sales Table</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <ValidationObserver ref="observer">
                  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Selling Price</th>
                        <th>Item Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in getSaleItems" :key="index">
                        <td style="padding: 1.5rem">{{ item.number }}</td> 
                        <td width="50%">
                          <vue-suggest 
                            :rules="returnFalseIfLastItem(index) ? 'required' : ''"
                            :index="index"
                            :set-value="item.name"
                            :suggested-list="getSearchedProds"
                            :clean-input="cleanInput || !item.name"
                            @onInputChange="handleSearch"
                            @focus="appendNewBluePrintWith(getSaleItems, index)" 
                            @onSelect="getSelectedItem"
                            @onActiveItem="getActiveItem"
                            >
                          </vue-suggest>
                        </td>
                        <!-- Quantity -->
                        <td width="10%">
                          <input :class="['qty contenteditable', (item.product_id.quantity_remaining) < item.quantity ? 'was-invalid' : '']" 
                              v-model="item.quantity"
                              autocomplete="off"
                              @input="recalculateSale(item)"
                              @keypress="acceptOnlyNumbers($event, index, 'quantity')"
                            />
                        </td>
                        <!-- Selling Price -->
                        <td width="10%" style="padding: 1.5rem">
                          {{ Number(item.selling_price).toFixed(2) }}
                        </td>
                        <!-- Item Total -->
                        <!-- <td width="10%" style="padding: 1.5rem">{{ (item.quantity * item.selling_price || 0.00).toFixed(2) }}</td> -->
                        <td width="10%" style="padding: 1.5rem">{{ Number(item.total_cost).toFixed(2) || 0.00 }}</td>
                        <td width="10%" style="padding: 1.5rem">
                          <div class="text-center" aria-label="Action buttons">
                            <i @click="removeItemFromTable(item)" v-if="hideTrashCanWith(getSaleItems, index)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i>
                          </div>
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
                    Total Cost: <strong>GHS {{ aggregateTotalCostOfSalesItems.toFixed(2) }}</strong>
                  </p>
              </div>
            </div>
            <!-- Item details -->
            <item-details v-show="(!ifObjIsEmpty && getSearchedProds.length)" :item="activeItem"></item-details>
          </div>
        </div>


    <!-- Are you sure you want to save? -->
    <app-modal
    title="Are you sure you want to save sales in this date?"
    ref="cashSalesConfirmSave"
    modal-id="cashSalesConfirmSave"
    @onSubmit="createSales"
    submit-btn-class="btn-primary" 
    submit-btn-name="Confirm">
      <div class="form-group">
        <input type="date" v-model="sales.created_at" @input="setNewDateInStore" class="form-control" />
      </div>
      <p class="fs-smaller">Date Format: Day/Month/Year</p>

    </app-modal>

    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/app/layouts/auth/Layout";
import { ucFirst } from "@/app/helpers/app";
import AppModal from "@/app/reusables/AppModal";
// import InventoryModal from "@/app/pages/cash-sales/partials/InventoryModal";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Mixin from "@/app/pages/cash-sales/mixins/mixin";
import VueSuggest from '@/app/pages/restock/partials/VueSuggest';
import VueSuggestMixing from "@/app/pages/restock/mixin/mixin";
import ItemDetails from "@/app/pages/cash-sales/partials/ItemDetails";

export default {
  name: "CashSales",
  components: { AuthLayout, VueSuggest, ItemDetails, AppModal },
  mixins: [ Mixin, VueSuggestMixing ],
  data() {
    return {
      showSalesError: false,
      activeItem: {},
      sales: {
        created_at: ""
      },
    };
  },

  computed: {
    ...mapGetters({
      salesCreatedAt: "cashsales/getCreatedAt",
      getSaleItems: "cashsales/getSaleItems",
      getSalesObj: "cashsales/getSalesObj",
      getSearchedProds: "cashsales/getProducts"
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
      submitSalesItems: "cashsales/saveNewSalesItems",
      printSaleItems: "cashsales/printSaleItems",
      searchProduct: "cashsales/searchProduct",
      deleteByIndex: "cashsales/removeSaleItemByIndex"
    }),

    ...mapMutations({
      setSalesItems: "cashsales/RESET_SALE_ITEM"
    }),

    /** When navigating through the dropdown items on VueSuggest
     * Get each active item.
     */
    getActiveItem(payload) {
      return this.activeItem = payload;
    },

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },

    /** Check if table cells have no validation error,
     * fire the modal to 
     */
    async validateNfireConfirmModal() {
      const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return;
        }
        return this.prepareSalesItems();
    },

    prepareSalesItems() {
      this.showSalesError = false;
      const saleItems = [...this.getSaleItems];

      const lastItem = saleItems.slice(-1)[0];
      const lastItemIndex = saleItems.lastIndexOf(lastItem);

      saleItems.forEach((item) => {
        if(!item.product_id && (saleItems.indexOf(item) !== lastItemIndex)) {
          return this.showSalesError = true;
        }
      })
      this.setSalesItems(saleItems);
      if(this.showSalesError === false) this.$refs.cashSalesConfirmSave.show();
    },

    /** Send sales items to the server */
    async createSales() {
      const lastItem =  [...this.getSaleItems].slice(-1)[0];

      if(!lastItem.product_id) this.getSaleItems.pop();
    /** Make all stock quantities zero */
      await this.submitSalesItems(this.getSalesObj).then(() => {
        this.activeItem = {};
        return this.$refs.cashSalesConfirmSave.close();
      });
    },

    printSaleItems() {
      return this.printSaleItems(this.getSaleItems);
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

    /** Remove item from storage by index
     *
     * @param { Int } itemIndex - The index of the array item
     */
    removeItemFromTable(item) {
      return this.deleteByIndex(item);
    },
  },
  mounted() {
    this.setFormCreatedAtToTodaysDate();
    this.sales.created_at = this.salesCreatedAt;

    /** Fetch products from server */
    // this.$store.dispatch("cashsales/fetchProductsAsync");
  },
};
</script>
