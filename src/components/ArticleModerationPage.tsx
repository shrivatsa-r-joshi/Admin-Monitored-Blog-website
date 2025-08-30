import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useArticles } from '../contexts/ArticleContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';

export function ArticleModerationPage() {
  const { 
    articles, 
    approveArticle, 
    rejectArticle, 
    getPendingArticles 
  } = useArticles();
  
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const pendingArticles = getPendingArticles();
  const rejectedArticles = articles.filter(article => article.status === 'rejected');

  const handleApprove = (articleId: string) => {
    approveArticle(articleId, 'Admin User');
  };

  const handleRejectClick = (articleId: string) => {
    setSelectedArticle(articleId);
    setShowRejectionDialog(true);
  };

  const handleRejectConfirm = () => {
    if (selectedArticle && rejectionReason.trim()) {
      rejectArticle(selectedArticle, 'Admin User', rejectionReason);
      setShowRejectionDialog(false);
      setSelectedArticle(null);
      setRejectionReason('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ArticleCard = ({ article, showActions = true }: { article: any; showActions?: boolean }) => (
    <Card className="mb-4">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
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
              
              {article.submittedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted {formatDate(article.submittedAt)}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{article.views} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {article.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Status badge */}
          <div className="ml-4">
            <Badge 
              className={
                article.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : article.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }
            >
              {article.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      {showActions && article.status === 'pending' && (
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button 
              onClick={() => handleApprove(article.id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleRejectClick(article.id)}
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        </CardContent>
      )}

      {article.status === 'rejected' && article.rejectionReason && (
        <CardContent className="pt-0">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</p>
            <p className="text-sm text-red-700">{article.rejectionReason}</p>
            {article.reviewedAt && (
              <p className="text-xs text-red-600 mt-2">
                Reviewed on {formatDate(article.reviewedAt)} by {article.reviewedBy}
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Article Moderation</h1>
        <p className="text-muted-foreground">Review and moderate article submissions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingArticles.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {articles.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedArticles.length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Article Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingArticles.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Rejected ({rejectedArticles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending articles</h3>
                <p className="text-muted-foreground">All articles have been reviewed.</p>
              </CardContent>
            </Card>
          ) : (
            pendingArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedArticles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No rejected articles</h3>
                <p className="text-muted-foreground">Great moderation work!</p>
              </CardContent>
            </Card>
          ) : (
            rejectedArticles.map(article => (
              <ArticleCard key={article.id} article={article} showActions={false} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please provide a reason for rejecting this article. This will help the author improve their content.
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowRejectionDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleRejectConfirm}
                disabled={!rejectionReason.trim()}
              >
                Reject Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}