<template>
  <auth-layout>
      <div class="d-sm-flex align-items-center justify-content-between mb-4" slot="heading">
        <h1 class="h3 mb-4 text-gray-800">Products</h1>

        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="$refs.confirmEraseQuantitiesModal.show()" class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm">
              <i class="fas fa-eraser"></i> Erase Stock Quantities
            </button>
          </div>
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <button @click="addProduct" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i class="fas fa-plus"></i> Add Product
            </button>
          </div>
        </div>
      </div>
    <div slot="content">
      <!-- Content here -->
      <data-table></data-table>
      <!-- Content here Ends -->

      <!-- Zeroing items modal -->
      <app-modal 
        ref="confirmEraseQuantitiesModal" 
        modal-id="confirmEraseQuantitiesModal" 
        title="Taking this action cannot be reverted. Are you sure you sure you want to zero all stock items?" 
        @onSubmit="eraseAllStockQuantities" 
        submit-btn-class="btn-danger" 
        submit-btn-name="Confirm">
      </app-modal>
      <!-- Zeroing items modal ends -->
    </div>
  </auth-layout>
</template>

<script>
import { ucFirst } from "@/app/helpers/app";
import AppModal from "@/app/reusables/AppModal";
import AuthLayout from "@/app/layouts/auth/Layout";
import DataTable from "@/app/pages/products/partials/DataTable";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Products",
  components: { AuthLayout, DataTable, AppModal },

  computed: {
    ...mapGetters({
      getProductToEdit: "products/getProductInContext"
    })
  },
  methods: {
    ...mapActions({
      updateStockQuantities: "products/updateStockQuantities",
    }),
    ...mapMutations({
      setProductInContext: "products/SET_PRODUCT_IN_CONTEXT",
      setProdInEditMode: "products/SET_PROD_MODAL_IN_EDIT_MODE"
    }),

    /** Make all stock quantities zero */
    async eraseAllStockQuantities() {
      await this.updateStockQuantities().then(() => {
        return this.$refs.confirmEraseQuantitiesModal.close();
      });
    },

    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },

    addProduct() {
      this.setProductInContext("");
      const productToEdit = { ...this.getProductToEdit };
      this.setProductInContext(productToEdit);
      this.setProdInEditMode(false);
      this.$modal.show("productModal");
    },

    /** Remove item from storage by index
     *
     * @param { Int } itemIndex - The index of the array item
     */
    removeItemByIndex(itemIndex) {
      this.$store.commit("cashsales/REMOVE_SALE_ITEM", itemIndex);
    }
    
  }
};
</script>
