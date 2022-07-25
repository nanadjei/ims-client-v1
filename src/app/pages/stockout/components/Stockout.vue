<template>
  <auth-layout>
    <h1 class="h3 mb-4 text-gray-800" slot="heading">Out Of Stock</h1>
    <div slot="content">
      <!-- Content here -->

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
                                            <select @change="fetchStockoutProds" v-model="paginate_by" name="dataTable_length" class="custom-select custom-select-sm fs-8 form-control" aria-controls="dataTable">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="25">25</option>
                                                <option value="100">100</option>
                                            </select> entries</label>
                                    </div>
                                </div>
                                <!-- <div class="col-sm-12 col-md-6">
                                    <div id="dataTable_filter" class="dataTables_filter float-right">
                                        <label>Search:<input type="search" @input="searchProduct" v-model="search_keyword" class="form-control form-control-sm" placeholder="" aria-controls="dataTable"></label>
                                    </div>
                                </div> -->
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table v-if="getProducts && (getProducts.data.length)" class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Quantity Remaining</th>
                                                <th>Cost Price</th>
                                                <th>Selling Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <!-- Display the aggregated stock values -->
                                        <tbody>
                                            <tr v-for="(item, index) in getProducts.data" :key="index">
                                                <td> {{ item.id }}</td>
                                                <td width="50%" class="cursor-pointer">{{ _ucFirst(item.name) }}</td>
                                                <td> {{ item.quantity_remaining }}</td>
                                                <td>{{ item.cost_price }}</td> 
                                                <td>{{ (item.selling_price) }}</td>
                                                <td> <span v-show="item.quantity_remaining == 0" class="badge badge-danger">Out Of Stock</span> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div v-else style="color:#B6BACC !important;" class="text-center"> 
                                      <i class="fas fa-box-open fa-3x"></i>
                                      <p class="pt-6">None of your items are out of stock</p> 
                                    </div>
                                </div>

                            </div>
                            
                            <!-- Pagination -->
                            <div v-show="getProducts && (getProducts.data.length)" class="row">
                              <!-- <div class="col-sm-12 col-md-5">
                                  <div class="dataTables_info">{{ `Showing 1 to ${paginate_by} of ${getProducts && getProducts.pagination.total} entries` }}</div>
                                </div> -->
                                <div class="col-sm-12 col-md-7">
                                  <div class="dataTables_paginate paging_simple_numbers">
                                  <paginate 
                                    v-show="getProducts && getProducts.data"
                                    :page-count="getTotalPages"
                                    :page-range="3"
                                    :margin-pages="2"
                                    :click-handler="fetchStockoutProds"
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
          </div>
    </div>
  </auth-layout>
</template>

<script>
import Paginate from "vuejs-paginate";
import { ucFirst } from "@/app/helpers/app";
import AuthLayout from "@/app/layouts/auth/Layout";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Stockout",
  components: { AuthLayout, Paginate },
  data() {
    return {
      paginate_by: 15
    }
  },
  computed: {
    ...mapGetters({
      getProducts: "stockout/getStockoutData",
      getTotalPages: "stockout/getTotalPages"
    }),
  },
  methods: {
    ...mapActions({
      fetchByPagination: "stockout/fetchStockoutData",
    }),

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },
    fetchStockoutProds(pageNumb = 1) {
    return this.fetchByPagination({
        page_number: pageNumb,
        paginate_by: this.paginate_by
      });
    }
  },
  
  mounted() {
    this.fetchStockoutProds(1);
  }
};
</script>
