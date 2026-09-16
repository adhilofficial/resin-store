import type { CartItem } from "../context/CartContext";
import { STORE_WHATSAPP } from "../config/store";

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomOrderDetails {
  name: string;
  phone: string;
  email: string;
  productType: string;
  quantity: number;
  colors: string;
  customization: string;
  deliveryDate: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  budget: string;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface ResinOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;

  customer: CustomerDetails;

  items: CartItem[];

  subtotal: number;
  deliveryCharge: number;
  total: number;
  deliveryMethod: "standard" | "express";
}

const ORDERS_STORAGE_KEY = "resinart-orders";

export function generateOrderId(): string {
  const now = new Date();

  const date = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `RA-${date}-${random}`;
}

export function getOrders(): ResinOrder[] {
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (!savedOrders) {
      return [];
    }

    const parsed: unknown = JSON.parse(savedOrders);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as ResinOrder[];
  } catch {
    return [];
  }
}

function saveOrders(orders: ResinOrder[]) {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders)
  );
}

export function saveOrder(order: ResinOrder): void {
  const existingOrders = getOrders();

  saveOrders([
    order,
    ...existingOrders,
  ]);
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): void {
  const orders = getOrders();

  const updatedOrders = orders.map((order) =>
    order.id === orderId
      ? {
          ...order,
          status,
        }
      : order
  );

  saveOrders(updatedOrders);
}

export function deleteOrder(orderId: string): void {
  const orders = getOrders();

  saveOrders(
    orders.filter(
      (order) => order.id !== orderId
    )
  );
}

export function clearAllOrders(): void {
  localStorage.removeItem(ORDERS_STORAGE_KEY);
}

/**
 * Normal cart order
 */
export function createWhatsAppOrder(
  orderId: string,
  cartItems: CartItem[],
  cartSubtotal: number,
  deliveryCharge: number,
  customer: CustomerDetails,
  deliveryMethod: "standard" | "express" = "standard"
): boolean {
  if (cartItems.length === 0) {
    return false;
  }

  const total = cartSubtotal + deliveryCharge;

  const productLines = cartItems
    .map((item, index) => {
      const itemTotal =
        item.price * item.quantity;

      return `${index + 1}. ${item.name}
Qty: ${item.quantity} × ₹${item.price.toLocaleString(
        "en-IN"
      )}
Total: ₹${itemTotal.toLocaleString("en-IN")}`;
    })
    .join("\n\n");

  const message = `🛍️ RESINART ORDER

ORDER ID
────────────────────
${orderId}

CUSTOMER
────────────────────
Name: ${customer.name}
Phone: ${customer.phone}

DELIVERY ADDRESS
────────────────────
${customer.address}
${customer.city}
${customer.state}
PIN: ${customer.pincode}

DELIVERY METHOD
────────────────────
${
  deliveryMethod === "express"
    ? "Express Delivery"
    : "Standard Delivery"
}

PRODUCTS
────────────────────
${productLines}

────────────────────

SUBTOTAL: ₹${cartSubtotal.toLocaleString(
    "en-IN"
  )}

DELIVERY: ${
    deliveryCharge === 0
      ? "FREE"
      : `₹${deliveryCharge.toLocaleString(
          "en-IN"
        )}`
  }

TOTAL: ₹${total.toLocaleString("en-IN")}

Please confirm product availability and delivery details.

Thank you!
`;

  const order: ResinOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "Pending",
    customer,
    items: cartItems,
    subtotal: cartSubtotal,
    deliveryCharge,
    total,
    deliveryMethod,
  };

  saveOrder(order);

  const whatsappUrl =
    `https://wa.me/${STORE_WHATSAPP}` +
    `?text=${encodeURIComponent(message)}`;

  try {
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank"
    );

    if (!whatsappWindow) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "Failed to open WhatsApp:",
      error
    );

    return false;
  }
}

/**
 * Custom order
 */
export function createCustomWhatsAppOrder(
  order: CustomOrderDetails
): boolean {
  const deliveryDate =
    order.deliveryDate || "Not specified";

  const budget =
    order.budget || "Not specified";

  const colors =
    order.colors || "Not specified";

  const email =
    order.email || "Not provided";

  const message = `✨ RESINART CUSTOM ORDER

CUSTOMER
────────────────────
Name: ${order.name}
Phone: ${order.phone}
Email: ${email}

CUSTOM PIECE
────────────────────
Product: ${order.productType}
Quantity: ${order.quantity}
Preferred colors: ${colors}
Budget: ${budget}
Preferred delivery date: ${deliveryDate}

CUSTOMIZATION
────────────────────
${order.customization}

DELIVERY ADDRESS
────────────────────
${order.address}
${order.city}
${order.state}
PIN: ${order.pincode}

Please contact me to discuss the design,
availability, final price and delivery.

Thank you!
`;

  const whatsappUrl =
    `https://wa.me/${STORE_WHATSAPP}` +
    `?text=${encodeURIComponent(message)}`;

  try {
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank"
    );

    return Boolean(whatsappWindow);
  } catch (error) {
    console.error(
      "Failed to open WhatsApp:",
      error
    );

    return false;
  }
}