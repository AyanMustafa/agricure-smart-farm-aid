import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Navbar 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />
          
          <div className="flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <main className="flex-1 transition-all duration-300">
              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}