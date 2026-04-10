import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("EvenMoreFoods");
  const [phone, setPhone] = useState("+91 9876543210");
  const [email, setEmail] = useState("hello@evenmorefoods.com");
  const [whatsapp, setWhatsapp] = useState("919876543210");
  const [address, setAddress] = useState("123 Millet Street, Chennai, Tamil Nadu 600001");
  const [description, setDescription] = useState("Premium millet-based healthy foods delivered to your doorstep.");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");

  // Business hours
  const [businessHours, setBusinessHours] = useState("Mon-Sat: 9AM - 8PM, Sun: 10AM - 6PM");

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [orderNotifs, setOrderNotifs] = useState(true);
  const [lowStockNotifs, setLowStockNotifs] = useState(true);

  // Shipping
  const [freeShippingMin, setFreeShippingMin] = useState("500");
  const [shippingCharge, setShippingCharge] = useState("50");
  const [deliveryDays, setDeliveryDays] = useState("3-5");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-serif font-bold text-foreground">Settings</h2>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Store Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Store Name</Label>
                  <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Contact Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>WhatsApp Number</Label>
                  <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Store Address</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Store Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Business Hours</Label>
                <Input value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Social Media Links</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Instagram URL</Label>
                <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/yourstore" />
              </div>
              <div className="space-y-1.5">
                <Label>Facebook URL</Label>
                <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/yourstore" />
              </div>
              <div className="space-y-1.5">
                <Label>YouTube URL</Label>
                <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/@yourstore" />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full sm:w-auto">Save Settings</Button>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Shipping & Delivery</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Shipping Charge (₹)</Label>
                  <Input type="number" value={shippingCharge} onChange={(e) => setShippingCharge(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Free Shipping Above (₹)</Label>
                  <Input type="number" value={freeShippingMin} onChange={(e) => setFreeShippingMin(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Estimated Delivery</Label>
                  <Input value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} placeholder="3-5 business days" />
                </div>
              </div>
              <Button onClick={handleSave}>Save Shipping Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Checkbox checked={emailNotifs} onCheckedChange={(v) => setEmailNotifs(!!v)} id="email-notif" />
                <div>
                  <Label htmlFor="email-notif" className="cursor-pointer">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive order confirmations and updates via email</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Checkbox checked={orderNotifs} onCheckedChange={(v) => setOrderNotifs(!!v)} id="order-notif" />
                <div>
                  <Label htmlFor="order-notif" className="cursor-pointer">New Order Alerts</Label>
                  <p className="text-xs text-muted-foreground">Get notified when a new order is placed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Checkbox checked={lowStockNotifs} onCheckedChange={(v) => setLowStockNotifs(!!v)} id="stock-notif" />
                <div>
                  <Label htmlFor="stock-notif" className="cursor-pointer">Low Stock Alerts</Label>
                  <p className="text-xs text-muted-foreground">Alert when product stock is running low</p>
                </div>
              </div>
              <Button onClick={handleSave}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-4 mt-4">
          <Card className="border-destructive/30">
            <CardHeader><CardTitle className="text-base text-destructive">Danger Zone</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => { localStorage.removeItem("admin_orders"); window.location.reload(); }}>
                🔄 Reset All Orders Data
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => { localStorage.removeItem("admin_customers"); window.location.reload(); }}>
                🔄 Reset All Customers Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => {
                if (confirm("This will reset ALL admin data. Are you sure?")) {
                  localStorage.removeItem("admin_orders");
                  localStorage.removeItem("admin_customers");
                  window.location.reload();
                }
              }}>
                ⚠️ Reset Everything
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
