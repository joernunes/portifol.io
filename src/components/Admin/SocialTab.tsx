import { SocialLink } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon } from '@heroicons/react/24/outline';

interface SocialTabProps {
  social: SocialLink[];
  onChange: (social: SocialLink[]) => void;
}

const platformOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'discord', label: 'Discord' },
  { value: 'twitch', label: 'Twitch' },
];

const colorOptions = [
  { value: 'bg-gradient-to-r from-purple-500 to-pink-500', label: 'Instagram' },
  { value: 'bg-blue-500', label: 'Twitter/LinkedIn' },
  { value: 'bg-gray-800', label: 'GitHub' },
  { value: 'bg-red-500', label: 'YouTube' },
  { value: 'bg-black', label: 'TikTok' },
  { value: 'bg-blue-600', label: 'Facebook' },
  { value: 'bg-pink-500', label: 'Dribbble' },
  { value: 'bg-indigo-500', label: 'Discord' },
  { value: 'bg-purple-600', label: 'Twitch' },
];

export const SocialTab = ({ social, onChange }: SocialTabProps) => {
  const addSocial = () => {
    const newSocial: SocialLink = {
      id: Date.now().toString(),
      platform: 'instagram',
      url: 'https://instagram.com/username',
      icon: 'instagram',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    };
    onChange([...social, newSocial]);
  };

  const updateSocial = (id: string, field: keyof SocialLink, value: string) => {
    onChange(
      social.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeSocial = (id: string) => {
    onChange(social.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Social Links</h3>
        <Button onClick={addSocial} className="bg-[#39383D]" variant="outline">
          Add Social Link
        </Button>
      </div>
      
      {social.map((item) => (
        <div key={item.id} className="p-4 border-none rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Social Link</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSocial(item.id)}
              className="bg-[#39383D] text-destructive hover:text-destructive"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={item.platform}
                onValueChange={(value) => {
                  updateSocial(item.id, 'platform', value);
                  updateSocial(item.id, 'icon', value);
                }}
              >
                <SelectTrigger className="bg-[#39383D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#39383D]">
                  {platformOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Color</Label>
              <Select
                value={item.bgColor}
                onValueChange={(value) => updateSocial(item.id, 'bgColor', value)}
               
              >
                <SelectTrigger className="bg-[#39383D]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#39383D]">
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={item.url}
              className="bg-[#39383D]"
              onChange={(e) => updateSocial(item.id, 'url', e.target.value)}
              placeholder="https://platform.com/username"
            />
          </div>
        </div>
      ))}
    </div>
  );
};