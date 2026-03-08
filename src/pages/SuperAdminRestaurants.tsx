import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Store, Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";

const restaurants = [
  { id: 1, name: "Spice Garden", owner: "Rahim Ahmed", tables: 12, status: "active", plan: "Premium" },
  { id: 2, name: "Dhaka Diner", owner: "Karim Hassan", tables: 8, status: "active", plan: "Basic" },
  { id: 3, name: "Chai House", owner: "Fatima Begum", tables: 6, status: "pending", plan: "Premium" },
  { id: 4, name: "Bistro BD", owner: "Ali Khan", tables: 15, status: "active", plan: "Enterprise" },
  { id: 5, name: "Royal Kitchen", owner: "Nadia Islam", tables: 10, status: "inactive", plan: "Basic" },
];

const SuperAdminRestaurants = () => {
  const [search, setSearch] = useState("");
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="super_admin" title="রেস্টুরেন্ট ম্যানেজমেন্ট">
      <div className="space-y-6 animate-fade-up">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="রেস্টুরেন্ট খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/50"
            />
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            নতুন রেস্টুরেন্ট
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">রেস্টুরেন্ট</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">মালিক</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">টেবিল</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">প্ল্যান</th>
                    <th className="text-left p-4 font-medium text-muted-foreground text-sm">স্ট্যাটাস</th>
                    <th className="text-right p-4 font-medium text-muted-foreground text-sm">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                            <Store className="w-5 h-5 text-accent-foreground" />
                          </div>
                          <span className="font-medium text-foreground">{r.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{r.owner}</td>
                      <td className="p-4 text-muted-foreground">{r.tables}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {r.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          r.status === "active" ? "bg-success/10 text-success" :
                          r.status === "pending" ? "bg-warning/10 text-warning" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {r.status === "active" ? "সক্রিয়" : r.status === "pending" ? "পেন্ডিং" : "নিষ্ক্রিয়"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminRestaurants;
