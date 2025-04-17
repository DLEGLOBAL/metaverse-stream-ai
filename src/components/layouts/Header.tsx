import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Search, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    
    if (searchQuery.trim()) {
      toast({
        title: 'Search',
        description: `Searching for "${searchQuery}"`,
      });
      // Reset form
      e.currentTarget.reset();
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out',
    });
  };

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/settings');
  };

  return (
    <header className="h-16 bg-meta-slate border-b border-meta-teal/20 flex items-center justify-between px-4">
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            name="search"
            placeholder="Search..." 
            className="w-full rounded-md bg-secondary/50 border-0 pl-8 h-9 focus:ring-1 focus:ring-meta-teal/50 focus-visible:outline-none"
          />
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-meta-teal rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
