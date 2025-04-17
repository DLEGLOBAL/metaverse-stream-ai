
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, HelpCircle, Search, Minimize2, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';
import { useDesktop } from '@/contexts/DesktopContext';

type HeaderProps = {
  sidebarCollapsed: boolean;
};

const Header = ({ sidebarCollapsed }: HeaderProps) => {
  const { streamStatus, startStream } = useAppContext();
  const { isDesktop, platform } = useDesktop();

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
  
  const handleNotifications = () => {
    toast({
      title: 'Notifications',
      description: 'You have no new notifications',
    });
  };
  
  const handleHelp = () => {
    toast({
      title: 'Help Center',
      description: 'Opening help documentation...',
    });
  };
  
  // Desktop window control handlers (would interact with Electron in a real app)
  const handleMinimize = () => {
    console.log("Minimize window");
    toast({
      title: 'Window Controls',
      description: 'Window minimized',
    });
  };
  
  const handleMaximize = () => {
    console.log("Maximize window");
    toast({
      title: 'Window Controls',
      description: 'Window maximized',
    });
  };
  
  const handleClose = () => {
    console.log("Close window");
    toast({
      title: 'Window Controls',
      description: 'Window will be minimized to system tray',
    });
  };

  return (
    <header className={`h-16 fixed top-0 right-0 ${sidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300 bg-meta-slate border-b border-meta-teal/20 z-40 flex items-center px-4`}>
      <div className="flex-1 flex items-center">
        <form onSubmit={handleSearch} className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            name="search"
            placeholder="Search..." 
            className="w-full rounded-md bg-secondary/50 border-0 pl-8 h-9 focus:ring-1 focus:ring-meta-teal/50 focus-visible:outline-none"
          />
        </form>
        
        {isDesktop && (
          <div className="ml-4 px-2 py-1 bg-meta-teal/10 rounded text-xs text-meta-teal">
            Running on {platform}
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={handleNotifications}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-meta-teal rounded-full"></span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleHelp}
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          className="hidden sm:flex border-meta-teal/30 hover:bg-meta-teal/10 hover:border-meta-teal/50"
          onClick={() => {
            if (streamStatus !== 'live') {
              startStream();
            } else {
              toast({
                title: 'Already Streaming',
                description: 'You are already live!',
              });
            }
          }}
        >
          {streamStatus === 'live' ? 'Currently Live' : 'Start Streaming'}
        </Button>
        
        {isDesktop && (
          <div className="flex items-center space-x-1 ml-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleMaximize}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 hover:text-red-400" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border border-meta-teal/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-meta-dark-blue text-meta-teal">MS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: 'Profile', description: 'Viewing your profile' })}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: 'Settings', description: 'Opening settings' })}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({ title: 'Subscription', description: 'Manage your subscription' })}>
              Subscription
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/" className="w-full">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
