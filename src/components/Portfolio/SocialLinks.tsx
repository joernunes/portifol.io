import { SocialLink } from '@/types/portfolio';
import { Button } from '@/components/ui/button';

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    twitter: '𝕏',
    instagram: '📷',
    linkedin: 'in',
    github: '⚡',
    youtube: '▶',
    dribbble: '🏀',
    tiktok: '🎵',
    facebook: 'f',
    discord: '💬',
    twitch: '🎮'
  };
  
  return icons[platform.toLowerCase()] || '🔗';
};

export const SocialLinks = ({ socialLinks }: SocialLinksProps) => {
  if (socialLinks.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-center mb-6">Connect with me</h2>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {socialLinks.map((social) => (
          <Button
            key={social.id}
            variant="social"
            size="icon"
            className={`w-12 h-12 rounded-full ${social.bgColor} text-white shadow-lg`}
            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
            aria-label={`Visit ${social.platform}`}
          >
            <span className="text-lg font-bold">
              {getSocialIcon(social.platform)}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
};