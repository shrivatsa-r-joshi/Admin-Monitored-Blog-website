import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PageNavigationProps {
  previousPage?: {
    label: string;
    section: string;
  };
  nextPage?: {
    label: string;
    section: string;
  };
  onSectionChange?: (section: string) => void;
}

export function PageNavigation({ previousPage, nextPage, onSectionChange }: PageNavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg">
        {previousPage ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSectionChange?.(previousPage.section)}
            className="flex items-center gap-2 hover:bg-white/50 rounded-full px-3 py-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">{previousPage.label}</span>
          </Button>
        ) : (
          <div className="w-16 h-8" />
        )}
        
        <div className="w-px h-6 bg-border" />
        
        {nextPage ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSectionChange?.(nextPage.section)}
            className="flex items-center gap-2 hover:bg-white/50 rounded-full px-3 py-2"
          >
            <span className="text-sm">{nextPage.label}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <div className="w-16 h-8" />
        )}
      </div>
    </div>
  );
}