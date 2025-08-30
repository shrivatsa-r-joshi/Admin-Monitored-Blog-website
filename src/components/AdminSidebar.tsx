import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  FileCheck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  X,
  Shield,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: {
    name: string;
    email: string;
    avatar: string;
    role?: 'user' | 'admin';
  };
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const adminSidebarItems = [
  { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'admin-moderation', label: 'Article Moderation', icon: FileCheck },
  { id: 'admin-users', label: 'Users', icon: Users },
  { id: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'admin-content-management', label: 'Content Management', icon: Eye },
  { id: 'admin-settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ 
  activeSection, 
  onSectionChange, 
  user, 
  onLogout, 
  isOpen, 
  onClose 
}: AdminSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center shadow-lg">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="45" fill="#000000"/>
                    
                    {/* Wave/Brain structure */}
                    <path 
                      d="M20 35 Q30 25 40 35 Q50 45 60 35 Q70 25 80 35 Q85 40 80 50 Q75 60 70 50 Q60 40 50 50 Q40 60 30 50 Q25 40 20 50 Z" 
                      fill="#ffffff" 
                      opacity="0.9"
                    />
                    
                    {/* Circuit traces */}
                    <path d="M75 30 L85 30 M75 35 L85 35" stroke="#ffffff" strokeWidth="1.5" opacity="0.7"/>
                    <circle cx="85" cy="30" r="1.5" fill="#ffffff" opacity="0.7"/>
                    <circle cx="85" cy="35" r="1.5" fill="#ffffff" opacity="0.7"/>
                    
                    {/* Central O shape */}
                    <path 
                      d="M35 40 Q45 30 55 40 Q65 50 55 60 Q45 70 35 60 Q25 50 35 40 Z" 
                      fill="#ffffff"
                    />
                    
                    {/* Additional wave details */}
                    <path d="M25 45 Q30 40 35 45" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
                    <path d="M65 45 Q70 40 75 45" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-sidebar-foreground">Admin Panel</h1>
                  <p className="text-xs text-sidebar-foreground/60">Ocean Of Thoughts</p>
                </div>
              </div>
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {adminSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start gap-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-gray-100 text-black shadow-sm' 
                      : 'text-foreground hover:bg-gray-100 hover:text-black'
                  }`}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-black">
                    Admin
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground hover:bg-gray-100 hover:text-black transition-all duration-200"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}