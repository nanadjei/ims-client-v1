export const state = () => ({
  sales: {
    created_at: "",
    items: [
      {
      number: 1,
      cost_price: "",
      manufacturer: "",
      name: "",
      quantity_remaining: "",
      selling_price: "",
      slug: "",
      stock_quantity: "",
    }
    ],
  },
  /** Products from server which we are ready to sell */
  products: [],
});
