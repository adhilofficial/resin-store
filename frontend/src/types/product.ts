export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
  customizable: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Handmade Resin Coaster Set",
    slug: "handmade-resin-coaster-set",
    description:
      "A beautiful handmade resin coaster set with a unique artistic finish. Every piece is carefully crafted and slightly different.",
    price: 799,
    category: "Coasters",
    image: "/products/coaster.jpeg",
    stock: 10,
    featured: true,
    customizable: false,
  },

  {
    id: "2",
    name: "Customized Resin Tray",
    slug: "customized-resin-tray",
    description:
      "Elegant handmade resin tray designed for your home, kitchen or gifting. Personalization is available on request.",
    price: 1299,
    category: "Trays",
    image: "/products/tray.jpeg",
    stock: 8,
    featured: true,
    customizable: true,
  },

  {
    id: "3",
    name: "Pressed Flower Resin Keychain",
    slug: "pressed-flower-resin-keychain",
    description:
      "Handmade resin keychain featuring real pressed flowers and a decorative tassel. A perfect small personalized gift.",
    price: 299,
    category: "Keychains",
    image: "/products/resin-keychain.jpeg",
    stock: 10,
    featured: true,
    customizable: true,
  },

  {
    id: "4",
    name: "Personalized Resin Memory Plaque",
    slug: "personalized-resin-memory-plaque",
    description:
      "A handcrafted resin plaque made to preserve beautiful memories. Add names, dates, messages or special details.",
    price: 999,
    category: "Custom Gifts",
    image: "/products/plaque.jpeg",
    stock: 5,
    featured: true,
    customizable: true,
  },

  {
    id: "5",
    name: "Pressed Flower Resin Bookmark",
    slug: "pressed-flower-resin-bookmark",
    description:
      "A delicate handmade resin bookmark decorated with beautiful dried flowers. A thoughtful gift for book lovers.",
    price: 249,
    category: "Bookmarks",
    image: "/products/bookmark.jpeg",
    stock: 15,
    featured: true,
    customizable: false,
  },
];