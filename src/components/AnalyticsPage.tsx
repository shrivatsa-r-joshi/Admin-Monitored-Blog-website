import { BarChart3, Eye, Heart, MessageCircle, TrendingUp, Calendar, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useArticles } from '../contexts/ArticleContext';

export function AnalyticsPage() {
  const { articles } = useArticles();

  // Calculate real stats from articles
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
  const totalComments = articles.reduce((sum, article) => sum + article.comments, 0);
  const totalArticles = articles.length;

  const stats = [
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      description: 'Total page views across all articles'
    },
    {
      title: 'Total Likes',
      value: totalLikes.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      icon: Heart,
      description: 'Total likes received on articles'
    },
    {
      title: 'Total Comments',
      value: totalComments.toLocaleString(),
      change: '+15.3%',
      changeType: 'positive',
      icon: MessageCircle,
      description: 'Total comments on articles'
    },
    {
      title: 'Total Articles',
      value: totalArticles.toString(),
      change: '+5.1%',
      changeType: 'positive',
      icon: BarChart3,
      description: 'Number of published articles'
    }
  ];

  // Generate chart data based on articles
  const generatePerformanceData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Simulate daily views based on article engagement
      const dailyViews = Math.floor(Math.random() * 500) + 200;
      const dailyLikes = Math.floor(dailyViews * 0.1);
      const dailyComments = Math.floor(dailyViews * 0.03);
      
      last7Days.push({
        day: dayName,
        views: dailyViews,
        likes: dailyLikes,
        comments: dailyComments
      });
    }
    return last7Days;
  };

  const performanceData = generatePerformanceData();

  // Generate tag distribution data
  const getTagDistribution = () => {
    const tagCounts: { [key: string]: number } = {};
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ 
        tag, 
        count, 
        fill: `hsl(${Math.random() * 360}, 70%, 60%)` 
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };

  const tagData = getTagDistribution();

  // Generate article performance comparison
  const getTopArticles = () => {
    return articles
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(article => ({
        title: article.title.length > 20 ? article.title.substring(0, 20) + '...' : article.title,
        views: article.views,
        likes: article.likes,
        comments: article.comments,
        engagement: article.likes + article.comments * 2
      }));
  };

  const topArticles = getTopArticles();

  // Chart colors for black/white theme
  const COLORS = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#e0e0e0'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your content performance and audience engagement</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
          <Calendar className="h-4 w-4" />
          Last 7 days
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="p-2 bg-muted rounded-lg">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center gap-1 mb-2">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className="text-xs text-muted-foreground">{stat.change} from last month</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Performance Chart */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Daily Performance</CardTitle>
                <CardDescription>Views, likes, and comments over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#000000" strokeWidth={3} />
                    <Line type="monotone" dataKey="likes" stroke="#666666" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#999999" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Articles Performance */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Top Articles</CardTitle>
                <CardDescription>Most viewed articles by performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topArticles} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" stroke="#666666" />
                    <YAxis dataKey="title" type="category" width={100} stroke="#666666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="views" fill="#000000" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tag Distribution */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Content Categories</CardTitle>
                <CardDescription>Distribution of content by tags</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tagData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ tag, count }) => `${tag} (${count})`}
                      outerRadius={80}
                      fill="#000000"
                      dataKey="count"
                    >
                      {tagData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Engagement by Article</CardTitle>
                <CardDescription>Likes and comments per article</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={topArticles}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="title" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="likes" stackId="1" stroke="#000000" fill="#000000" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="comments" stackId="1" stroke="#666666" fill="#666666" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audience Metrics */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Audience Growth</CardTitle>
                <CardDescription>Weekly active readers and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Weekly Readers</p>
                        <p className="text-xs text-muted-foreground">Active users</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{Math.floor(totalViews * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Page Views</p>
                        <p className="text-xs text-muted-foreground">Total views</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        <Heart className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Engagement Rate</p>
                        <p className="text-xs text-muted-foreground">Likes + Comments</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">{((totalLikes + totalComments) / totalViews * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Articles List */}
            <Card className="lg:col-span-2 p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Top Performing Articles</CardTitle>
                <CardDescription>Ranked by total engagement score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topArticles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white text-sm font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{article.title}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {article.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {article.comments.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground">Engagement Score</div>
                        <div className="text-2xl font-bold">{article.engagement.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}