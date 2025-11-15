import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export const AppLayout = ({ children, showBottomNav = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className={showBottomNav ? "pb-20" : ""}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};
