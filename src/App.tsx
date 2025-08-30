import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { AdminSidebar } from './components/AdminSidebar';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { TrendingPage } from './components/TrendingPage';
import { DiscoverPage } from './components/DiscoverPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { MyArticlesPage } from './components/MyArticlesPage';
import { NewArticlePage } from './components/NewArticlePage';
import { ArticleDetailPage } from './components/ArticleDetailPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ArticleModerationPage } from './components/ArticleModerationPage';
import { ContentManagementPage } from './components/ContentManagementPage';
import { AdminUsersPage, AdminSettingsPage } from './components/AdminPlaceholderPages';
import { DraftsPage, ProfilePage } from './components/PlaceholderPages';
import { PageNavigation } from './components/PageNavigation';
import { ArticleProvider } from './contexts/ArticleContext';
import { Toaster } from './components/ui/sonner';

interface User {
  name: string;
  email: string;
  avatar: string;
  role?: 'user' | 'admin';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Set default admin section for admin users
    if (userData.role === 'admin') {
      setActiveSection('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('home');
    setSearchQuery('');
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSelectedArticleId(null); // Clear selected article when changing sections
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
    setActiveSection('article-detail');
  };

  const handleBackFromArticle = () => {
    setSelectedArticleId(null);
    setActiveSection('home'); // Or go back to previous section
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Define page navigation flow
  const getPageNavigation = (currentSection: string) => {
    const navigationFlow = [
      { section: 'discover', label: 'Discover' },
      { section: 'home', label: 'Home' },
      { section: 'trending', label: 'Trending' }
    ];

    const currentIndex = navigationFlow.findIndex(page => page.section === currentSection);
    
    if (currentIndex === -1) return {};

    return {
      previousPage: currentIndex > 0 ? navigationFlow[currentIndex - 1] : undefined,
      nextPage: currentIndex < navigationFlow.length - 1 ? navigationFlow[currentIndex + 1] : undefined
    };
  };

  // Show login page if user is not authenticated
  if (!user) {
    return (
      <ArticleProvider>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </ArticleProvider>
    );
  }

  // Check if user is admin
  const isAdmin = user.role === 'admin';

  // Render main content based on active section
  const renderContent = () => {
    if (isAdmin) {
      switch (activeSection) {
        case 'admin-dashboard':
          return <AdminDashboard />;
        case 'admin-moderation':
          return <ArticleModerationPage />;
        case 'admin-users':
          return <AdminUsersPage />;
        case 'admin-analytics':
          return <AnalyticsPage />;
        case 'admin-content-management':
          return <ContentManagementPage />;
        case 'admin-settings':
          return <AdminSettingsPage />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeSection) {
        case 'home':
          return <HomePage searchQuery={searchQuery} onSectionChange={handleSectionChange} onArticleSelect={handleArticleSelect} user={user} />;
        case 'trending':
          return <TrendingPage onSectionChange={handleSectionChange} onArticleSelect={handleArticleSelect} user={user} />;
        case 'discover':
          return <DiscoverPage onSectionChange={handleSectionChange} />;
        case 'new-article':
          return <NewArticlePage user={user} />;
        case 'drafts':
          return <DraftsPage />;
        case 'profile':
          return <ProfilePage />;
        case 'my-articles':
          return <MyArticlesPage />;
        case 'analytics':
          return <AnalyticsPage />;
        case 'article-detail':
          return selectedArticleId ? (
            <ArticleDetailPage
              articleId={selectedArticleId}
              onBack={handleBackFromArticle}
              user={user}
            />
          ) : (
            <HomePage searchQuery={searchQuery} onSectionChange={handleSectionChange} onArticleSelect={handleArticleSelect} user={user} />
          );
        default:
          return <HomePage searchQuery={searchQuery} onSectionChange={handleSectionChange} onArticleSelect={handleArticleSelect} user={user} />;
      }
    }
  };

  return (
    <ArticleProvider>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar - Admin or Regular User */}
          {isAdmin ? (
            <AdminSidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              user={user}
              onLogout={handleLogout}
              isOpen={sidebarOpen}
              onClose={handleSidebarClose}
            />
          ) : (
            <Sidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              user={user}
              onLogout={handleLogout}
              isOpen={sidebarOpen}
              onClose={handleSidebarClose}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 lg:ml-64">
            {/* Header */}
            <Header
              user={user}
              onMenuToggle={handleMenuToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Page Content */}
            <main className="min-h-[calc(100vh-4rem)] relative">
              {renderContent()}
            </main>
          </div>
        </div>

        {/* Page Navigation - Only show for regular user main content pages */}
        {!isAdmin && ['home', 'trending', 'discover'].includes(activeSection) && (
          <PageNavigation
            {...getPageNavigation(activeSection)}
            onSectionChange={handleSectionChange}
          />
        )}

        {/* Toast notifications */}
        <Toaster />
      </div>
    </ArticleProvider>
  );
}