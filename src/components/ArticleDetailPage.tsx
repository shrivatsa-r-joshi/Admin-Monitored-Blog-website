import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle, Eye, Share2, Bookmark, Calendar, Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CommentsModal } from './CommentsModal';
import { useArticles } from '../contexts/ArticleContext';
import { toast } from 'sonner@2.0.3';

interface ArticleDetailPageProps {
  articleId: string;
  onBack: () => void;
  user?: {
    name: string;
    avatar: string;
  };
}

export function ArticleDetailPage({ articleId, onBack, user }: ArticleDetailPageProps) {
  const { articles, toggleLike, incrementViews } = useArticles();
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const article = articles.find(a => a.id === articleId);

  useEffect(() => {
    if (article) {
      // Increment views when article is loaded
      incrementViews(article.id);
    }
  }, [article, incrementViews]);

  if (!article) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Article not found</h2>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    toggleLike(article.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Article link copied to clipboard!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  // Generate full article content
  const generateFullContent = (title: string, description: string) => {
    const sections = [
      {
        title: "Introduction",
        content: `${description} In this comprehensive guide, we'll explore the fundamental concepts and advanced techniques that will help you master this topic.`
      },
      {
        title: "Core Concepts",
        content: "Understanding the foundational principles is crucial for building robust applications. Let's dive into the key concepts that form the backbone of modern development practices."
      },
      {
        title: "Best Practices",
        content: "Following industry best practices ensures that your code is maintainable, scalable, and performant. Here are the essential guidelines that experienced developers follow."
      },
      {
        title: "Advanced Techniques",
        content: "Once you've mastered the basics, these advanced techniques will help you solve complex problems and optimize your workflow for better results."
      },
      {
        title: "Real-World Examples",
        content: "Let's look at practical examples that demonstrate how these concepts apply in real-world scenarios. These examples will help you understand the practical applications."
      },
      {
        title: "Common Pitfalls",
        content: "Even experienced developers make mistakes. By understanding these common pitfalls, you can avoid them and write more reliable code."
      },
      {
        title: "Conclusion",
        content: "By implementing these strategies and techniques, you'll be well-equipped to tackle complex challenges and build exceptional applications that users love."
      }
    ];

    return sections;
  };

  const fullContent = generateFullContent(article.title, article.description);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="flex items-center gap-2"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Featured image */}
        {article.image && (
          <div className="mb-8">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* Author and metadata */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{article.author.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.publishDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement stats */}
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                  article.isLiked 
                    ? 'text-red-500' 
                    : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 transition-all duration-200 ${
                  article.isLiked ? 'fill-current scale-110' : ''
                }`} />
                <span>{article.likes}</span>
              </button>
              
              <button
                onClick={() => setShowComments(true)}
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{article.comments}</span>
              </button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Article content sections */}
        <div className="prose prose-lg max-w-none">
          {fullContent.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="text-foreground leading-relaxed mb-6">
                {section.content}
              </p>
              
              {/* Add some code examples for programming articles */}
              {article.tags.some(tag => ['React', 'JavaScript', 'TypeScript', 'Node.js'].includes(tag)) && index === 2 && (
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                      <code className="text-sm">
{`// Example implementation
function optimizePerformance() {
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(props);
  }, [props]);
  
  return memoizedValue;
}`}
                      </code>
                    </pre>
                  </CardContent>
                </Card>
              )}
            </section>
          ))}
        </div>

        {/* Author bio section */}
        <Separator className="my-8" />
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">About {article.author.name}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {article.author.name} is a passionate developer and writer who loves sharing knowledge 
                  about modern web technologies. With years of experience in the field, they focus on 
                  creating content that helps developers build better applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Modal */}
        <CommentsModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          articleId={article.id}
          articleTitle={article.title}
          user={user}
        />
      </article>
    </div>
  );
}