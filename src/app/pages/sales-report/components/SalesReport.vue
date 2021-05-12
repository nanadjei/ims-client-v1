<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Sales</h1>
      </div>
    <div slot="content">
      <!-- Content here -->
      <p class="mb-4">This table represent a list of items that have already been sold. </p>
      <div class="btn-toolbar pb-4" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
           <input id="from" class="form-control" v-model="report_date.from" type="date" >
          </div>
          <div class="btn-group mr-2" role="group" aria-label="Second group">
            <input id="to" class="form-control" v-model="report_date.to" type="date" >
          </div>
          <div class="btn-group mr-2" role="group" aria-label="Third group">
            <button :disabled="(!report_date.from || !report_date.to) || queryingSalesReport" 
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" @click="fetchSalesReportByDates">
              <i v-if="!queryingSalesReport" class="far fa-paper-plane"></i> <i v-else class="fas fa-spinner fa-spin fa-spin"></i> Submit
            </button>
            <button @click="clearDates" class="btn btn-secondary shadow-sm" title="Click to clear both dates"> Clear </button>
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
                  <table v-if="getSalesReport && getSalesReport.length" class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Selling Price</th>
                        <th>Item Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in getSalesReport" :key="index">
                        <td>{{ item.id }}</td>
                        <td width="50%">{{ _ucFirst(item.product.name) }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.selling_price }}</td>
                        <td>{{ item.total_cost }}</td>
                        <!-- <td>{{ parseFloat(item.selling_price).toFixed(2) }}</td> -->
                        <!-- <td>{{ item.total_cost.toFixed(2) }}</td>  -->
                        <!-- <td><i @click="removeItemByIndex(index)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i></td> -->
                      </tr>
                    </tbody>
                  </table>
                  <div v-else style="color:#B6BACC !important;"> No results found for this query </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Overall Total</h6>
              </div>
              <div class="card-body">
                  <p>
                    Total Cost: <strong>GHS {{ aggregateTotalCostOfSalesItems.toFixed(2) }}</strong>
                  </p>
              </div>
            </div>
          </div>
        </div>

    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/app/layouts/auth/Layout";
import { ucFirst, sum, objectSetValues } from "@/app/helpers/app";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SalesReport",
  components: { AuthLayout },
  data() {
    return {
      report_date: {
        from: "",
        to: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      getSalesReport: "salesReport/getSalesReport",
      queryingSalesReport: "salesReport/getQueryingSalesReport"
    }),

    /** Sum up the total of sales
     * spread all the sales items from store and sum up their total_costs
     */
    aggregateTotalCostOfSalesItems() {
      return sum([...this.getSalesReport], "total_cost");
    }
  },
  methods: {
    ...mapActions({
      fetchSalesReport: "salesReport/fetchSalesReport"
    }),

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },

    /** Query for sales report */
    fetchSalesReportByDates() {
      return this.fetchSalesReport(this.report_date);
    },

    clearDates() {
      return objectSetValues(this.report_date, "");
    },

    /** Remove item from storage by index
     *
     * @param { Int } itemIndex - The index of the array item
     */
    removeItemByIndex(itemIndex) {
      this.$store.commit("cashsales/REMOVE_SALE_ITEM", itemIndex);
    }
  },
  mounted() {
    this.fetchSalesReport();
  }
};
</script>
