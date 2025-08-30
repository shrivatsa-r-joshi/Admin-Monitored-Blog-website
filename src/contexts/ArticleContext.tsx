import { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '../components/ArticleCard';

interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ArticleContextType {
  articles: Article[];
  comments: Comment[];
  addArticle: (article: Omit<Article, 'id' | 'likes' | 'comments' | 'views' | 'isLiked' | 'status'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  toggleLike: (articleId: string) => void;
  addComment: (articleId: string, content: string, author: string, avatar: string) => void;
  getComments: (articleId: string) => Comment[];
  incrementViews: (articleId: string) => void;
  getArticleById: (id: string) => Article | undefined;
  // Admin functions
  approveArticle: (id: string, reviewedBy: string) => void;
  rejectArticle: (id: string, reviewedBy: string, reason: string) => void;
  hideArticle: (id: string) => void;
  deleteArticle: (id: string) => void;
  submitArticleForReview: (id: string) => void;
  getPendingArticles: () => Article[];
  getPublishedArticles: () => Article[];
  getHiddenArticles: () => Article[];
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function useArticles() {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
}

interface ArticleProviderProps {
  children: ReactNode;
}

export function ArticleProvider({ children }: ArticleProviderProps) {
  // Initialize with existing articles
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'Building Scalable React Applications',
      description: 'When developing large-scale React applications, architecture becomes critical. This comprehensive guide covers component composition, state management patterns, and performance optimization strategies. Learn how to structure your codebase for maintainability and scalability using modern React patterns like compound components, render props, and custom hooks.',
      image: 'https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGxhcHRvcCUyMGNvZGV8ZW58MXx8fHwxNzU2NTQ2NzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'JavaScript', 'Architecture'],
      author: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 10, 2024',
      readTime: '8 min read',
      likes: 88,
      comments: 23,
      views: 1520,
      isLiked: false,
      status: 'approved',
      submittedAt: '2024-01-08T10:00:00Z',
      reviewedAt: '2024-01-08T14:00:00Z',
      reviewedBy: 'admin'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Patterns',
      description: 'TypeScript offers powerful type system features that go beyond basic typing. Discover advanced patterns like conditional types, mapped types, and utility types that will transform how you write type-safe code. This article explores real-world examples of generic constraints, template literal types, and how to leverage TypeScript\'s inference capabilities for better developer experience.',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwY29kZSUyMGVkaXRvcnxlbnwxfHx8fDE3NTY0MzI1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 5, 2024',
      readTime: '12 min read',
      likes: 67,
      comments: 15,
      views: 987,
      isLiked: false,
      status: 'approved',
      submittedAt: '2024-01-03T10:00:00Z',
      reviewedAt: '2024-01-03T16:00:00Z',
      reviewedBy: 'admin'
    },
    {
      id: '3',
      title: 'Modern CSS Grid Layouts',
      description: 'CSS Grid revolutionizes web layout design with its two-dimensional grid system. This comprehensive guide covers everything from basic grid concepts to advanced techniques like subgrid, grid areas, and responsive design patterns. Learn how to create complex layouts with clean, maintainable code and discover why CSS Grid is essential for modern web development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      tags: ['CSS', 'Grid', 'Frontend'],
      author: {
        name: 'Mike Davis',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Dec 28, 2023',
      readTime: '10 min read',
      likes: 92,
      comments: 31,
      views: 1789,
      isLiked: false,
      status: 'approved',
      submittedAt: '2023-12-26T10:00:00Z',
      reviewedAt: '2023-12-26T15:00:00Z',
      reviewedBy: 'admin'
    },
    {
      id: '4',
      title: 'Node.js Performance Optimization',
      description: 'Optimizing Node.js applications requires understanding the event loop, memory management, and asynchronous patterns. This deep-dive guide covers profiling techniques, clustering strategies, and performance monitoring tools. Learn how to identify bottlenecks, optimize database queries, implement caching strategies, and scale your Node.js applications for production environments.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      tags: ['Node.js', 'Backend', 'Performance'],
      author: {
        name: 'Emily Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b732?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Dec 25, 2023',
      readTime: '15 min read',
      likes: 134,
      comments: 42,
      views: 2156,
      isLiked: false,
      status: 'pending',
      submittedAt: '2023-12-23T10:00:00Z'
    },
    {
      id: '5',
      title: 'Docker Container Security Best Practices',
      description: 'Security in containerized environments requires careful attention to image composition, runtime configuration, and network policies. This comprehensive guide covers container hardening techniques, secrets management, and vulnerability scanning. Learn how to build secure Docker images, implement proper access controls, and monitor container runtime security for production deployments.',
      image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=300&fit=crop',
      tags: ['Docker', 'Security', 'DevOps'],
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Dec 20, 2023',
      readTime: '11 min read',
      likes: 76,
      comments: 18,
      views: 1234,
      isLiked: false,
      status: 'pending',
      submittedAt: '2023-12-18T10:00:00Z'
    },
    {
      id: '6',
      title: 'Machine Learning with Python Fundamentals',
      description: 'Starting your journey in machine learning requires understanding core concepts, algorithms, and practical implementation techniques. This beginner-friendly guide covers supervised and unsupervised learning, feature engineering, and model evaluation. Learn how to use popular libraries like scikit-learn and pandas to build your first ML models.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      tags: ['Python', 'Machine Learning', 'Data Science'],
      author: {
        name: 'Lisa Zhang',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Dec 15, 2023',
      readTime: '14 min read',
      likes: 95,
      comments: 27,
      views: 1567,
      isLiked: false,
      status: 'rejected',
      submittedAt: '2023-12-13T10:00:00Z',
      reviewedAt: '2023-12-13T18:00:00Z',
      reviewedBy: 'admin',
      rejectionReason: 'Content needs more technical depth and practical examples.'
    },
    {
      id: '7',
      title: 'Advanced React Hooks Patterns',
      description: 'Explore advanced patterns and techniques for using React hooks effectively in complex applications. Learn about custom hooks, optimization strategies, and common pitfalls to avoid when building scalable React applications with modern hook patterns.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      tags: ['React', 'Hooks', 'JavaScript', 'Frontend'],
      author: {
        name: 'Jordan Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 15, 2024',
      readTime: '9 min read',
      likes: 45,
      comments: 8,
      views: 234,
      isLiked: false,
      status: 'pending',
      submittedAt: '2024-01-15T08:30:00Z'
    },
    {
      id: '8',
      title: 'GraphQL Best Practices for Production',
      description: 'A comprehensive guide to implementing GraphQL in production environments. Covers schema design, query optimization, security considerations, and performance monitoring. Learn how to build robust GraphQL APIs that scale with your application needs.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      tags: ['GraphQL', 'API', 'Backend', 'Performance'],
      author: {
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b732?w=40&h=40&fit=crop&crop=face'
      },
      publishDate: 'Jan 12, 2024',
      readTime: '13 min read',
      likes: 67,
      comments: 12,
      views: 456,
      isLiked: false,
      status: 'pending',
      submittedAt: '2024-01-12T15:20:00Z'
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      articleId: '1',
      author: 'John Doe',
      content: 'Great article! Really helped me understand React architecture better.',
      timestamp: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      articleId: '1',
      author: 'Jane Smith',
      content: 'The section on component composition was particularly insightful.',
      timestamp: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ]);

  const addArticle = (articleData: Omit<Article, 'id' | 'likes' | 'comments' | 'views' | 'isLiked' | 'status'>) => {
    const newArticle: Article = {
      ...articleData,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      views: 0,
      isLiked: false,
      status: 'draft'
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...updates } : article
    ));
  };

  const toggleLike = (articleId: string) => {
    setArticles(prev => prev.map(article => {
      if (article.id === articleId) {
        const newLiked = !article.isLiked;
        return {
          ...article,
          isLiked: newLiked,
          likes: newLiked ? article.likes + 1 : article.likes - 1
        };
      }
      return article;
    }));
  };

  const addComment = (articleId: string, content: string, author: string, avatar: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      articleId,
      author,
      content,
      timestamp: 'just now',
      avatar
    };
    setComments(prev => [newComment, ...prev]);
    
    // Update comment count
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, comments: article.comments + 1 }
        : article
    ));
  };

  const getComments = (articleId: string) => {
    return comments.filter(comment => comment.articleId === articleId);
  };

  const incrementViews = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, views: article.views + 1 }
        : article
    ));
  };

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id);
  };

  // Admin functions
  const approveArticle = (id: string, reviewedBy: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: 'approved',
            reviewedAt: new Date().toISOString(),
            reviewedBy
          }
        : article
    ));
  };

  const rejectArticle = (id: string, reviewedBy: string, reason: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewedBy,
            rejectionReason: reason
          }
        : article
    ));
  };

  const hideArticle = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { ...article, status: 'hidden' }
        : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
    setComments(prev => prev.filter(comment => comment.articleId !== id));
  };

  const submitArticleForReview = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: 'pending',
            submittedAt: new Date().toISOString()
          }
        : article
    ));
  };

  const getPendingArticles = () => {
    return articles.filter(article => article.status === 'pending');
  };

  const getPublishedArticles = () => {
    return articles.filter(article => article.status === 'approved');
  };

  const getHiddenArticles = () => {
    return articles.filter(article => article.status === 'hidden');
  };

  return (
    <ArticleContext.Provider value={{
      articles,
      comments,
      addArticle,
      updateArticle,
      toggleLike,
      addComment,
      getComments,
      incrementViews,
      getArticleById,
      approveArticle,
      rejectArticle,
      hideArticle,
      deleteArticle,
      submitArticleForReview,
      getPendingArticles,
      getPublishedArticles,
      getHiddenArticles
    }}>
      {children}
    </ArticleContext.Provider>
  );
}