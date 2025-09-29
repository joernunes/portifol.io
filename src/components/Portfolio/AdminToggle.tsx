import { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface AdminToggleProps {
  onClick: () => void;
}

export const AdminToggle = ({ onClick }: AdminToggleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true);
      
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
      
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      setMouseTimeout(timeout);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
    };
  }, [mouseTimeout]);
  return (
    <Button
      variant="admin"
      size="icon"
      onClick={onClick}
      className={`fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
      aria-label="Open admin panel"
    >
      <CogIcon className="w-5 h-5" />
    </Button>
  );
};