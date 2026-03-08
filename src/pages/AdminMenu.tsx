import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["সব", "বিরিয়ানি", "কাবাব", "ভাত", "পানীয়", "ডেজার্ট"];

const menuItems = [
  { id: 1, name: "চিকেন বিরিয়ানি", price: 350, category: "বিরিয়ানি", available: true, description: "সুগন্ধি বাসমতি চালে রান্না করা মুরগির বিরিয়ানি" },
  { id: 2, name: "বটি কাবাব", price: 180, category: "কাবাব", available: true, description: "মশলাযুক্ত গরুর মাংসের কাবাব" },
  { id: 3, name: "মটন বিরিয়ানি", price: 450, category: "বিরিয়ানি", available: false, description: "খাসির মাংস দিয়ে তৈরি বিরিয়ানি" },
  { id: 4, name: "প্লেইন ভাত", price: 60, category: "ভাত", available: true, description: "সাদা ভাত" },
  { id: 5, name: "মাংগো লাচ্ছি", price: 120, category: "পানীয়", available: true, description: "তাজা আমের লাচ্ছি" },
  { id: 6, name: "ফিরনি", price: 100, category: "ডেজার্ট", available: true, description: "ঐতিহ্যবাহী দুধের ফিরনি" },
];

const AdminMenu = () => {
  const [activeCategory, setActiveCategory] = useState("সব");

  const filtered = activeCategory === "সব" ? menuItems : menuItems.filter(i => i.category === activeCategory);

  return (
    <DashboardLayout role="admin" title="মেনু ম্যানেজমেন্ট">
      <div className="space-y-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            আইটেম যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="h-40 bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-primary">৳{item.price}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.available ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {item.available ? "উপলব্ধ" : "অনুপলব্ধ"}
                    </span>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminMenu;
