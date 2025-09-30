import { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AdminToggleProps {
  onClick: () => void;
}
export const AdminToggle = ({ onClick }: AdminToggleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouseTimeout, setMouseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Verifica se o cursor está próximo ao canto inferior direito (últimos 150px) - área maior
      const isNearBottomRight = 
        window.innerHeight - e.clientY < 150 && 
        window.innerWidth - e.clientX < 150;
      
      setIsVisible(isNearBottomRight);
      
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
      
      if (isNearBottomRight) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 3000); // Esconde após 3 segundos - mais tempo
        
        setMouseTimeout(timeout);
      }
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="admin"
            size="icon"
            onClick={onClick}
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full transition-all duration-300 shadow-lg ring-2 ring-white/20 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
            aria-label="Open admin panel"
          >
            <CogIcon className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white border-gray-700">
          <p>Configurações do Portfólio</p>
          <p className="text-xs text-gray-400">Clique para personalizar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};