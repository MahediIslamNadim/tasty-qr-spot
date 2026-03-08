import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, CheckCircle, UserCheck, Bell } from "lucide-react";

const activeOrders = [
  { id: "#1234", table: "T-5", items: ["চিকেন বিরিয়ানি x2", "লাচ্ছি x1"], status: "pending", time: "2 মিনিট আগে" },
  { id: "#1235", table: "T-2", items: ["বটি কাবাব x3", "ভাত x3"], status: "preparing", time: "5 মিনিট আগে" },
  { id: "#1238", table: "T-12", items: ["ফিরনি x3"], status: "pending", time: "1 মিনিট আগে" },
];

const WaiterDashboard = () => {
  return (
    <DashboardLayout role="waiter" title="ওয়েটার ড্যাশবোর্ড">
      <div className="space-y-6 animate-fade-up">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card text-center">
            <ShoppingCart className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">অ্যাক্টিভ অর্ডার</p>
          </div>
          <div className="stat-card text-center">
            <UserCheck className="w-6 h-6 text-warning mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground">সিট রিকোয়েস্ট</p>
          </div>
          <div className="stat-card text-center">
            <Bell className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">5</p>
            <p className="text-xs text-muted-foreground">নোটিফিকেশন</p>
          </div>
        </div>

        {/* Active Orders */}
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">অ্যাক্টিভ অর্ডার</h2>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-l-4 border-l-primary">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display font-semibold text-foreground">{order.id}</h3>
                        <span className="text-sm font-body text-muted-foreground">• {order.table}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">{item}</span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <Button size="sm" variant="hero">গ্রহণ করুন</Button>
                      )}
                      {order.status === "preparing" && (
                        <Button size="sm" variant="success">সার্ভ করুন</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WaiterDashboard;
