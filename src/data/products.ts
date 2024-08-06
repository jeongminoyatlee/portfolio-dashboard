// src/data/products.ts

export type Product = {
    name: string;
    category: string;
    price: number;
    color: string;
  };
  
  export const initialProductData: Product[] = [
    {
      name: "Apple Watch Series 7",
      category: "Accessories",
      price: 296,
      color: "Silver",
    },
    {
      name: "Macbook Pro M1",
      category: "Laptop",
      price: 546,
      color: "Silver",
    },
    {
      name: "Dell Inspiron 15",
      category: "Laptop",
      price: 443,
      color: "Black",
    },
    {
      name: "HP Probook 450",
      category: "Laptop",
      price: 499,
      color: "Black",
    },
    {
      name: "Sony WH-1000XM4",
      category: "Accessories",
      price: 349,
      color: "Black",
    },
    {
      name: "Samsung Galaxy S21",
      category: "Phone",
      price: 799,
      color: "Black",
    },
    {
      name: "Google Pixel 6",
      category: "Phone",
      price: 599,
      color: "White",
    },
    {
      name: "Bose QuietComfort 35 II",
      category: "Accessories",
      price: 299,
      color: "Black",
    },
    {
      name: "Apple iPad Pro",
      category: "Tablet",
      price: 799,
      color: "Silver",
    },
    {
      name: "Microsoft Surface Laptop 4",
      category: "Laptop",
      price: 999,
      color: "Black",
    },
    {
      name: "Canon EOS R5",
      category: "Camera",
      price: 3899,
      color: "Black",
    },
    {
      name: "Nikon Z6 II",
      category: "Camera",
      price: 1999,
      color: "Black",
    },
    {
      name: "DJI Mavic Air 2",
      category: "Drone",
      price: 799,
      color: "Gray",
    },
    {
      name: "GoPro HERO9",
      category: "Camera",
      price: 399,
      color: "Black",
    },
  ];
  
  export const categories = ["Select", "Accessories", "Laptop", "Phone", "Tablet", "Camera", "Drone", "TV"];
  export const colors = ["Select", "Black", "White", "Silver", "Gray", "Blue", "Red"];
  
  // Calculate the total number of products
  export const totalProducts = initialProductData.length;
  