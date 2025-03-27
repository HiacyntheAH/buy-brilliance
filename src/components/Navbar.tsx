
import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, Home, Package, ShoppingCart, Users, FileText, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 right-0 left-0 z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-xl font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  EnterpriseFlow
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Home className="h-4 w-4" />
                  <span>Tableau de bord</span>
                </Link>
                <Link to="/orders" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Commandes</span>
                </Link>
                <Link to="/suppliers" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Package className="h-4 w-4" />
                  <span>Fournisseurs</span>
                </Link>
                <Link to="/reports" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Rapports</span>
                </Link>
                <Link to="/users" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Utilisateurs</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/dashboard" className="text-xl font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            EnterpriseFlow
          </Link>
          
          <div className="hidden lg:flex items-center ml-6 space-x-4">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/dashboard") ? "text-primary" : "text-foreground"}`}
            >
              Tableau de bord
            </Link>
            <Link 
              to="/orders" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/orders") ? "text-primary" : "text-foreground"}`}
            >
              Commandes
            </Link>
            <Link 
              to="/suppliers" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive("/suppliers") ? "text-primary" : "text-foreground"}`}
            >
              Fournisseurs
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 rounded-full bg-secondary/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all duration-300"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-medium">
                  JD
                </div>
                <span className="text-sm font-medium hidden md:inline-block">John Doe</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link to="/profile" className="flex items-center w-full">Mon profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex items-center w-full">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Link to="/logout" className="flex items-center w-full">Déconnexion</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
