/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('auction_items').del()
  await knex('auction_items').insert([
    {
      item_name: "Apple",
      description: "A juicy and crunchy fruit with a sweet and tart flavor.",
      quantity: 100
  },
  {
      item_name: "Banana",
      description: "A tropical fruit with a creamy texture and a slightly sweet taste.",
      quantity: 100
  },
  {
      item_name: "Carrot",
      description: "A root vegetable that is orange in color and packed with nutrients.",
      quantity: 100
  },
  {
      item_name: "Spinach",
      description: "A leafy green vegetable that is rich in iron and vitamins.",
      quantity: 100
  },
  {
      item_name: "Strawberry",
      description: "A sweet and juicy berry that is perfect for desserts and snacks.",
      quantity: 100
  },
  {
      item_name: "Broccoli",
      description: "A nutritious green vegetable with a mild and earthy flavor.",
      quantity: 100
  },
  {
      item_name: "Tomato",
      description: "A versatile fruit used in a wide range of culinary dishes.",
      quantity: 100
  },
  {
      item_name: "Cucumber",
      description: "A refreshing and hydrating vegetable commonly used in salads.",
      quantity: 100
  },
  {
      item_name: "Grapes",
      description: "Small and sweet fruits often enjoyed as a snack or in desserts.",
      quantity: 100
  },
  {
      item_name: "Pineapple",
      description: "A tropical fruit known for its sweet and tangy flavor.",
      quantity: 100
  },
  {
      item_name: "Lettuce",
      description: "A crispy and leafy green used in salads and sandwiches.",
      quantity: 100
  },
  {
      item_name: "Zucchini",
      description: "A summer squash that can be grilled, sautéed, or used in baking.",
      quantity: 100
  },
  {
      item_name: "Blueberry",
      description: "Small and antioxidant-rich berries often used in smoothies and baked goods.",
      quantity: 100
  },
  {
      item_name: "Cauliflower",
      description: "A versatile vegetable that can be roasted, mashed, or used as a pizza crust.",
      quantity: 100
  },
  {
      item_name: "Watermelon",
      description: "A juicy and hydrating fruit commonly enjoyed in the summertime.",
      quantity: 100
  },
  {
      item_name: "Avocado",
      description: "A creamy and nutrient-dense fruit used in salads, guacamole, and more.",
      quantity: 100
  },
  {
      item_name: "Orange",
      description: "A citrus fruit known for its sweet and tangy flavor.",
      quantity: 100
  },
  {
      item_name: "Potato",
      description: "A starchy vegetable that can be boiled, mashed, fried, or baked.",
      quantity: 100
  },
  {
      item_name: "Eggplant",
      description: "A purple vegetable used in Mediterranean and Asian cuisines.",
      quantity: 100
  },
  {
      item_name: "Peach",
      description: "A soft and fuzzy fruit with a sweet and juicy flesh.",
      quantity: 100
  }
  
  ]);
};
