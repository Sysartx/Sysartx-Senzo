"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Add any logout logic here (like clearing tokens/session)
    router.push("/login"); // Redirect to login page
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-2 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-gray-900 border-gray-700 hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 text-gray-300" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative z-40 ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : ''} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col w-64 h-screen border-r border-gray-800 bg-gradient-to-br from-gray-900 to-black md:sticky md:top-0 md:left-0">
          <div className="flex items-center h-16 px-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 md:w-10 md:h-10 relative">
                <Image
                  src="/forecast-analytics.png"
                  alt="Forecast Logo"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">Forecast</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white group"
                  onClick={() => isMobile && setIsMobileOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
