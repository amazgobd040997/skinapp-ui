import { Home, Camera, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Scan', icon: Camera, path: '/scan' },
    { name: 'Routine', icon: Calendar, path: '/routine' },
    { name: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
