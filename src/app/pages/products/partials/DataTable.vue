<template>
    <div class="vue-fragment">
    <!-- DataTales Example -->
     <p class="mb-4">This table represent a list of products available. </p>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Products</h6>
            </div>
            <!-- <div v-else style="color:#B6BACC !important;"> No results found for this query </div> -->
            <div class="table-responsive">
                <div class="card-body">
                    <div class="table-responsive">
                        <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <div class="dataTables_length" id="dataTable_length">
                                        <label>Show 
                                            <select @change="fetchByPagination" v-model="paginate_by" name="dataTable_length" class="custom-select custom-select-sm fs-8 form-control" aria-controls="dataTable">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="25">25</option>
                                                <option value="100">100</option>
                                            </select> entries</label>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div id="dataTable_filter" class="dataTables_filter float-right">
                                        <label>Search:<input type="search" @input="searchProduct" v-model="search_keyword" class="form-control form-control-sm" placeholder="" aria-controls="dataTable"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table v-if="getProducts.data && (getProducts.data.length)" class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Stock Quantity</th>
                                                <th>Quantity Remaining</th>
                                                <th>Cost Price</th>
                                                <th>Selling Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <!-- Display the aggregated stock values -->
                                        <tfoot v-show="isSuperAdmin && (getProducts && getProducts.data.length)">
                                            <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>Overall Sum</th>
                                            <th title="The sum of all stock quantities multiplied by their cost prices.">
                                              {{ !getSetStockSumTotal ? "N/A" : Number(getSetStockSumTotal.aggregated_stock_cost_price).toFixed(2) }}
                                              </th>
                                            <th title="The sum of all stock quantities multiplied by their selling prices.">
                                              {{ !getSetStockSumTotal ? "N/A" : Number(getSetStockSumTotal.aggregated_selling_price).toFixed(2) }}
                                              </th>
                                            <th title="Refresh">
                                              <i @click="fetchStockSumTotal" 
                                              class="fas fa-sync-alt" 
                                              :class="{'fa-spin' : getSetStockSumTotalIsBusy }"></i>
                                              </th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr v-for="(item, index) in getProducts.data" :key="index">
                                                <td> {{ item.id }}</td>
                                                <td width="50%" class="cursor-pointer">{{ _ucFirst(item.name) }}</td>
                                                <td> {{ item.stock_quantity }}</td>
                                                <td> {{ item.quantity_remaining }}</td>
                                                <td>{{ item.cost_price }}</td> 
                                                <td>{{ (item.selling_price) }}</td>
                                                <td> <span v-show="item.quantity_remaining == 0" class="badge badge-danger">Out Of Stock</span> </td>
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
                                        <p>No results found for this query</p> 
                                    </div>
                                </div>

                            </div>
                            
                            <!-- Pagination -->
                            <div v-show="getProducts && (getProducts.data.length)" class="row">
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
                            </div>
                            <!-- Pagination Ends -->
                        </div>
                    </div>
                </div>
            </div>
            <app-modal ref="confirmModal" modal-id="confirmModal" title="Are you sure you want to delete this item?" 
              @onSubmit="deleteProduct" submit-btn-class="btn-danger" submit-btn-name="Confirm">
            </app-modal>
            <product-modal modalName="productModal"></product-modal>
          </div>
    </div>
</template>
<script>
import { debounce } from "lodash";
import Spatie from "@/app/helpers/Spatie";
import Paginate from "vuejs-paginate";
import { ucFirst, sum } from "@/app/helpers/app";
import AppModal from "@/app/reusables/AppModal";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProductModal from "@/app/pages/products/partials/ProductModal";
export default {
  name: "DataTable",
  components: { Paginate, AppModal, ProductModal },
  data() {
    return {
      itemToDeleteId: "", // The id of the item in the table to delete
      paginate_by: 15,
      search_keyword: ""
    };
  },
  computed: {
    isSuperAdmin() {
      return new Spatie().userHasRole('super admin');
    },
    ...mapGetters({
      getProducts: "products/getProducts",
      getTotalPages: "products/getTotalPages",
      getProductToEdit: "products/getProductInContext",
      getSetStockSumTotal: "products/getSetStockSumTotal",
      getSetStockSumTotalIsBusy: "products/getSetStockSumTotalIsBusy"
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: "products/fetchProducts",
      removeProductItem: "products/removeProductById",
      updateProductItem: "products/updateProductItem",
      searchProd: "products/searchProduct",
      fetchStockSumTotal: "products/fetchStockSumTotal"
    }),
    ...mapMutations({
      setProductToEdit: "products/SET_PRODUCT_IN_CONTEXT",
      setProdInEditMode: "products/SET_PROD_MODAL_IN_EDIT_MODE"
    }),

    setItemToDeleteId(id) {
      this.itemToDeleteId = id;
      return this.$refs.confirmModal.show();
    },

    /** Sum up the total of products
     * spread all the sales items from store and sum up their total_costs
     */
    sumTotalCost() {
      return this.getProducts && {
        'by_cost_price' : sum([...this.getProducts.data], "total_cost_price"),
        'by_selling_price' : sum([...this.getProducts.data], "total_selling_price"),
        };
    },

    /** When edit button is clicked, the product should be set in the vuex store and for edit/update */
    setItemToEditId(item) {
      this.setProductToEdit(item);
      this.setProdInEditMode(true);
      this.$modal.show("productModal");
    },

    fetchFreshProds() {
      this.fetchProducts({
        page_number: 1,
        paginate_by: this.paginate_by
      });
    },

    deleteProduct() {
      // create an action to get all the fetchProducts.data by ...spreading them
      this.removeProductItem(this.itemToDeleteId);
      this.$refs.confirmModal.close();
    },

    fetchByPagination(pageNumb = 1) {
      this.fetchProducts({
        page_number: pageNumb,
        paginate_by: this.paginate_by
      });
    },

    searchProduct: debounce(function() {
      if (this.search_keyword) {
        return this.searchProd(this.search_keyword);
      }
      return this.fetchFreshProds();
    }, 500),

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    }
  },

  mounted() {
    this.fetchFreshProds();
  }
};
</script>