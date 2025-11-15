import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, CreditCard, Settings, Bell, Lock, User, HelpCircle, LogOut, Award, TrendingUp } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { PaymentMethods } from "@/components/PaymentMethods";
import { Subscription } from "@/components/Subscription";
import { BillingHistory } from "@/components/BillingHistory";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentView, setPaymentView] = useState<"methods" | "subscription" | "billing" | null>(null);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-background/50 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Payment Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment
                </h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      setPaymentView("methods");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span>Payment Methods</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      setPaymentView("subscription");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <Award className="w-5 h-5 text-muted-foreground" />
                    <span>Subscription</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      setPaymentView("billing");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    <span>Billing History</span>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Settings Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      console.log("Notifications");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span>Notifications</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      console.log("Privacy & Security");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <span>Privacy & Security</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMenuOpen(false);
                      console.log("Help & Support");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                  >
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    <span>Help & Support</span>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Logout */}
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  navigate('/onboarding');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Payment Dialogs */}
      <Sheet open={paymentView !== null} onOpenChange={(open) => !open && setPaymentView(null)}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {paymentView === "methods" && "Payment Methods"}
              {paymentView === "subscription" && "Subscription"}
              {paymentView === "billing" && "Billing History"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {paymentView === "methods" && <PaymentMethods />}
            {paymentView === "subscription" && <Subscription />}
            {paymentView === "billing" && <BillingHistory />}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
