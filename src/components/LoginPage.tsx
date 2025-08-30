import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Shield, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { name: string; email: string; avatar: string; role?: 'user' | 'admin' }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (email && password) {
      if (isAdminLogin) {
        // Mock admin credentials check
        if (email === 'admin@devnovate.com' && password === 'admin123') {
          onLogin({
            name: 'Admin User',
            email: email,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            role: 'admin'
          });
        } else {
          alert('Invalid admin credentials. Use admin@devnovate.com / admin123');
          return;
        }
      } else {
        onLogin({
          name: name || 'Tojos',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          role: 'user'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 flex items-center justify-center shadow-lg">
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
            <span className="ml-4 text-3xl font-bold">Ocean Of Thoughts</span>
          </div>
          <CardTitle className="text-2xl text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp 
              ? 'Sign up to start sharing your articles' 
              : 'Sign in to your account to continue'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Admin/User Toggle */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isAdminLogin ? (
                  <Shield className="h-4 w-4 text-orange-600" />
                ) : (
                  <User className="h-4 w-4 text-blue-600" />
                )}
                <span className="text-sm font-medium">
                  {isAdminLogin ? 'Admin Login' : 'User Login'}
                </span>
              </div>
              <Switch
                checked={isAdminLogin}
                onCheckedChange={setIsAdminLogin}
              />
            </div>
            {isAdminLogin && (
              <p className="text-xs text-muted-foreground mt-2">
                Use admin@devnovate.com / admin123 for admin access
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && !isAdminLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>
          
          {!isAdminLogin && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}