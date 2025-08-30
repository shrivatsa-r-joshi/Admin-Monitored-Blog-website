import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useArticles } from '../contexts/ArticleContext';
import { MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  articleTitle: string;
  user?: {
    name: string;
    avatar: string;
  };
}

export function CommentsModal({ 
  isOpen, 
  onClose, 
  articleId, 
  articleTitle,
  user 
}: CommentsModalProps) {
  const { getComments, addComment } = useArticles();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const comments = getComments(articleId);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please write a comment first');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to comment');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addComment(
        articleId, 
        newComment.trim(), 
        user.name, 
        user.avatar
      );
      
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </DialogTitle>
          <p className="text-sm text-muted-foreground truncate">
            {articleTitle}
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {user && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a comment..."
                  className="min-h-16 resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Press Cmd+Enter to post
                  </p>
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || isSubmitting}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Send className="h-3 w-3" />
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!user && (
          <div className="border-t pt-4 text-center text-muted-foreground">
            <p>Please log in to join the conversation</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}