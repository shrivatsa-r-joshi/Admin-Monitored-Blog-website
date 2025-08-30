import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useArticles } from '../contexts/ArticleContext';
import { toast } from 'sonner@2.0.3';
import { 
  Save, 
  Send, 
  Image, 
  Eye, 
  X, 
  Plus,
  FileText,
  Clock,
  User
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface NewArticlePageProps {
  user?: User;
}

export function NewArticlePage({ user }: NewArticlePageProps) {
  const { addArticle } = useArticles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const estimatedReadTime = Math.max(1, Math.ceil(content.split(' ').length / 200));

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast.error('Please add a title before saving');
      return;
    }
    
    // In a real app, this would save to drafts
    toast.success('Article saved to drafts');
  };

  const handlePublish = async () => {
    if (!title.trim() || !description.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (tags.length === 0) {
      toast.error('Please add at least one tag');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addArticle({
        title: title.trim(),
        description: description.trim(),
        image: imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
        tags,
        author: {
          name: user?.name || 'Anonymous',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
        },
        publishDate: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        readTime: `${estimatedReadTime} min read`
      });

      toast.success('Article published successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setContent('');
      setTags([]);
      setImageUrl('');
      setPreviewMode(false);
    } catch (error) {
      toast.error('Failed to publish article');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (previewMode) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Article Preview</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Edit
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {imageUrl && (
              <div className="mb-6">
                <ImageWithFallback
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{user?.name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{estimatedReadTime} min read</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">{description}</p>
            
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{content}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Create New Article</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a brief description of your article..."
                  className="mt-1 min-h-20"
                />
              </div>

              <div>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <ImageWithFallback
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here... You can use markdown formatting."
                className="min-h-96 resize-none"
              />
              <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                <span>{content.split(' ').length} words</span>
                <span>~{estimatedReadTime} min read</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag..."
                  className="flex-1"
                />
                <Button
                  onClick={handleAddTag}
                  size="sm"
                  disabled={!newTag.trim() || tags.length >= 5}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to help readers discover your article
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Write a compelling title that captures attention</p>
              <p>• Start with a strong hook in your description</p>
              <p>• Use clear, concise language</p>
              <p>• Break up text with headers and bullet points</p>
              <p>• Include relevant tags for discoverability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Words:</span>
                <span>{content.split(' ').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Characters:</span>
                <span>{content.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Read time:</span>
                <span>~{estimatedReadTime} min</span>
              </div>
              <div className="flex justify-between">
                <span>Tags:</span>
                <span>{tags.length}/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}