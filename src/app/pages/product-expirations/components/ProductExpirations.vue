<template>
    <auth-layout>
        <div class="d-sm-flex align-items-center justify-content-between mb-4" 
            slot="heading">
            <h1 class="h3 mb-4 text-gray-800">Product Expirations</h1>
        </div>
            <div slot="content">
                <p class="mb-4">This table represent a list of products with their respective expiry dates. </p>
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
                                                    <select @change="_fetchProducts" v-model="paginate_by" name="dataTable_length" class="custom-select custom-select-sm fs-8 form-control" aria-controls="dataTable">
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
                                                        <th>Expired At</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in getProducts && getProducts.data" :key="index">
                                                        <td> {{ item.id }}</td>
                                                        <td width="50%" class="cursor-pointer">{{ item.product && item.product.name }}</td>
                                                        <td> {{ item.product && item.product.stock_quantity }}</td>
                                                        <td> {{ item.product && item.product.quantity_remaining }}</td>
                                                        <td>{{ item.cost_price }}</td> 
                                                        <td>{{ (item.selling_price) }}</td>
                                                        <td> <span :class="`badge badge-${setClass(item.quantity_remaining, item.expired_at)}`">{{ convertTimeStamp(item.expired_at) }}</span> </td>
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
                                    <div v-show="getProducts && getProducts.data && (getProducts.data.length)" class="row">
                                        <div class="col-sm-12 col-md-7">
                                        <div class="dataTables_paginate paging_simple_numbers">
                                        <paginate 
                                            v-show="getProducts && getProducts.data"
                                            :page-count="getTotalPages"
                                            :page-range="3"
                                            :margin-pages="2"
                                            :click-handler="_fetchProducts"
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
import { debounce } from "lodash";
import Paginate from "vuejs-paginate";
import { ucFirst } from "@/app/helpers/app";
import AuthLayout from "@/app/layouts/auth/Layout";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "ProductExpirations",

    components: { AuthLayout, Paginate },

    computed: {
        ...mapGetters({
            getProducts: "productExpirations/getProducts",
            getTotalPages: "productExpirations/getTotalPages"
        })
    },

    data() {
        return {
            paginate_by: 15,
            search_keyword: ""
        }
    },

    methods: {
    ...mapActions({
            fetchProducts: "productExpirations/fetchProducts",
            searchProd: "productExpirations/searchProduct",
        }),

        setClass(qty, dateTime) {
            if(qty && qty > 0) {
                const sixMonths = this.$moment().add(process.env.VUE_APP_PRODUCTS_EXPIRE_IN_MONTHS, 'months').format("YYYY-MM-DD");
                if(dateTime && dateTime < this.$moment().format("YYYY-MM-DD")) {
                    return 'danger';
                }
                if(dateTime && dateTime < sixMonths) {
                    return 'warning';
                }
                if(dateTime && (dateTime > sixMonths && dateTime < this.$moment().add(1, 'year').format("YYYY-MM-DD")) ) {
                    return 'success';
                }
            }
            
        },

        async _fetchProducts(pageNumb = 1) {
            return await this.fetchProducts({
                page_number: pageNumb,
                paginate_by: this.paginate_by
            });
        },

        /** Make first letter uppercase */
        _ucFirst(string) {
            return ucFirst(string);
        },

        convertTimeStamp(dateTime) {
            return this.$moment(dateTime).format("Do MMMM YYYY");
        },

        searchProduct: debounce(function() {
            if (this.search_keyword) {
                return this.searchProd(this.search_keyword);
            }
            return this._fetchProducts();
            }, 500),
    },

    created() {
        this._fetchProducts();
    }
}
</script>