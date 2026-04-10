import { useState, useMemo, useRef } from "react";
import { Search, Edit2, Trash2, Plus, Star, ImagePlus, X, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { products as catalogProducts, categories, type Product } from "@/data/catalog";
import { getProductImage } from "@/data/productImages";
import { toast } from "sonner";

const EMPTY_PRODUCT: Omit<Product, "id" | "rating" | "reviews"> = {
  name: "", nameTa: "", description: "", descriptionTa: "",
  brief: "", briefTa: "", bestTime: "Morning", bestTimeTa: "காலை",
  price: 0, originalPrice: undefined, category: "", categoryTa: "",
  ingredients: "", ingredientsTa: "", nutrition: "", nutritionTa: "",
  badge: "", badgeTa: "", inStock: true, size: "", hasBulkPricing: false,
  image: "", images: [],
};

const bestTimeOptions = [
  { en: "Morning", ta: "காலை" },
  { en: "Evening", ta: "மாலை" },
  { en: "Night", ta: "இரவு" },
  { en: "Anytime", ta: "எப்போதும்" },
];

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>(catalogProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formData, setFormData] = useState<any>({ ...EMPTY_PRODUCT });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSpecialDeal, setIsSpecialDeal] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryImageRef = useRef<HTMLInputElement>(null);

  const catOptions = useMemo(() => {
    const cats = Array.from(new Set(productList.map((p) => p.category)));
    return ["All", ...cats];
  }, [productList]);

  const categoryList = categories.filter(c => c.en !== "All");

  const filtered = useMemo(() => {
    let result = categoryFilter === "All" ? productList : productList.filter((p) => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.id.includes(q));
    }
    return result;
  }, [productList, search, categoryFilter]);

  const toggleStock = (id: string) => {
    setProductList((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));
  };

  const deleteProduct = (id: string) => {
    if (confirm("Delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    }
  };

  const openAdd = () => {
    setFormData({ ...EMPTY_PRODUCT, images: [] });
    setIsSpecialDeal(false);
    setGalleryUrlInput("");
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setFormData({ ...product, images: [...(product.images || [])] });
    setIsSpecialDeal(!!product.badge);
    setGalleryUrlInput("");
    setEditingId(product.id);
    setDialogOpen(true);
  };

  const handleFileToBase64 = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileToBase64(file, (url) => updateField("image", url));
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        handleFileToBase64(file, (url) => {
          setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), url] }));
        });
      });
    }
  };

  const addGalleryUrl = () => {
    if (galleryUrlInput.trim()) {
      setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), galleryUrlInput.trim()] }));
      setGalleryUrlInput("");
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast.error("Name, category & price are required");
      return;
    }

    const badge = isSpecialDeal ? (formData.badge || "Special Deal") : "";
    const badgeTa = isSpecialDeal ? (formData.badgeTa || "சிறப்பு") : "";

    if (editingId) {
      setProductList((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...formData, badge, badgeTa } : p))
      );
      toast.success("Product updated");
    } else {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newProduct: Product = {
        ...formData,
        id: slug + "-" + Date.now(),
        rating: 4.5,
        reviews: 0,
        badge,
        badgeTa,
      };
      setProductList((prev) => [newProduct, ...prev]);
      toast.success("Product added");
    }
    setDialogOpen(false);
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (catEn: string) => {
    const cat = categories.find(c => c.en === catEn);
    updateField("category", catEn);
    if (cat) updateField("categoryTa", cat.ta);
  };

  const handleBestTimeChange = (val: string) => {
    const opt = bestTimeOptions.find(o => o.en === val);
    updateField("bestTime", val);
    if (opt) updateField("bestTimeTa", opt.ta);
  };

  const inStock = productList.filter((p) => p.inStock).length;
  const outOfStock = productList.length - inStock;

  const getDisplayImage = (product: Product) => {
    return product.image || getProductImage(product.id, product.category);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-serif font-bold text-foreground">Products</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded bg-green-100 text-green-800">{inStock} In Stock</span>
            <span className="px-2 py-1 rounded bg-red-100 text-red-800">{outOfStock} Out of Stock</span>
          </div>
          <Button onClick={openAdd} size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-9" />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-input bg-background text-sm"
        >
          {catOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left p-3 font-medium">Product</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                  <th className="text-right p-3 font-medium">Price</th>
                  <th className="text-center p-3 font-medium hidden sm:table-cell">Badge</th>
                  <th className="text-center p-3 font-medium">Stock</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 50).map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={getDisplayImage(p)} alt={p.name} className="w-10 h-10 rounded-md object-cover bg-muted" />
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.nameTa}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{p.category}</td>
                    <td className="p-3 text-right font-medium">
                      ₹{p.price}
                      {p.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-1">₹{p.originalPrice}</span>
                      )}
                    </td>
                    <td className="p-3 text-center hidden sm:table-cell">
                      {p.badge ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Star className="w-3 h-3" /> {p.badge}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleStock(p.id)}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {p.inStock ? "In Stock" : "Out"}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-accent rounded-md">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-destructive">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <p className="p-3 text-xs text-muted-foreground text-center">Showing 50 of {filtered.length} products</p>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">

            {/* === IMAGE SECTION === */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Product Images</Label>

              {/* Main Image */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Main Image</Label>
                <div className="flex items-start gap-3">
                  <div
                    onClick={() => mainImageRef.current?.click()}
                    className="w-24 h-24 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors overflow-hidden shrink-0"
                  >
                    {formData.image ? (
                      <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Upload className="w-5 h-5" />
                        <span className="text-[10px]">Upload</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      value={formData.image || ""}
                      onChange={(e) => updateField("image", e.target.value)}
                      placeholder="Or paste image URL..."
                      className="text-xs"
                    />
                    <input
                      ref={mainImageRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainImageUpload}
                    />
                    {formData.image && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => updateField("image", "")}>
                        <X className="w-3 h-3 mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Gallery Images</Label>
                <div className="flex flex-wrap gap-2">
                  {(formData.images || []).map((img: string, i: number) => (
                    <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden border border-border group">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeGalleryImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => galleryImageRef.current?.click()}
                    className="w-16 h-16 rounded-md border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors"
                  >
                    <ImagePlus className="w-4 h-4" />
                  </button>
                </div>
                <input
                  ref={galleryImageRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryImageUpload}
                />
                <div className="flex gap-2">
                  <Input
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="Or paste gallery image URL..."
                    className="text-xs flex-1"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryUrl())}
                  />
                  <Button variant="outline" size="sm" onClick={addGalleryUrl} disabled={!galleryUrlInput.trim()}>Add</Button>
                </div>
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Product Name (English) *</Label>
                <Input value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Ragi Muesli" />
              </div>
              <div className="space-y-1.5">
                <Label>Product Name (Tamil)</Label>
                <Input value={formData.nameTa} onChange={(e) => updateField("nameTa", e.target.value)} placeholder="தமிழ் பெயர்" />
              </div>
            </div>

            {/* Category & Best Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categoryList.map(c => (
                      <SelectItem key={c.en} value={c.en}>{c.en} / {c.ta}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Best Time to Eat</Label>
                <Select value={formData.bestTime} onValueChange={handleBestTimeChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {bestTimeOptions.map(o => (
                      <SelectItem key={o.en} value={o.en}>{o.en} / {o.ta}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1.5">
                <Label>Price (₹) *</Label>
                <Input type="number" value={formData.price || ""} onChange={(e) => updateField("price", Number(e.target.value))} />
              </div>
              <div className="space-y-1.5">
                <Label>Original Price (₹)</Label>
                <Input type="number" value={formData.originalPrice || ""} onChange={(e) => updateField("originalPrice", Number(e.target.value) || undefined)} />
              </div>
              <div className="space-y-1.5">
                <Label>Size</Label>
                <Input value={formData.size || ""} onChange={(e) => updateField("size", e.target.value)} placeholder="e.g. 500g" />
              </div>
              <div className="flex items-end pb-1">
                <div className="flex items-center gap-2">
                  <Checkbox checked={formData.hasBulkPricing} onCheckedChange={(v) => updateField("hasBulkPricing", !!v)} id="bulk" />
                  <Label htmlFor="bulk" className="text-sm cursor-pointer">Bulk Pricing</Label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Description (English)</Label>
                <Textarea value={formData.description} onChange={(e) => updateField("description", e.target.value)} rows={3} />
              </div>
              <div className="space-y-1.5">
                <Label>Description (Tamil)</Label>
                <Textarea value={formData.descriptionTa} onChange={(e) => updateField("descriptionTa", e.target.value)} rows={3} />
              </div>
            </div>

            {/* Brief */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Brief (English)</Label>
                <Input value={formData.brief} onChange={(e) => updateField("brief", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Brief (Tamil)</Label>
                <Input value={formData.briefTa} onChange={(e) => updateField("briefTa", e.target.value)} />
              </div>
            </div>

            {/* Ingredients */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Ingredients (English)</Label>
                <Textarea value={formData.ingredients} onChange={(e) => updateField("ingredients", e.target.value)} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Ingredients (Tamil)</Label>
                <Textarea value={formData.ingredientsTa} onChange={(e) => updateField("ingredientsTa", e.target.value)} rows={2} />
              </div>
            </div>

            {/* Nutrition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Nutrition Info (English)</Label>
                <Textarea value={formData.nutrition} onChange={(e) => updateField("nutrition", e.target.value)} rows={2} />
              </div>
              <div className="space-y-1.5">
                <Label>Nutrition Info (Tamil)</Label>
                <Textarea value={formData.nutritionTa} onChange={(e) => updateField("nutritionTa", e.target.value)} rows={2} />
              </div>
            </div>

            {/* Special Deal & Stock */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.inStock} onCheckedChange={(v) => updateField("inStock", !!v)} id="instock" />
                <Label htmlFor="instock" className="cursor-pointer">In Stock</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={isSpecialDeal} onCheckedChange={(v) => setIsSpecialDeal(!!v)} id="special" />
                <Label htmlFor="special" className="cursor-pointer flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500" /> Special Deal
                </Label>
              </div>
              {isSpecialDeal && (
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Input
                    value={formData.badge || ""}
                    onChange={(e) => updateField("badge", e.target.value)}
                    placeholder="Badge text (e.g. Best Seller)"
                    className="flex-1"
                  />
                  <Input
                    value={formData.badgeTa || ""}
                    onChange={(e) => updateField("badgeTa", e.target.value)}
                    placeholder="Tamil badge"
                    className="flex-1"
                  />
                </div>
              )}
            </div>

            <Button onClick={handleSave} className="w-full">
              {editingId ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
