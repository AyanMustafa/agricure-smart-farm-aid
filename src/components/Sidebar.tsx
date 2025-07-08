import { NavLink } from "react-router-dom";
import { 
  Camera, 
  BarChart3, 
  History, 
  Settings, 
  Users, 
  Brain,
  X,
  Home,
  Lightbulb,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const isAgronomist = user?.role === 'agronomist';

  const navigationItems = [
    { 
      to: "/", 
      icon: Home, 
      label: t('dashboard'),
      roles: ['farmer', 'agronomist', 'extension', 'admin']
    },
    { 
      to: "/diagnose", 
      icon: Camera, 
      label: t('diagnose'),
      roles: ['farmer', 'agronomist', 'extension', 'admin']
    },
    { 
      to: "/history", 
      icon: History, 
      label: t('history'),
      roles: ['farmer', 'agronomist', 'extension', 'admin']
    },
    { 
      to: "/analytics", 
      icon: BarChart3, 
      label: t('analytics'),
      roles: ['agronomist', 'extension', 'admin']
    },
    { 
      to: "/recommendations", 
      icon: Lightbulb, 
      label: t('recommendations'),
      roles: ['farmer', 'agronomist', 'extension', 'admin']
    },
    { 
      to: "/reports", 
      icon: FileText, 
      label: t('reports'),
      roles: ['agronomist', 'extension', 'admin']
    },
  ];

  const adminItems = [
    { 
      to: "/admin/users", 
      icon: Users, 
      label: t('manage_users'),
      roles: ['admin']
    },
    { 
      to: "/admin/ai-models", 
      icon: Brain, 
      label: t('ai_models'),
      roles: ['admin']
    },
    { 
      to: "/admin/settings", 
      icon: Settings, 
      label: t('system_settings'),
      roles: ['admin']
    },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'farmer')
  );

  const filteredAdminItems = adminItems.filter(item => 
    item.roles.includes(user?.role || 'farmer')
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border transform transition-transform duration-300 md:static md:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="px-4 pb-4">
          {/* Main Navigation */}
          <div className="space-y-2">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {t('navigation')}
            </h3>
            
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Admin Section */}
          {filteredAdminItems.length > 0 && (
            <div className="mt-8 space-y-2">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {t('administration')}
              </h3>
              
              {filteredAdminItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => window.innerWidth < 768 && onClose()}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}