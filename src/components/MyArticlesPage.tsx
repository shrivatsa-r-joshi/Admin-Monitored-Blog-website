import { useState } from 'react';
import { ArticleCard, Article } from './ArticleCard';
import { Button } from './ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';

export function MyArticlesPage() {
  const [articles] = useState<Article[]>([
    {
      id: 'my1',
      title: 'Advanced TypeScript Patterns',
      description: 'Explore advanced TypeScript patterns that will make your code more robust and maintainable.',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwY29kZSUyMGVkaXRvcnxlbnwxfHx8fDE3NTY0MzI1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 5, 2024',
      readTime: '12 min read',
      likes: 67,
      comments: 15,
      views: 987,
      isLiked: false
    },
    {
      id: 'my2',
      title: 'Building Scalable React Applications',
      description: 'Learn best practices for building large-scale React applications with modern tools and patterns.',
      image: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzU2NTQ2NzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'JavaScript', 'Architecture'],
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 10, 2024',
      readTime: '8 min read',
      likes: 88,
      comments: 23,
      views: 1520,
      isLiked: false
    }
  ]);

  const handleEdit = (id: string) => {
    console.log('Edit article:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete article:', id);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My Articles</h1>
          <p className="text-muted-foreground">{articles.length} published articles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-medium mb-1">Total Views</h3>
          <p className="text-2xl font-bold">2,507</p>
          <p className="text-sm text-green-600">+12% this month</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-medium mb-1">Total Likes</h3>
          <p className="text-2xl font-bold">155</p>
          <p className="text-sm text-green-600">+8% this month</p>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-medium mb-1">Comments</h3>
          <p className="text-2xl font-bold">38</p>
          <p className="text-sm text-green-600">+15% this month</p>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-card p-6 rounded-lg border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <Badge variant="secondary">Published</Badge>
                </div>
                <p className="text-muted-foreground mb-3">{article.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.views} views</span>
                  <span>•</span>
                  <span>{article.likes} likes</span>
                  <span>•</span>
                  <span>{article.comments} comments</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(article.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No articles yet</h3>
          <p className="text-muted-foreground mb-4">Start writing your first article to share your knowledge with the community.</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Write Your First Article
          </Button>
        </div>
      )}
    </div>
  );
}