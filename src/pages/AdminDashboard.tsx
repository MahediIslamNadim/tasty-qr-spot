import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { ShoppingCart, DollarSign, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const orders = [
  { id: "#1234", table: "T-5", items: 3, total: "৳850", status: "preparing", time: "5 মিনিট আগে" },
  { id: "#1235", table: "T-2", items: 5, total: "৳1,200", status: "pending", time: "2 মিনিট আগে" },
  { id: "#1236", table: "T-8", items: 2, total: "৳450", status: "served", time: "15 মিনিট আগে" },
  { id: "#1237", table: "T-1", items: 4, total: "৳980", status: "preparing", time: "8 মিনিট আগে" },
  { id: "#1238", table: "T-12", items: 1, total: "৳250", status: "pending", time: "1 মিনিট আগে" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" title="অ্যাডমিন ড্যাশবোর্ড">
      <div className="space-y-8 animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="আজকের অর্ডার" value={42} icon={ShoppingCart} trend="+18%" trendUp />
          <StatCard title="আজকের আয়" value="৳12,450" icon={DollarSign} trend="+22%" trendUp />
          <StatCard title="অ্যাক্টিভ টেবিল" value="8/12" icon={Users} />
          <StatCard title="গড় অর্ডার মূল্য" value="৳680" icon={TrendingUp} trend="+5%" trendUp />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              সাম্প্রতিক অর্ডার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.id} — {order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.items} আইটেম • {order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">{order.total}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "pending" ? "bg-warning/10 text-warning" :
                      order.status === "preparing" ? "bg-primary/10 text-primary" :
                      "bg-success/10 text-success"
                    }`}>
                      {order.status === "pending" ? "পেন্ডিং" : order.status === "preparing" ? "প্রস্তুত হচ্ছে" : "সার্ভ করা হয়েছে"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
