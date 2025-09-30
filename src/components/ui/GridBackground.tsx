import { cn } from "@/lib/utils";

export const GridBackground = ({
  children,
  className,
  showGradient = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showGradient?: boolean }) => {
  return (
    <div className="relative min-h-screen">
      {/* Grid background - fixed and behind content */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'
          }}
        >
          <div
            className={cn(
              "absolute inset-0",
              className
            )}
            {...props}
          />
        </div>
        
        {/* Gradient overlay */}
        {showGradient && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80" />
        )}
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
