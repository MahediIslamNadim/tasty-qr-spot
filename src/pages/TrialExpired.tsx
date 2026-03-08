import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Crown, LogOut } from "lucide-react";

const plans = [
  { id: "basic", name: "Basic", price: "৫০০ টাকা/মাস", features: ["মেনু ম্যানেজমেন্ট", "QR কোড", "অর্ডার ম্যানেজমেন্ট"] },
  { id: "premium", name: "Premium", price: "১,০০০ টাকা/মাস", features: ["সব Basic ফিচার", "এনালিটিক্স", "স্টাফ ম্যানেজমেন্ট", "প্রায়োরিটি সাপোর্ট"] },
  { id: "enterprise", name: "Enterprise", price: "২,৫০০ টাকা/মাস", features: ["সব Premium ফিচার", "মাল্টি-ব্রাঞ্চ", "কাস্টম ব্র্যান্ডিং", "ডেডিকেটেড সাপোর্ট"] },
];

const TrialExpired = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-6 animate-fade-up">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mx-auto">
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">ট্রায়াল সময় শেষ!</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            আপনার ১৪ দিনের ফ্রি ট্রায়াল শেষ হয়ে গেছে। সার্ভিস চালু রাখতে একটি প্যাকেজ নির্বাচন করুন।
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.id === "premium" ? "border-primary shadow-lg" : ""}`}>
              {plan.id === "premium" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground flex items-center gap-1">
                    <Crown className="w-3 h-3" /> জনপ্রিয়
                  </span>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display">{plan.name}</CardTitle>
                <p className="text-2xl font-bold text-primary">{plan.price}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.id === "premium" ? "hero" : "outline"} className="w-full" onClick={() => {
                  // TODO: Implement payment flow
                  window.open("https://wa.me/+8801XXXXXXXXX?text=আমি " + plan.name + " প্যাকেজ নিতে চাই", "_blank");
                }}>
                  নির্বাচন করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={signOut} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" /> লগ আউট
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrialExpired;
