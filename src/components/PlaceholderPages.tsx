import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, FileText, User } from 'lucide-react';

export function DraftsPage() {
  const drafts = [
    {
      id: '1',
      title: 'Advanced React Patterns (Draft)',
      description: 'Exploring compound components and render props...',
      lastModified: 'Jan 12, 2024'
    },
    {
      id: '2',
      title: 'Node.js Security Best Practices (Draft)',
      description: 'Essential security measures for Node.js applications...',
      lastModified: 'Jan 8, 2024'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Drafts</h1>
          <p className="text-muted-foreground">{drafts.length} draft articles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Draft
        </Button>
      </div>

      <div className="space-y-4">
        {drafts.map((draft) => (
          <Card key={draft.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{draft.title}</h3>
                  <p className="text-muted-foreground mb-2">{draft.description}</p>
                  <p className="text-sm text-muted-foreground">Last modified: {draft.lastModified}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Continue Writing</Button>
                  <Button size="sm">Publish</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {drafts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No drafts yet</h3>
          <p className="text-muted-foreground mb-4">Save your work in progress here.</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Start Writing
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="h-8 w-8 text-black" />
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Tojos" />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="tojos30459@jupoelar.com" />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself..." />
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://yourwebsite.com" />
          </div>
          
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}