import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useArticles } from '../contexts/ArticleContext';
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  Calendar,
  MessageSquare,
  Heart,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ContentManagementPage() {
  const { 
    articles, 
    hideArticle, 
    deleteArticle, 
    getPublishedArticles,
    getHiddenArticles
  } = useArticles();
  
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [actionType, setActionType] = useState<'hide' | 'delete'>('hide');

  const publishedArticles = getPublishedArticles();
  const hiddenArticles = getHiddenArticles();

  const handleHide = (articleId: string) => {
    hideArticle(articleId);
  };

  const handleDeleteClick = (article: any) => {
    setSelectedArticle(article);
    setActionType('delete');
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedArticle) {
      deleteArticle(selectedArticle.id);
      setShowDeleteDialog(false);
      setSelectedArticle(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ArticleManagementCard = ({ article, isHidden = false }: { article: any; isHidden?: boolean }) => (
    <Card className="mb-4 overflow-hidden">
      <div className="flex">
        {/* Article Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="flex-1 p-4">
          <CardHeader className="p-0 mb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2 line-clamp-1">{article.title}</CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {article.description}
                </p>
                
                {/* Author and metadata */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={article.author.avatar} alt={article.author.name} />
                      <AvatarFallback>
                        {article.author.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{article.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.publishDate}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags.slice(0, 3).map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{article.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Status badge */}
              <div className="ml-4">
                <Badge 
                  className={
                    isHidden
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }
                >
                  {isHidden ? 'Hidden' : 'Published'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          {/* Engagement Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{article.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{article.comments}</span>
            </div>
          </div>

          {/* Actions */}
          <CardContent className="p-0">
            <div className="flex gap-2">
              {!isHidden ? (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleHide(article.id)}
                    className="flex-1"
                  >
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Article
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(article)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {/* Implement unhide functionality */}}
                    className="flex-1"
                    disabled
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Unhide (Coming Soon)
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(article)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Content Management</h1>
        <p className="text-muted-foreground">Manage published and hidden articles</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published Articles</p>
                <p className="text-2xl font-bold text-green-600">{publishedArticles.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Active content</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hidden Articles</p>
                <p className="text-2xl font-bold text-gray-600">{hiddenArticles.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Moderated content</p>
              </div>
              <EyeOff className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Engagement</p>
                <p className="text-2xl font-bold text-purple-600">
                  {publishedArticles.reduce((sum, article) => sum + article.views + article.likes + article.comments, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Views + Likes + Comments</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Article Tabs */}
      <Tabs defaultValue="published" className="space-y-4">
        <TabsList>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Published ({publishedArticles.length})
          </TabsTrigger>
          <TabsTrigger value="hidden" className="flex items-center gap-2">
            <EyeOff className="h-4 w-4" />
            Hidden ({hiddenArticles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-4">
          {publishedArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No published articles</h3>
                <p className="text-muted-foreground">Articles will appear here once approved and published.</p>
              </CardContent>
            </Card>
          ) : (
            publishedArticles.map(article => (
              <ArticleManagementCard key={article.id} article={article} />
            ))
          )}
        </TabsContent>

        <TabsContent value="hidden" className="space-y-4">
          {hiddenArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <EyeOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No hidden articles</h3>
                <p className="text-muted-foreground">Articles you hide will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            hiddenArticles.map(article => (
              <ArticleManagementCard key={article.id} article={article} isHidden={true} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Article
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 font-medium mb-2">
                ⚠️ This action cannot be undone
              </p>
              <p className="text-sm text-red-700">
                Deleting this article will permanently remove it from the system, including all associated comments and engagement data.
              </p>
            </div>
            
            {selectedArticle && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-sm mb-1">Article to be deleted:</p>
                <p className="text-sm text-muted-foreground">"{selectedArticle.title}"</p>
                <p className="text-xs text-muted-foreground mt-1">
                  by {selectedArticle.author.name}
                </p>
              </div>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteConfirm}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}