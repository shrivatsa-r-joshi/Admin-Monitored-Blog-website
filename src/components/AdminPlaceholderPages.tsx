import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Users, Settings, BarChart3 } from 'lucide-react';

export function AdminUsersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">User Management</h3>
          <p className="text-muted-foreground mb-4">
            This feature will allow you to manage user accounts, roles, and permissions.
          </p>
          <div className="text-sm text-muted-foreground">
            Features coming soon:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View all registered users</li>
              <li>Manage user roles and permissions</li>
              <li>User activity monitoring</li>
              <li>Account moderation tools</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Admin Settings</h3>
          <p className="text-muted-foreground mb-4">
            Configure global settings for the blog platform.
          </p>
          <div className="text-sm text-muted-foreground">
            Settings coming soon:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Site configuration</li>
              <li>Content moderation rules</li>
              <li>Notification preferences</li>
              <li>Security settings</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}