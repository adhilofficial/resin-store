import type { CartItem } from "../context/CartContext";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  createdAt: string;

  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  items: CartItem[];

  subtotal: number;
  deliveryCharge: number;
  total: number;

  deliveryMethod: "standard" | "express";

  status: OrderStatus;
}