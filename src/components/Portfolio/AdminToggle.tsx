import { CogIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface AdminToggleProps {
  onClick: () => void;
}

export const AdminToggle = ({ onClick }: AdminToggleProps) => {
  return (
    <Button
      variant="admin"
      size="icon"
      onClick={onClick}
      className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full portfolio-shadow hover:portfolio-glow bg-background/80 backdrop-blur-sm hover-bounce"
      aria-label="Open admin panel"
    >
      <CogIcon className="w-5 h-5" />
    </Button>
  );
};