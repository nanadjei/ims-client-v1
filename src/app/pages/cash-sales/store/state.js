/** Items blue print */
// export const itemsBlueprint = 
//       {
//       number: 1,
//       product_id: "",
//       name: "",
//       quantity: 1,
//       selling_price: 0.00,
//       total_cost: 0.00
//       };

export const state = () => ({
  sales: {
    created_at: "",
    items: [
      {
        number: 1,
        product_id: "",
        name: "",
        quantity: 1,
        selling_price: 0.00,
        total_cost: 0.00
      }
    ],
  },
  /** Products from server which we are ready to sell */
  products: [],

});
