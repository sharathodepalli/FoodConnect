// src/components/Header/Navigation.tsx
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { UserRole } from "../../types/user";

interface NavigationProps {
  userRole?: UserRole;
}

export function Navigation({ userRole }: NavigationProps) {
  const location = useLocation();

  const commonLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FoodConnect Bases", href: "/foodconnect-bases" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const roleSpecificLinks: Record<
    UserRole,
    Array<{ label: string; href: string }>
  > = {
    restaurant: [
      { label: "Dashboard", href: "/restaurant/dashboard" },
      { label: "Analytics", href: "/analytics" },
      { label: "My Listings", href: "/restaurant/listings" },
    ],
    mart: [
      { label: "Dashboard", href: "/mart/dashboard" },
      { label: "Analytics", href: "/analytics" },
      { label: "My Listings", href: "/mart/listings" },
    ],
    recipient: [
      { label: "Find Food", href: "/recipient/find" },
      { label: "My Orders", href: "/recipient/orders" },
      { label: "Food Stations", href: "/recipient/stations" },
    ],
    volunteer: [
      { label: "Dashboard", href: "/volunteer/dashboard" },
      { label: "Opportunities", href: "/volunteer/opportunities" },
      { label: "Leaderboard", href: "/volunteer/leaderboard" },
    ],
    admin: [
      { label: "Admin Dashboard", href: "/admin" },
      { label: "User Management", href: "/admin/users" },
      { label: "Platform Analytics", href: "/admin/analytics" },
    ],
  };

  // Get links based on user role
  const links = [
    ...commonLinks,
    ...(userRole && roleSpecificLinks[userRole]
      ? roleSpecificLinks[userRole]
      : []),
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={`text-sm font-medium transition-colors ${
              location.pathname === link.href
                ? "text-green-600"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
        <Menu className="w-6 h-6 text-gray-600" />
      </button>
    </>
  );
}
