import { supabase } from "../lib/supabase";
import type { CartItem } from "../context/CartContext";
import type { CustomerDetails } from "./whatsapp";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface ResinOrder {
  id: string;

  customer: CustomerDetails;

  items: CartItem[];

  subtotal: number;

  deliveryCharge: number;

  deliveryMethod: "standard" | "express";

  total: number;

  status: OrderStatus;

  createdAt: string;

  updatedAt: string;
}

function mapOrder(row: any): ResinOrder {
  return {
    id: row.id,

    customer: {
      name: row.customer_name,
      phone: row.customer_phone,
      address: row.customer_address,
      city: row.customer_city,
      state: row.customer_state,
      pincode: row.customer_pincode,
    },

    items: row.items,

    subtotal: Number(row.subtotal),

    deliveryCharge: Number(row.delivery_charge),

    deliveryMethod:
      row.delivery_method === "express"
        ? "express"
        : "standard",

    total: Number(row.total),

    status: row.status as OrderStatus,

    createdAt: row.created_at,

    updatedAt: row.updated_at,
  };
}

export async function saveOrder(
  order: ResinOrder
): Promise<ResinOrder> {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      id: order.id,

      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_address: order.customer.address,
      customer_city: order.customer.city,
      customer_state: order.customer.state,
      customer_pincode: order.customer.pincode,

      items: order.items,

      subtotal: order.subtotal,
      delivery_charge: order.deliveryCharge,
      delivery_method: order.deliveryMethod,
      total: order.total,

      status: order.status,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase order creation failed:", error);
    throw error;
  }

  return mapOrder(data);
}

export async function getOrders(): Promise<ResinOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }

  return (data ?? []).map(mapOrder);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    console.error(
      "Failed to update order status:",
      error
    );

    throw error;
  }
}

export async function deleteOrder(
  orderId: string
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    console.error(
      "Failed to delete order:",
      error
    );

    throw error;
  }
}