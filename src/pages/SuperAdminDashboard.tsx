import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Store, Users, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminDashboard = () => {
  return (
    <DashboardLayout role="super_admin" title="সুপার অ্যাডমিন ড্যাশবোর্ড">
      <div className="space-y-8 animate-fade-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="মোট রেস্টুরেন্ট" value={24} icon={Store} trend="+12%" trendUp />
          <StatCard title="মোট ব্যবহারকারী" value={156} icon={Users} trend="+8%" trendUp />
          <StatCard title="মাসিক আয়" value="৳48,500" icon={DollarSign} trend="+15%" trendUp />
          <StatCard title="অ্যাক্টিভ অর্ডার" value={38} icon={TrendingUp} trend="+5%" trendUp />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                সাম্প্রতিক রেস্টুরেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Spice Garden", orders: 145, status: "active" },
                  { name: "Dhaka Diner", orders: 89, status: "active" },
                  { name: "Chai House", orders: 67, status: "pending" },
                  { name: "Bistro BD", orders: 234, status: "active" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-sm text-muted-foreground">{r.orders} অর্ডার</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      r.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {r.status === "active" ? "সক্রিয়" : "পেন্ডিং"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                সাম্প্রতিক ব্যবহারকারী
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rahim Ahmed", role: "Admin", date: "আজ" },
                  { name: "Karim Hassan", role: "Waiter", date: "গতকাল" },
                  { name: "Fatima Begum", role: "Admin", date: "২ দিন আগে" },
                  { name: "Ali Khan", role: "Waiter", date: "৩ দিন আগে" },
                ].map((u, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-sm text-muted-foreground">{u.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{u.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
