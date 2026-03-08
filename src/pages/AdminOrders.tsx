import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle, XCircle, ChefHat } from "lucide-react";
import { useState } from "react";

const allOrders = [
  { id: "#1234", table: "T-5", items: ["চিকেন বিরিয়ানি x2", "মাংগো লাচ্ছি x1"], total: 820, status: "pending", time: "2 মিনিট আগে" },
  { id: "#1235", table: "T-2", items: ["বটি কাবাব x3", "প্লেইন ভাত x3", "ফিরনি x2"], total: 1320, status: "preparing", time: "5 মিনিট আগে" },
  { id: "#1236", table: "T-8", items: ["মটন বিরিয়ানি x1", "মাংগো লাচ্ছি x2"], total: 690, status: "served", time: "12 মিনিট আগে" },
  { id: "#1237", table: "T-1", items: ["চিকেন বিরিয়ানি x1", "বটি কাবাব x2"], total: 710, status: "preparing", time: "8 মিনিট আগে" },
  { id: "#1238", table: "T-12", items: ["ফিরনি x3"], total: 300, status: "pending", time: "1 মিনিট আগে" },
  { id: "#1239", table: "T-5", items: ["প্লেইন ভাত x2", "বটি কাবাব x4"], total: 840, status: "completed", time: "25 মিনিট আগে" },
];

const statusFilters = ["সব", "পেন্ডিং", "প্রস্তুত হচ্ছে", "সার্ভ করা হয়েছে", "সম্পন্ন"];
const statusMap: Record<string, string> = {
  "সব": "all", "পেন্ডিং": "pending", "প্রস্তুত হচ্ছে": "preparing", "সার্ভ করা হয়েছে": "served", "সম্পন্ন": "completed"
};

const AdminOrders = () => {
  const [filter, setFilter] = useState("সব");

  const filtered = filter === "সব" ? allOrders : allOrders.filter(o => o.status === statusMap[filter]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "preparing": return <ChefHat className="w-4 h-4" />;
      case "served": return <CheckCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case "pending": return "bg-warning/10 text-warning";
      case "preparing": return "bg-primary/10 text-primary";
      case "served": return "bg-success/10 text-success";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case "pending": return "পেন্ডিং";
      case "preparing": return "প্রস্তুত হচ্ছে";
      case "served": return "সার্ভ করা হয়েছে";
      case "completed": return "সম্পন্ন";
      default: return status;
    }
  };

  return (
    <DashboardLayout role="admin" title="অর্ডার ম্যানেজমেন্ট">
      <div className="space-y-6 animate-fade-up">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
              {s}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display font-semibold text-foreground text-lg">{order.id}</h3>
                        <span className="text-sm text-muted-foreground font-body">{order.table}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <span className="text-xl font-bold text-foreground">৳{order.total}</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminOrders;
