import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/catalog";
import { mockOrders, mockCustomers, revenueByMonth, ordersByCategory } from "@/data/adminMockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getProductImage } from "@/data/productImages";

const COLORS = ["hsl(145,30%,32%)", "hsl(38,70%,55%)", "hsl(35,30%,60%)", "hsl(30,10%,50%)", "hsl(0,84%,60%)"];

const totalRevenue = mockOrders.reduce((s, o) => s + o.total, 0);

const stats = [
  { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
  { label: "Total Orders", value: mockOrders.length, icon: ShoppingCart, color: "text-primary" },
  { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-primary" },
  { label: "Customers", value: mockCustomers.length, icon: Users, color: "text-primary" },
];

const recentOrders = mockOrders.slice(0, 5);

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const lowStockProducts = products.filter((p) => !p.inStock);

// Compute top selling from order items
const salesMap: Record<string, { name: string; qty: number; revenue: number }> = {};
mockOrders.forEach((o) =>
  o.items.forEach((item) => {
    if (!salesMap[item.productId]) salesMap[item.productId] = { name: item.name, qty: 0, revenue: 0 };
    salesMap[item.productId].qty += item.qty;
    salesMap[item.productId].revenue += item.price * item.qty;
  })
);
const topSelling = Object.entries(salesMap)
  .sort(([, a], [, b]) => b.revenue - a.revenue)
  .slice(0, 5)
  .map(([id, data]) => ({ id, ...data }));

const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-serif font-bold text-foreground">Dashboard</h2>

    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Low Stock Alert */}
    {lowStockProducts.length > 0 && (
      <Card className="border-destructive/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" /> Out of Stock Alert ({lowStockProducts.length} products)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {lowStockProducts.slice(0, 8).map((p) => (
              <div key={p.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-destructive/5 border border-destructive/20 text-xs">
                <img src={getProductImage(p.id, p.category)} alt={p.name} className="w-6 h-6 rounded object-cover" />
                <span className="font-medium text-foreground">{p.name}</span>
              </div>
            ))}
            {lowStockProducts.length > 8 && (
              <span className="text-xs text-muted-foreground self-center">+{lowStockProducts.length - 8} more</span>
            )}
          </div>
        </CardContent>
      </Card>
    )}

    {/* Charts */}
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByMonth}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(145,30%,32%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Orders by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={ordersByCategory} dataKey="orders" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={({ category }) => category}>
                {ordersByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    {/* Top Selling + Recent Orders */}
    <div className="grid md:grid-cols-2 gap-4">
      {/* Top Selling Products */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {topSelling.map((item, i) => (
              <div key={item.id} className="flex items-center gap-3 p-3">
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <img src={getProductImage(item.id, "")} alt={item.name} className="w-8 h-8 rounded object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.qty} units sold</p>
                </div>
                <span className="text-sm font-semibold text-foreground">₹{item.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Order</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-right p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3">{o.customerName}</td>
                    <td className="p-3 text-right font-medium">₹{o.total.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
