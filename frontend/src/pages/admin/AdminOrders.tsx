import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockOrders, saveOrders, type Order } from "@/data/adminMockData";
import { Eye, Search, Download, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const allStatuses: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.phone.includes(q);
    }
    return true;
  });

  const updateStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveOrders(updated);
    if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, status });
  };

  const statusCounts = allStatuses.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  const exportCSV = () => {
    const header = "Order ID,Customer,Phone,Date,Total,Status,Items\n";
    const rows = orders.map((o) => 
      `"${o.id}","${o.customerName}","${o.phone}","${o.date}",${o.total},"${o.status}","${o.items.map(i => `${i.name}x${i.qty}`).join('; ')}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported orders.csv");
  };

  const printInvoice = (order: Order) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>Invoice - ${order.id}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
        h1 { font-size: 24px; margin-bottom: 4px; }
        .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eee; font-size: 14px; }
        th { font-weight: 600; color: #333; }
        .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 16px; }
        .footer { margin-top: 40px; font-size: 12px; color: #999; text-align: center; }
      </style></head><body>
      <h1>Invoice</h1>
      <p class="meta">Order: ${order.id}<br/>Date: ${order.date}<br/>Customer: ${order.customerName}<br/>Phone: ${order.phone}<br/>Address: ${order.address}</p>
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>
          ${order.items.map(i => `<tr><td>${i.name}</td><td>${i.qty}</td><td>₹${i.price}</td><td>₹${(i.price * i.qty).toLocaleString()}</td></tr>`).join("")}
        </tbody>
      </table>
      <p class="total">Total: ₹${order.total.toLocaleString()}</p>
      <p class="footer">Thank you for your order! — EvenMoreFoods</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-serif font-bold text-foreground">Orders</h2>
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${statusFilter === "all" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
        >
          All ({orders.length})
        </button>
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
          >
            {s} ({statusCounts[s]})
          </button>
        ))}
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Order</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                  <th className="text-right p-3 font-medium">Total</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3">
                      <p className="font-medium">{o.customerName}</p>
                      <p className="text-xs text-muted-foreground">{o.phone}</p>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{o.date}</td>
                    <td className="p-3 text-right font-medium">₹{o.total.toLocaleString()}</td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as Order["status"])}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${statusColor[o.status]}`}
                      >
                        {allStatuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelectedOrder(o)} className="p-1.5 hover:bg-accent rounded-md">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => printInvoice(o)} className="p-1.5 hover:bg-accent rounded-md" title="Print Invoice">
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Order {selectedOrder?.id}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value as Order["status"])}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${statusColor[selectedOrder.status]}`}
                  >
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Delivery Address</p>
                <p className="font-medium">{selectedOrder.address}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-border last:border-0">
                      <span>{item.name} × {item.qty}</span>
                      <span className="font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-3 font-bold text-foreground">
                  <span>Total</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => printInvoice(selectedOrder)} className="w-full gap-1.5">
                <Printer className="w-4 h-4" /> Print Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
