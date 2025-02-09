import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          BinancePe
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/youtube" 
            className="font-semibold text-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 bg-clip-text text-transparent"
          >
            YouTube
          </Link>
          <Link
            to="/insta"
            className="font-semibold text-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent"
          >
            Instagram
          </Link>
        </nav>

        {/* Right: User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden md:flex items-center space-x-2 focus:outline-none">
              <span>Welcome</span>
              <Avatar>
                <AvatarImage src="https://via.placeholder.com/40" alt="User DP" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-48 bg-white shadow-lg rounded-md">
            <DropdownMenuItem asChild>
              <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Account Management</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/" className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white text-black shadow-md">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <Link to="/youtube" className="text-lg font-semibold hover:text-indigo-500">YouTube</Link>
            <Link to="/insta" className="text-lg font-semibold hover:text-indigo-500">Instagram</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
