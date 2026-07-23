import type { Order } from "../types";

export const mockOrders: Order[] = [
  {
    id: 1001,
    date: "July 20, 2026",
    status: "Completed",
    items: [
      {
        product: {
          id: 1,
          name: "Gaming Mouse",
          price: 39.99,
          imageUrl: "/assets/gaming-mouse.jpg",
          category: "Accessories",
          description: "Ergonomic wireless gaming mouse with RGB lighting.",
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: "Mechanical Keyboard",
          price: 79.99,
          imageUrl: "/assets/keyboard.jpg",
          category: "Accessories",
          description: "Tactile mechanical keyboard with hot-swappable switches.",
        },
        quantity: 1,
      },
    ],
    total: 159.97,
  },
  {
    id: 1002,
    date: "July 15, 2026",
    status: "Shipped",
    items: [
      {
        product: {
          id: 3,
          name: "Wireless Headphones",
          price: 129.99,
          imageUrl: "/assets/headphones.jpg",
          category: "Audio",
          description: "Noise-cancelling over-ear wireless headphones.",
        },
        quantity: 1,
      },
    ],
    total: 129.99,
  },
  {
    id: 1003,
    date: "July 10, 2026",
    status: "Cancelled",
    items: [
      {
        product: {
          id: 4,
          name: "USB-C Hub",
          price: 24.99,
          imageUrl: "/assets/usb-hub.jpg",
          category: "Accessories",
          description: "7-in-1 USB-C hub with HDMI and card reader.",
        },
        quantity: 3,
      },
    ],
    total: 74.97,
  },
  {
    id: 1004,
    date: "July 5, 2026",
    status: "Processing",
    items: [
      {
        product: {
          id: 5,
          name: "27\" Monitor",
          price: 249.99,
          imageUrl: "/assets/monitor.jpg",
          category: "Displays",
          description: "27-inch QHD IPS monitor, 144Hz refresh rate.",
        },
        quantity: 1,
      },
      {
        product: {
          id: 6,
          name: "Monitor Arm",
          price: 45.0,
          imageUrl: "/assets/monitor-arm.jpg",
          category: "Accessories",
          description: "Adjustable single-monitor desk mount.",
        },
        quantity: 1,
      },
    ],
    total: 294.99,
  },
];

