import { useState } from 'react';
import { Heart, MessageCircle, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CommentsModal } from './CommentsModal';
import { useArticles } from '../contexts/ArticleContext';

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  likes: number;
  comments: number;
  views: number;
  isLiked?: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'hidden';
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

interface ArticleCardProps {
  article: Article;
  onLike?: (id: string) => void;
  onReadMore?: (id: string) => void;
  size?: 'default' | 'large';
  user?: {
    name: string;
    avatar: string;
  };
}

export function ArticleCard({ article, onLike, onReadMore, size = 'default', user }: ArticleCardProps) {
  const isLarge = size === 'large';
  const { toggleLike, incrementViews } = useArticles();
  const [showComments, setShowComments] = useState(false);
  const [hasIncrementedViews, setHasIncrementedViews] = useState(false);

  const handleLike = () => {
    toggleLike(article.id);
    onLike?.(article.id);
  };

  const handleReadMore = () => {
    if (!hasIncrementedViews) {
      incrementViews(article.id);
      setHasIncrementedViews(true);
    }
    onReadMore?.(article.id);
  };

  const handleCommentsClick = () => {
    setShowComments(true);
  };
  
  return (
    <div className={`bg-card rounded-xl border hover:shadow-lg transition-shadow ${
      isLarge ? 'max-w-md' : 'max-w-sm'
    }`}>
      {/* Article Image */}
      <div className={`relative overflow-hidden rounded-t-xl ${
        isLarge ? 'h-48' : 'h-40'
      }`}>
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className={`font-semibold mb-2 line-clamp-2 ${
          isLarge ? 'text-lg' : 'text-base'
        }`}>
          {article.title}
        </h3>

        {/* Description */}
        <p className={`text-muted-foreground text-sm mb-4 ${
          isLarge ? 'line-clamp-4' : 'line-clamp-3'
        }`}>
          {article.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={article.author.avatar} alt={article.author.name} />
            <AvatarFallback>
              {article.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{article.author.name}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{article.publishDate}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-all duration-200 hover:scale-105 ${
                article.isLiked 
                  ? 'text-red-500' 
                  : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 transition-all duration-200 ${
                article.isLiked ? 'fill-current scale-110' : ''
              }`} />
              <span>{article.likes}</span>
            </button>
            
            <button
              onClick={handleCommentsClick}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{article.comments}</span>
            </button>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{article.views}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReadMore}
                          className="text-black hover:text-black hover:bg-gray-100 transition-all duration-200"
          >
            Read More
          </Button>
        </div>

        {/* Comments Modal */}
        <CommentsModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          articleId={article.id}
          articleTitle={article.title}
          user={user}
        />
      </div>
    </div>
  );
}