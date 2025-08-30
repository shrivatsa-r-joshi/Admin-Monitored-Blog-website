import { Search, Bell, Menu } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface HeaderProps {
  user: { name: string; email: string; avatar: string };
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ user, onMenuToggle, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-background border-b px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-black text-white text-xs">
              2
            </Badge>
          </Button>

          {/* User avatar */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user.name.split(' ')[0]}</p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}