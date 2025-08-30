import { Code, Server, Settings, Brain, Smartphone, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface DiscoverPageProps {
  onSectionChange?: (section: string) => void;
}

export function DiscoverPage({ onSectionChange }: DiscoverPageProps) {
  const categories = [
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Discover the latest in frontend',
      icon: Code,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    },
    {
      id: 'backend',
      title: 'Backend',
      description: 'Discover the latest in backend',
      icon: Server,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    },
    {
      id: 'devops',
      title: 'DevOps',
      description: 'Discover the latest in devops',
      icon: Settings,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    },
    {
      id: 'aiml',
      title: 'AI/ML',
      description: 'Discover the latest in ai/ml',
      icon: Brain,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      description: 'Discover the latest in mobile',
      icon: Smartphone,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Discover the latest in design',
      icon: Palette,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-black'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    // Mock category navigation
  };

  return (
    <div className="p-6">
      {/* Section Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSectionChange?.('trending')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Trending
        </Button>
        <div className="text-muted-foreground">•</div>
        <h1 className="text-2xl font-semibold">Discover Articles</h1>
        <div className="text-muted-foreground">•</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSectionChange?.('home')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          Home
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mb-12">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore articles by category, tags, or browse our curated collections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`p-8 rounded-2xl border-2 transition-all hover:shadow-lg hover:scale-105 text-center group ${category.color}`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 ${category.iconColor}`}>
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Categories */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Popular This Month</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-medium mb-1">React Patterns</h4>
            <p className="text-sm text-muted-foreground">142 articles</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-medium mb-1">TypeScript Tips</h4>
            <p className="text-sm text-muted-foreground">89 articles</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-medium mb-1">DevOps Tools</h4>
            <p className="text-sm text-muted-foreground">76 articles</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h4 className="font-medium mb-1">AI Applications</h4>
            <p className="text-sm text-muted-foreground">63 articles</p>
          </div>
        </div>
      </div>
    </div>
  );
}