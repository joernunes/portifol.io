import { PortfolioLink } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BriefcaseIcon, 
  PencilIcon, 
  CalendarIcon,
  LinkIcon,
  HeartIcon,
  ShoppingBagIcon,
  CameraIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

const iconMap = {
  briefcase: BriefcaseIcon,
  pencil: PencilIcon,
  calendar: CalendarIcon,
  link: LinkIcon,
  heart: HeartIcon,
  shopping: ShoppingBagIcon,
  camera: CameraIcon,
  music: MusicalNoteIcon,
};

interface LinkCardProps {
  link: PortfolioLink;
}

export const LinkCard = ({ link }: LinkCardProps) => {
  const IconComponent = iconMap[link.icon as keyof typeof iconMap] || LinkIcon;

  const handleClick = () => {
    if (link.openInNewTab) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = link.url;
    }
  };

  return (
    <Card className="hover-lift cursor-pointer portfolio-shadow hover:portfolio-glow border-0 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm"
          onClick={handleClick}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center hover-bounce`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {link.description}
            </p>
          </div>
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-3 h-3 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};