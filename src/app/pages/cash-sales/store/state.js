export const state = () => ({
  sales: {
    created_at: "",
    items: [],
  },
  /** Products from server which we are ready to sell */
  products: [
    {
      cost_price: "25.00",
      id: 1,
      manufacturer: "Manufac 1",
      name: "Item one",
      quantity_remaining: 149,
      selling_price: "965.00",
      slug: "item-1-jsefe8Ouoy",
      stock_quantity: 483,
    },
    {
      cost_price: "15.00",
      id: 2,
      manufacturer: "Manufac 2",
      name: "Item two",
      quantity_remaining: 149,
      selling_price: "465.00",
      slug: "item2-jsefe8Ouoy",
      stock_quantity: 183,
    },
    {
      cost_price: "435.00",
      id: 3,
      manufacturer: "Manufac 3",
      name: "Item three",
      quantity_remaining: 149,
      selling_price: "865.00",
      slug: "item-3-jsefe8Ouoy",
      stock_quantity: 183,
    },
    {
      cost_price: "68.00",
      id: 4,
      manufacturer: "Manufac 4",
      name: "Item four",
      quantity_remaining: 19,
      selling_price: "65.00",
      slug: "item-3-jsefe8Ouoy",
      stock_quantity: 183,
    },
  ],
});
