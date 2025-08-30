import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useArticles } from '../contexts/ArticleContext';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  EyeOff, 
  Users,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export function AdminDashboard() {
  const { articles, comments } = useArticles();

  // Calculate statistics
  const totalArticles = articles.length;
  const pendingArticles = articles.filter(article => article.status === 'pending').length;
  const approvedArticles = articles.filter(article => article.status === 'approved').length;
  const rejectedArticles = articles.filter(article => article.status === 'rejected').length;
  const hiddenArticles = articles.filter(article => article.status === 'hidden').length;
  const totalComments = comments.length;
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);

  const stats = [
    {
      title: 'Total Articles',
      value: totalArticles,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12% from last month'
    },
    {
      title: 'Pending Review',
      value: pendingArticles,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Requires attention'
    },
    {
      title: 'Approved',
      value: approvedArticles,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+8% this month'
    },
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+25% from last week'
    },
    {
      title: 'Total Comments',
      value: totalComments,
      icon: MessageSquare,
      color: 'bg-indigo-500',
      change: 'Active discussions'
    },
    {
      title: 'Hidden Articles',
      value: hiddenArticles,
      icon: EyeOff,
      color: 'bg-gray-500',
      change: 'Moderation actions'
    }
  ];

  // Recent activity data
  const recentActivity = [
    {
      type: 'approval',
      title: 'Approved "Building Scalable React Applications"',
      author: 'Alex Johnson',
      time: '2 hours ago',
      status: 'approved'
    },
    {
      type: 'submission',
      title: 'New article submitted: "Docker Container Security"',
      author: 'David Kim',
      time: '4 hours ago',
      status: 'pending'
    },
    {
      type: 'rejection',
      title: 'Rejected "Machine Learning Fundamentals"',
      author: 'Lisa Zhang',
      time: '6 hours ago',
      status: 'rejected'
    },
    {
      type: 'comment',
      title: '5 new comments on trending articles',
      author: 'Various users',
      time: '1 hour ago',
      status: 'info'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'submission':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejection':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.info}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your blog management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.author} • {activity.time}
                    </p>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">
                    {pendingArticles} articles pending review
                  </span>
                </div>
                <p className="text-sm text-yellow-700">
                  Review and approve or reject submitted articles.
                </p>
              </div>
              
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    {approvedArticles} approved articles
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Monitor performance and engagement metrics.
                </p>
              </div>

              {rejectedArticles > 0 && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-800">
                      {rejectedArticles} rejected articles
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    Follow up with authors for improvements.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}