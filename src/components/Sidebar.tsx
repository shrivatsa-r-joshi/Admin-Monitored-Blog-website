import { Home, TrendingUp, Compass, Plus, FileText, User, BarChart3, Settings, LogOut, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: { name: string; email: string; avatar: string };
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeSection, onSectionChange, user, onLogout, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, section: 'MAIN' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, section: 'MAIN' },
    { id: 'discover', label: 'Discover', icon: Compass, section: 'MAIN' },
    { id: 'new-article', label: 'New Article', icon: Plus, section: 'CREATE' },
    { id: 'drafts', label: 'Drafts', icon: FileText, section: 'CREATE' },
    { id: 'profile', label: 'Profile', icon: User, section: 'MANAGE' },
    { id: 'my-articles', label: 'My Articles', icon: FileText, section: 'MANAGE' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, section: 'MANAGE' },
  ];

  const sections = ['MAIN', 'CREATE', 'MANAGE'];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
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
              <span className="ml-3 font-bold text-xl">Ocean Of Thoughts</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            {sections.map((section) => (
              <div key={section} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3 px-1">
                  {section}
                </h3>
                <ul className="space-y-1">
                  {menuItems
                    .filter((item) => item.section === section)
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              onSectionChange(item.id);
                              onClose();
                            }}
                            className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                              activeSection === item.id
                                ? 'bg-gray-100 text-black border-r-2 border-black shadow-sm'
                                : 'text-foreground hover:bg-gray-100 hover:text-black'
                            }`}
                          >
                            <Icon className="h-4 w-4 mr-3" />
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-foreground hover:bg-gray-100 hover:text-black transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}