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
    name: "Ocean Blue Coaster Set",
    slug: "ocean-blue-coaster-set",
    description:
      "Handcrafted resin coaster set inspired by ocean waves, designed to bring an elegant artistic touch to your table.",
    price: 799,
    category: "Coasters",
    image: "/products/coaster.jpeg",
    stock: 10,
    featured: true,
    customizable: false,
  },

  {
    id: "2",
    name: "Rose Gold Resin Tray",
    slug: "rose-gold-resin-tray",
    description:
      "Elegant handmade resin tray with a soft rose-gold finish, perfect for home styling, gifting and special occasions.",
    price: 1299,
    category: "Trays",
    image: "/products/tray.jpeg",
    stock: 8,
    featured: true,
    customizable: true,
  },

  {
    id: "3",
    name: "Custom Name Keychain",
    slug: "custom-name-keychain",
    description:
      "Handmade resin keychain featuring real pressed flowers and a decorative tassel. Personalize it with your name or initials.",
    price: 299,
    category: "Keychains",
    image: "/products/resin-keychain.jpeg",
    stock: 10,
    featured: true,
    customizable: true,
  },

  {
    id: "4",
    name: "Personalized Couple Plaque",
    slug: "personalized-couple-plaque",
    description:
      "A beautiful handmade resin plaque designed to preserve special memories with names, dates and meaningful details.",
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
      "Elegant handmade resin bookmark decorated with preserved flowers, making a thoughtful gift for every book lover.",
    price: 399,
    category: "Bookmarks",
    image: "/products/bookmark.jpeg",
    stock: 10,
    featured: true,
    customizable: false,
  },
];