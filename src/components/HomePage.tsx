import { useState } from 'react';
import { ArticleCard, Article } from './ArticleCard';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useArticles } from '../contexts/ArticleContext';

interface HomePageProps {
  searchQuery: string;
  onSectionChange?: (section: string) => void;
  onArticleSelect?: (articleId: string) => void;
  user?: {
    name: string;
    avatar: string;
  };
}

export function HomePage({ searchQuery, onSectionChange, onArticleSelect, user }: HomePageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const { articles } = useArticles();

  // Filter articles based on search query
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleLike = (id: string) => {
    // Mock like functionality
    console.log('Liked article:', id);
  };

  const handleReadMore = (id: string) => {
    onArticleSelect?.(id);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-6">
      {/* Section Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSectionChange?.('discover')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Discover
          </Button>
          <div className="text-muted-foreground">•</div>
          <h1 className="text-2xl font-semibold">Latest Articles</h1>
          <div className="text-muted-foreground">•</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSectionChange?.('trending')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            Trending
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" className="text-black hover:text-black hover:bg-gray-100">
          View All
        </Button>
      </div>

      {searchQuery && (
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onLike={handleLike}
            onReadMore={handleReadMore}
            user={user}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 p-0 ${
                    currentPage === pageNum 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'hover:bg-white/50'
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'
            }`}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}