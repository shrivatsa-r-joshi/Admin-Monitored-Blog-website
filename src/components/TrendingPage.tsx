import { useState } from 'react';
import { ArticleCard, Article } from './ArticleCard';
import { TrendingUp, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useArticles } from '../contexts/ArticleContext';

interface TrendingPageProps {
  onSectionChange?: (section: string) => void;
  onArticleSelect?: (articleId: string) => void;
  user?: {
    name: string;
    avatar: string;
  };
}

export function TrendingPage({ onSectionChange, onArticleSelect, user }: TrendingPageProps) {
  const { articles } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  // Sort articles by engagement score for trending
  const calculateTrendingScore = (article: Article) => {
    const hoursOld = Math.random() * 168; // Random age in hours (0-7 days)
    const engagementScore = article.likes + (article.comments * 2) + (article.views * 0.1);
    return engagementScore / Math.max(hoursOld, 1); // Trending score
  };

  const sortedArticles = [...articles].sort((a, b) => 
    calculateTrendingScore(b) - calculateTrendingScore(a)
  );

  const trendingArticles = sortedArticles.slice(0, 3);
  const weeklyTrending = sortedArticles.slice(0, 6);
  const monthlyTrending = sortedArticles;

  // Filter articles based on search query
  const filterArticles = (articleList: Article[]) => {
    if (!searchQuery) return articleList;
    
    return articleList.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleLike = (id: string) => {
    console.log('Liked article:', id);
  };

  const handleReadMore = (id: string) => {
    onArticleSelect?.(id);
  };

  return (
    <div className="p-6">
      {/* Section Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSectionChange?.('home')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Home
        </Button>
        <div className="text-muted-foreground">•</div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-black" />
          <h1 className="text-2xl font-semibold">Trending This Week</h1>
        </div>
        <div className="text-muted-foreground">•</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSectionChange?.('discover')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          Discover
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trending articles..."
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Searching for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        {trendingArticles.length > 0 && (
          <>
            {/* Featured trending article */}
            <div className="max-w-2xl">
              <ArticleCard
                article={filterArticles(trendingArticles)[0] || trendingArticles[0]}
                onLike={handleLike}
                onReadMore={handleReadMore}
                size="large"
                user={user}
              />
            </div>
          </>
        )}
      </div>

      {/* Trending Tabs */}
      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Trending Today</h2>
            <p className="text-muted-foreground">Most popular articles in the last 24 hours</p>
          </div>
          {(() => {
            const filteredArticles = filterArticles(trendingArticles.slice(0, 3));
            return filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLike}
                    onReadMore={handleReadMore}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles found matching your search.</p>
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Weekly Trending</h2>
            <p className="text-muted-foreground">Most popular articles this week</p>
          </div>
          {(() => {
            const filteredArticles = filterArticles(weeklyTrending);
            return filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLike}
                    onReadMore={handleReadMore}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles found matching your search.</p>
              </div>
            );
          })()}
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Monthly Trending</h2>
            <p className="text-muted-foreground">Most popular articles this month</p>
          </div>
          {(() => {
            const filteredArticles = filterArticles(monthlyTrending);
            return filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLike}
                    onReadMore={handleReadMore}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No articles found matching your search.</p>
              </div>
            );
          })()}
        </TabsContent>
      </Tabs>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          View All Trending Articles
        </Button>
      </div>
    </div>
  );
}