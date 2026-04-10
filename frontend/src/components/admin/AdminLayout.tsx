import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ArrowLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/admin/customers", icon: Users, label: "Customers" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  const SidebarContent = () => (
    <>
      <div className={cn("border-b border-border overflow-hidden", collapsed ? "p-2" : "p-4")}>
        <Link to="/" className={cn("flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs", collapsed && "justify-center")}>
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Back to Store</span>}
        </Link>
        <h2 className={cn("font-serif font-bold text-foreground mt-3 transition-all whitespace-nowrap", collapsed ? "text-sm text-center" : "text-lg")}>
          {collapsed ? "EM" : "EvenMore Admin"}
        </h2>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg text-sm font-medium transition-all",
              collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
              isActive(item.to)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-border text-xs text-muted-foreground hover:text-foreground"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 h-full bg-card flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card">
          <button className="md:hidden p-1.5 hover:bg-accent rounded-md" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-foreground text-sm">Admin Panel</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
