<template>
    <modal :name="modalName" :height="800" :width="500">
            <div class="modal-header">
                <h5 class="modal-title" id="for-confirm">{{ productInEditMode ? `Update Product` : "Create Product" }}</h5>
                <button @click="closeModal" class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="product-name"> Product Name: </label>
                    <input id="product-name" type="text" class="form-control" v-model="getProductToEdit.name">
                </div>
                <div class="form-group">
                    <label for="description"> Description: </label>
                    <textarea id="description" placeholder="Enter description" class="form-control" v-model="getProductToEdit.description"></textarea>
                </div>
                <div class="form-group">
                    <label for="manufacturer"> Manufacturer: </label>
                    <input id="manufacturer" type="text" class="form-control" v-model="getProductToEdit.manufacturer">
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="stk-qty"> Stock Quantity: </label>
                        <input id="stk-qty" type="number" class="form-control" v-model="getProductToEdit.stock_quantity">
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="rem-qty"> Remaining Quantity: </label>
                        <input id="rem-qty" type="number" class="form-control" v-model="getProductToEdit.quantity_remaining">
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="cost-price"> Cost Price: </label>
                        <input id="cost-price" type="number" class="form-control" v-model="getProductToEdit.cost_price">
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                        <label for="selling-price"> Selling Price: </label>
                        <input id="selling-price" type="number" class="form-control" v-model="getProductToEdit.selling_price">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="discount"> Discount: </label>
                        <input id="discount" type="number" class="form-control" v-model="getProductToEdit.discount">
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                        <label for="in-stock"> Stock Availability: </label>
                        <select class="form-control" id="in-stock" v-model="getProductToEdit.in_stock">
                            <option value="1">In Stock</option>
                            <option value="0">Out of Stock</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="expirty-date"> Expiry Date: </label>
                    <input id="expirty-date" type="date" class="form-control" v-model="getProductToEdit.expired_at">
                </div>
                <div class="modal-footer">
                <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="submit" type="submit" :disabled="isBusy" class="btn btn-primary"><i v-show="isBusy" class="fas fa-circle-notch fa-spin"></i> {{ isBusy ? 'loading...' : 'Submit' }}</button>
            </div>
        </div>
    </modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProductModal",
  props: ["modalName"],

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      getProductToEdit: "products/getProductInContext",
      productInEditMode: "products/getProdModalInEditMode",
      isBusy: "products/getProdModalIsBusy"
    })
  },

  methods: {
    ...mapActions({
      updateProductItem: "products/updateProductItem"
    }),
    submit() {
      this.productInEditMode
        ? this.updateProductItem({
            url: "products/" + this.getProductToEdit.id,
            method: "put",
            data: this.getProductToEdit
          })
        : this.updateProductItem({
            url: "products/",
            method: "post",
            data: this.getProductToEdit
          });

      this.closeModal();
    },
    closeModal() {
      return this.$modal.hide(this.modalName);
    }
  }
};
</script>