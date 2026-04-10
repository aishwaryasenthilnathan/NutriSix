import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockCustomers, mockOrders, type Customer } from "@/data/adminMockData";
import { Search, Eye, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
  });

  const deleteCustomer = (id: string) => {
    if (confirm("Delete this customer?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      toast.success("Customer deleted");
    }
  };

  const getCustomerOrders = (name: string) => {
    return mockOrders.filter((o) => o.customerName === name);
  };

  const exportCSV = () => {
    const header = "Name,Email,Phone,Orders,Total Spent,Joined\n";
    const rows = customers.map((c) => `"${c.name}","${c.email}","${c.phone}",${c.totalOrders},${c.totalSpent},${c.joinedDate}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported customers.csv");
  };

  const customerOrders = selectedCustomer ? getCustomerOrders(selectedCustomer.name) : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-serif font-bold text-foreground">Customers</h2>
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers..." className="pl-9" />
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Desktop */}
          <div className="hidden md:block overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-right p-3 font-medium">Orders</th>
                  <th className="text-right p-3 font-medium">Total Spent</th>
                  <th className="text-left p-3 font-medium">Joined</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                      <p className="text-xs text-muted-foreground">{c.phone}</p>
                    </td>
                    <td className="p-3 text-right">{c.totalOrders}</td>
                    <td className="p-3 text-right font-medium">₹{c.totalSpent.toLocaleString()}</td>
                    <td className="p-3 text-muted-foreground">{c.joinedDate}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelectedCustomer(c)} className="p-1.5 hover:bg-accent rounded-md">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteCustomer(c.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-border">
            {filtered.map((c) => (
              <div key={c.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setSelectedCustomer(c)} className="p-1.5 hover:bg-accent rounded-md">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteCustomer(c.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.totalOrders} orders</span>
                  <span className="font-medium text-foreground">₹{c.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedCustomer.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedCustomer.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedCustomer.joinedDate}</p>
                  <p className="text-xs text-muted-foreground">Joined</p>
                </div>
              </div>

              {customerOrders.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Order History</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {customerOrders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30 text-sm">
                        <div>
                          <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                          <p className="text-xs text-muted-foreground">{o.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{o.total.toLocaleString()}</p>
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${
                            o.status === "delivered" ? "bg-green-100 text-green-800" :
                            o.status === "cancelled" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>{o.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;
