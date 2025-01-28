// import { useState, useEffect } from "react";
// import { Leaf, Menu, X } from "lucide-react";
// import { LocationSelector } from "./LocationSelector";
// import { SearchBar } from "./SearchBar";
// import Navigation from "./Navigation";
// import { UserMenu } from "./UserMenu";
// import { ListFoodModal } from "../ListFood/ListFoodModal";
// import { useApp } from "../../context/AppContext";

// export function Header() {
//   const { state } = useApp();
//   const [isListFoodModalOpen, setIsListFoodModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Check if user is a food provider (restaurant or mart)
//   const isProvider =
//     state.user?.role === "restaurant" || state.user?.role === "mart";

//   // Handler for mobile menu
//   const handleMobileMenuToggle = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isListFoodModalOpen) {
//       setIsListFoodModalOpen(false);
//     }
//   };

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-200 ${
//         isScrolled ? "shadow-md" : "border-b border-gray-200"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         {/* Upper Header */}
//         <div className="h-16 flex items-center justify-between">
//           {/* Logo and Search Section */}
//           <div className="flex items-center lg:space-x-8">
//             <a href="/" className="flex items-center space-x-2">
//               <Leaf className="w-8 h-8 text-green-600" />
//               <span className="text-xl font-bold text-gray-900 hidden sm:inline">
//                 FoodConnect
//               </span>
//             </a>

//             {/* Location and Search Container */}
//             <div className="hidden lg:flex items-center space-x-4 flex-1 min-w-[500px]">
//               <LocationSelector />
//               <SearchBar />
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center space-x-4">
//             {/* List Food Button - Show only for food providers */}
//             {isProvider && (
//               <button
//                 onClick={() => setIsListFoodModalOpen(true)}
//                 className="hidden sm:flex px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
//               >
//                 List Food
//               </button>
//             )}

//             {/* User Menu */}
//             <div className="hidden sm:block">
//               <UserMenu user={state.user || null} />
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
//               onClick={handleMobileMenuToggle}
//               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6 text-gray-600" />
//               ) : (
//                 <Menu className="w-6 h-6 text-gray-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Navigation - Desktop */}
//         <div className="hidden lg:block h-12">
//           <Navigation userRole={state.user?.role} />
//         </div>

//         {/* Mobile Navigation & Search */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
//             <div className="p-4 space-y-4">
//               <LocationSelector />
//               <SearchBar />
//               <Navigation userRole={state.user?.role} />

//               {isProvider && (
//                 <button
//                   onClick={() => setIsListFoodModalOpen(true)}
//                   className="w-full px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
//                 >
//                   List Food
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* List Food Modal */}
//       <ListFoodModal
//         isOpen={isListFoodModalOpen}
//         onClose={() => setIsListFoodModalOpen(false)}
//       />
//     </header>
//   );
// }

// src/components/Header/Header.tsx
import { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { LocationSelector } from "./LocationSelector";
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { UserMenu } from "./UserMenu";
import { ListFoodModal } from "../ListFood/ListFoodModal";
import { useApp } from "../../context/AppContext";

export function Header() {
  const { state } = useApp();
  const [isListFoodModalOpen, setIsListFoodModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is a food provider (restaurant or mart)
  const isProvider =
    state.user?.role === "restaurant" || state.user?.role === "mart";

  // Handler for mobile menu
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isListFoodModalOpen) {
      setIsListFoodModalOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Upper Header */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo and Search Section */}
          <div className="flex items-center lg:space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                FoodConnect
              </span>
            </a>

            {/* Location and Search Container */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 min-w-[500px]">
              <LocationSelector />
              <SearchBar />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* List Food Button - Show only for food providers */}
            {isProvider && (
              <button
                onClick={() => setIsListFoodModalOpen(true)}
                className="hidden sm:flex px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
              >
                List Food
              </button>
            )}

            {/* User Menu */}
            <div className="hidden sm:block">
              <UserMenu user={state.user || null} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={handleMobileMenuToggle}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <div className="hidden lg:block h-12">
          <Navigation userRole={state.user?.role} />
        </div>

        {/* Mobile Navigation & Search */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="p-4 space-y-4">
              <LocationSelector />
              <SearchBar />
              <Navigation userRole={state.user?.role} />

              {isProvider && (
                <button
                  onClick={() => setIsListFoodModalOpen(true)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  List Food
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* List Food Modal */}
      <ListFoodModal
        isOpen={isListFoodModalOpen}
        onClose={() => setIsListFoodModalOpen(false)}
      />
    </header>
  );
}
