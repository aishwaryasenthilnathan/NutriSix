import { products } from "./catalog";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  items: { productId: string; name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
  address: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  lastOrder: string;
}

const names = ["Ravi Kumar", "Priya Sharma", "Anitha Devi", "Karthik Raja", "Meena Lakshmi", "Suresh Babu", "Divya Mohan", "Vijay Anand", "Lakshmi Narayan", "Deepa Krishnan", "Senthil Murugan", "Gomathi Sundari", "Arun Prakash", "Kavitha Rajan", "Bala Subramanian"];

const cities = ["Chennai", "Madurai", "Coimbatore", "Trichy", "Salem", "Erode", "Tirunelveli", "Thanjavur", "Vellore", "Dindigul"];

function randomDate(daysBack: number) {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toISOString().split("T")[0];
}

function generateOrders(): Order[] {
  const statuses: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  const orders: Order[] = [];
  for (let i = 0; i < 45; i++) {
    const numItems = Math.floor(Math.random() * 4) + 1;
    const items: Order["items"] = [];
    for (let j = 0; j < numItems; j++) {
      const p = products[Math.floor(Math.random() * products.length)];
      items.push({ productId: p.id, name: p.name, qty: Math.floor(Math.random() * 3) + 1, price: p.price });
    }
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    orders.push({
      id: `ORD-${String(1000 + i)}`,
      customerName: names[Math.floor(Math.random() * names.length)],
      customerEmail: `customer${i}@example.com`,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      items,
      total,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: randomDate(60),
      address: `${Math.floor(Math.random() * 200) + 1}, Main St, ${cities[Math.floor(Math.random() * cities.length)]}`,
    });
  }
  return orders.sort((a, b) => b.date.localeCompare(a.date));
}

function generateCustomers(): Customer[] {
  return names.map((name, i) => ({
    id: `CUS-${String(100 + i)}`,
    name,
    email: `${name.toLowerCase().replace(/ /g, ".")}@example.com`,
    phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
    totalOrders: Math.floor(Math.random() * 15) + 1,
    totalSpent: Math.floor(Math.random() * 8000) + 500,
    joinedDate: randomDate(365),
    lastOrder: randomDate(30),
  }));
}

// Persist in localStorage so edits survive refresh
function getOrInit<T>(key: string, generator: () => T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  const data = generator();
  localStorage.setItem(key, JSON.stringify(data));
  return data;
}

export const mockOrders = getOrInit("admin_orders", generateOrders);
export const mockCustomers = getOrInit("admin_customers", generateCustomers);

export function saveOrders(orders: Order[]) {
  localStorage.setItem("admin_orders", JSON.stringify(orders));
}

export const revenueByMonth = [
  { month: "Jan", revenue: 24500 },
  { month: "Feb", revenue: 31200 },
  { month: "Mar", revenue: 28800 },
  { month: "Apr", revenue: 35600 },
  { month: "May", revenue: 42100 },
  { month: "Jun", revenue: 38900 },
];

export const ordersByCategory = [
  { category: "Millet Rava", orders: 85 },
  { category: "Millet Rice", orders: 72 },
  { category: "Health Mix", orders: 68 },
  { category: "Cookies", orders: 55 },
  { category: "Snacks", orders: 48 },
];
