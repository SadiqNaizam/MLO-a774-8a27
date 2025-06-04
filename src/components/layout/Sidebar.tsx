import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Home, Search, Library, PlusSquare, Heart, Settings } from 'lucide-react'; // Example icons

// Doraemon theme colors (placeholders, adjust as needed)
// Doraemon Blue: #00A0E9
// Doraemon Yellow: #FFD700 (Bell)
// Doraemon Red: #E60012 (Collar)
// Doraemon White: #FFFFFF

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  console.log(`NavItem: Rendering ${label}, Active: ${isActive}`);
  return (
    <Link to={to}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={`w-full justify-start font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
        // Example Doraemon theme hover: hover:bg-blue-100
      >
        {icon}
        <span className="ml-3">{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  console.log("Rendering Sidebar, current location:", location.pathname);

  const mainNavItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/search', icon: <Search size={20} />, label: 'Search' },
    { to: '/library', icon: <Library size={20} />, label: 'Your Library' },
  ];

  const secondaryNavItems = [
    { to: '/playlist/create', icon: <PlusSquare size={20} />, label: 'Create Playlist' },
    { to: '/collection/tracks', icon: <Heart size={20} />, label: 'Liked Songs' },
  ];

  // Placeholder for user playlists - this would typically be dynamic
  const userPlaylists = [
    { id: '1', name: 'Doraemon OSTs', to: '/playlist/1'},
    { id: '2', name: 'Chill Vibes', to: '/playlist/2'},
    { id: '3', name: 'Nobita\'s Study Mix', to: '/playlist/3'},
  ];

  return (
    <aside className="w-64 bg-card border-r h-screen flex flex-col sticky top-0">
      {/* Doraemon-themed logo/header placeholder */}
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2">
          {/* Placeholder for a Doraemon-esque logo */}
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8 bg-blue-500 rounded-full" /> {/* Example themed placeholder */}
          <h1 className="text-xl font-bold text-primary">Music App</h1>
        </Link>
      </div>

      <nav className="p-3 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.label} {...item} isActive={location.pathname === item.to} />
        ))}
      </nav>

      <nav className="p-3 space-y-1 mt-2">
        {secondaryNavItems.map((item) => (
          <NavItem key={item.label} {...item} isActive={location.pathname === item.to} />
        ))}
      </nav>

      <Separator className="my-2" />

      <ScrollArea className="flex-grow px-3">
        <div className="space-y-1 pb-4">
          <h2 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Playlists</h2>
          {userPlaylists.map((playlist) => (
             <Link to={playlist.to} key={playlist.id}>
                <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground hover:text-primary truncate">
                    {playlist.name}
                </Button>
             </Link>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t mt-auto">
        <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary">
                <Settings size={20} />
                <span className="ml-3">Settings</span>
            </Button>
        </Link>
      </div>
    </aside>
  );
};

// Helper component (can be moved to ui/separator if not already there)
const Separator: React.FC<{className?: string}> = ({ className }) => (
  <hr className={`border-border ${className}`} />
);

export default Sidebar;