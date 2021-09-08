<template>
    <div class="row">
          <div class="col-8">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Replenished Items Table</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive pb-6">
                  <table v-if="getProducts.data && (getProducts.data.length)" class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Cost Price</th>
                        <th>Total Cost</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in getProducts.data" :key="index">
                            <td>{{ item.id }}</td>
                            <td>{{ _ucFirst(item.product.name) }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.cost_price }}</td>
                            <td>{{ item.selling_price }}</td>
                            <td>{{ item.total_cost_price }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Action buttons">
                                    <i @click="setItemToEditId(item)" class="far fa-edit text-primary cursor-pointer pr-2" title="Edit"></i>
                                    <i @click="setItemToDeleteId(item.id)" class="fas fa-trash-alt text-danger cursor-pointer" title="Delete"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                   <div v-else style="color:#B6BACC !important;" class="text-center"> 
                     <i class="fas fa-box-open fa-3x"></i>
                     <p>No results found.</p> 
                    </div>
                </div>
              </div>
            </div>
          </div>
            <!-- Pagination -->
            <!-- <div v-show="getProducts && (getProducts.data.length)" class="row">
                <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info">{{ `Showing 1 to ${paginate_by} of ${getProducts && getProducts.pagination.total} entries` }}</div>
                    <div class="pt-4" v-if="getProducts.data && sumTotalCost().by_cost_price"> Total Cost Price: <strong>GHS {{ Number(sumTotalCost().by_cost_price).toFixed(2) }}</strong> </div>
                    <div class="pt-2" v-if="getProducts.data && sumTotalCost().by_selling_price"> Total Selling Price: <strong>GHS {{ Number(sumTotalCost().by_selling_price).toFixed(2) }}</strong> </div>
                </div>
                <div class="col-sm-12 col-md-7">
                    <div class="dataTables_paginate paging_simple_numbers">
                    <paginate 
                    v-show="getProducts && getProducts.data"
                    :page-count="getTotalPages"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="fetchByPagination"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination float-right'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    >
                    </paginate>
                    </div>
                </div>
            </div> -->
            <!-- Pagination Ends -->
          <div class="col-4">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Items Summary</h6>
              </div>
              <div class="card-body">
                  <p>
                    Total Cost: <strong>GHS {{ getProducts.data && aggregateTotalCostOfProd.toFixed(2) }}</strong>
                  </p>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import { ucFirst, sum } from "@/app/helpers/app";
import { mapGetters } from "vuex";

export default {
    name: "ReplenishmentTable",

    computed: {
        ...mapGetters({
            getProducts: "replenished/getProducts"
        }),

        /** Sum up the total of sales
         * spread all the sales items from store and sum up their total_costs
        */
        aggregateTotalCostOfProd() {
          return this.getProducts.data && sum(...[this.getProducts.data], "total_cost_price");
        }
    },

    methods: {

        /** When edit button is clicked, the product should be set in the vuex store and for edit/update */
        setItemToEditId(item) {
        this.setProductToEdit(item);
        this.setProdInEditMode(true);
        // this.$modal.show("productModal");
        },

        /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },


        setItemToDeleteId(id) {
            this.itemToDeleteId = id;
            return this.$refs.confirmModal.show();
        },
    }
}
</script>