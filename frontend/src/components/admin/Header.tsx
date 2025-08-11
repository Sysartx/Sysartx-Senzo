"use client";

import { HEADER_ICONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 flex items-center h-16 px-4 border-b border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all duration-200 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Left spacer to balance mobile menu button (matches sidebar button width) */}
      <div className="w-12 md:w-0"></div>
      
      {/* Title - centered on mobile, left-aligned on desktop */}
      <div className="flex-1 md:flex-none md:ml-4">
        <h1 className="text-lg font-semibold text-center md:text-left truncate max-w-[180px] md:max-w-none mx-auto md:mx-0">
          Health System Management
        </h1>
      </div>
      
      {/* Icons - hidden on mobile when sidebar is open */}
      <div className="flex items-center space-x-1 ml-auto">
        {HEADER_ICONS.map((icon) => (
          <Button
            key={icon.name}
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9"
          >
            <icon.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </header>
  );
}
// import { HEADER_ICONS } from "@/lib/constants";
// import { Button } from "@/components/ui/button";

// export default function Header() {
//   return (
//     <header className="flex items-center h-16 px-6 border-b border-gray-800 bg-gradient-to-br from-gray-900 to-black sti">
//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">Health System Management</h1>
//       </div>
//       <div className="flex items-center space-x-4">
//         {HEADER_ICONS.map((icon) => (
//           <Button
//             key={icon.name}
//             variant="ghost"
//             size="icon"
//             className="rounded-full"
//           >
//             <icon.icon className="h-5 w-5" />
//           </Button>
//         ))}
//       </div>
//     </header>
//   );
// }