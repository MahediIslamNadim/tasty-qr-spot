import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Plus, Edit, Users, Wifi } from "lucide-react";

const tables = [
  { id: 1, name: "T-1", seats: 4, status: "occupied", activeOrders: 2 },
  { id: 2, name: "T-2", seats: 6, status: "occupied", activeOrders: 1 },
  { id: 3, name: "T-3", seats: 2, status: "available", activeOrders: 0 },
  { id: 4, name: "T-4", seats: 4, status: "available", activeOrders: 0 },
  { id: 5, name: "T-5", seats: 8, status: "occupied", activeOrders: 3 },
  { id: 6, name: "T-6", seats: 4, status: "reserved", activeOrders: 0 },
  { id: 7, name: "T-7", seats: 2, status: "available", activeOrders: 0 },
  { id: 8, name: "T-8", seats: 6, status: "occupied", activeOrders: 1 },
  { id: 9, name: "T-9", seats: 4, status: "available", activeOrders: 0 },
  { id: 10, name: "T-10", seats: 4, status: "reserved", activeOrders: 0 },
  { id: 11, name: "T-11", seats: 8, status: "available", activeOrders: 0 },
  { id: 12, name: "T-12", seats: 2, status: "occupied", activeOrders: 1 },
];

const AdminTables = () => {
  return (
    <DashboardLayout role="admin" title="টেবিল ও QR কোড ম্যানেজমেন্ট">
      <div className="space-y-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">ফাঁকা</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">ব্যস্ত</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">রিজার্ভড</span>
            </div>
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4" />
            টেবিল যোগ করুন
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <Card key={table.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
              table.status === "occupied" ? "border-primary/30" :
              table.status === "reserved" ? "border-warning/30" : "border-success/30"
            }`}>
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                table.status === "occupied" ? "gradient-primary" :
                table.status === "reserved" ? "bg-warning" : "bg-success"
              }`} />
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  table.status === "occupied" ? "bg-primary/10" :
                  table.status === "reserved" ? "bg-warning/10" : "bg-success/10"
                }`}>
                  <span className="text-2xl font-display font-bold text-foreground">{table.name}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                  <Users className="w-4 h-4" />
                  <span>{table.seats} সিট</span>
                </div>
                {table.activeOrders > 0 && (
                  <p className="text-xs text-primary font-medium mb-3">
                    {table.activeOrders} অ্যাক্টিভ অর্ডার
                  </p>
                )}
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <QrCode className="w-3 h-3" />
                    QR
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminTables;
