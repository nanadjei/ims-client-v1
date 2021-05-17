<template>
  <!-- Inventory Modal-->
  <div
    class="modal fade"
    id="inventory-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="for-inventory"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content scrollable-content">
        <div class="modal-header">
          <h5 class="modal-title" id="for-inventory">
            Search for the product you want to sell?
          </h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- Content here -->
          <input
            id="search-input"
            type="text"
            @input="handleFilter"
            v-model="search"
            class="form-control"
            autocomplete="off"
            placeholder="Search..."
          />
           <select id="products" multiple="none" class="data-list" v-model="highlighedProd" ref="inventory-modal">
              <option :id="`product-${product.id}`" class="data-item" :selected="product.id == (highlighedProd.length && highlighedProd[0]['id'])" v-for="product in computedProducts" :value="product" :key="product.id">{{ _ucFirst(product.name) }}</option>
          </select>
        </div>
        <div class="modal-footer" v-if="highlighedProd.length">
          <!-- Product details here -->
          <div class="cancel-container">
            <div class="row">
              <div class="col-4">
                <div class="total-cost">
                  Qty Available:
                  {{
                    highlighedProd.length
                      ? highlighedProd[0].quantity_remaining
                      : ""
                  }}
                </div>
              </div>
              <div class="col-4">
                <div class="total-cost">
                  Unit Price:
                  {{
                    highlighedProd.length
                      ? highlighedProd[0].selling_price
                      : ""
                  }}
                </div>
              </div>
              <div class="col-4">
                <div class="total-cost">
                  Expiry Date:
                  {{
                    highlighedProd.length
                      ? this.$moment(highlighedProd[0].expired_at).format(
                          "Do MMMM YYYY"
                        )
                      : ""
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ucFirst } from "@/app/helpers/app";
import { mapGetters } from "vuex";
import Mixin from "@/app/pages/cash-sales/mixins/mixin";
export default {
  name: "InventoryModal",
  mixins: [Mixin],
  data() {
    return {
      highlighedProd: [], // when a product is highlighted in the modal table, set it here
      search: "", // Search keyword
      highlighedProdId: "", // Very important for filtering
    };
  },
  computed: {
    ...mapGetters({
      getProducts: "cashsales/getProducts",
      getSaleItems: "cashsales/getSaleItems",
    }),
    computedProducts() {
      return this.handleFilter();
    },
  },
  mounted() {
    this.highlighedProd[0] = this.computedProducts && this.computedProducts[0];

    $(window).keypress((e) => {
      if (e.keyCode == 32) {
        // When spacebar is pressed
        this.triggerInventoryModal();
      }
    });
    this.addItemHighlightedItemToSales(); // When enter is pressed, add item to sales table
  },
  methods: {
    /** Filter sales items by item id
     *
     * @param { Int } prodId - The id of the product you want to filter/find
     */
    filterSalsesProdsById(prodId) {
      return [...this.getSaleItems].filter((item) => {
        return item.id == prodId;
      });
    },

    /** By default a sale product should have one quantity */
    selectedProdWithOneQty() {
      return Object.assign(this.highlighedProd[0], {
        quantity: 1,
        total_cost: 1 * this.highlighedProd[0].selling_price,
      });
    },

    handleFilter() {
      return (
        this.getProducts &&
        this.getProducts.filter((product) => {
          return product.name.match(ucFirst(this.search));
        })
      );
    },

    /** When an item is heighlighted using the up or down arrow keys, the user can press enter
     * to add it to sales table.
     */
    addItemHighlightedItemToSales() {
      window.$("#inventory-modal").keypress((e) => {
        if (e.charCode == 13 && (this.highlighedProd.length && !this.highlighedProd[0]['quantity_remaining'] == 0)) {
          // When Enter is pressed
          if (!this.filterSalsesProdsById(this.highlighedProdId[0]).length) {
            this.$store.commit(
              "cashsales/SET_SALE_ITEM",
              this.selectedProdWithOneQty()
            );
          }

          $("#inventory-modal").modal("hide");
          this.highlighedProd = [];

          // Auto click on the quantity cell of the recently added sale item table after the DOM has been updated.
          this.$nextTick(() => {
            $(document).ready(() => {
              if (this.filterSalsesProdsById(this.highlighedProdId).length) {
                $("tr #input-" + this.highlighedProdId).focus();
                return (this.highlighedProdId = ""); // Prevent pressing enter to dulplicate last item in sales table.
              }
              return $("tr .qty:last").focus();
            });
          });
        }
      });
    },


    /** Make first letter uppercase */
    _ucFirst(string) {
      return ucFirst(string);
    },
  },
  
};
</script>
