import { memo, useState, useCallback, useMemo } from 'react';
import { SocialLink } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrashIcon } from '@heroicons/react/24/outline';
import { validateUrl } from '@/utils/validation';

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

const SocialItem = memo(({ item, onUpdate, onRemove }: {
  item: SocialLink;
  onUpdate: (id: string, field: keyof SocialLink, value: string) => void;
  onRemove: (id: string) => void;
}) => {
  const [urlError, setUrlError] = useState<string>('');

  const handleUrlChange = useCallback((url: string) => {
    onUpdate(item.id, 'url', url);
    
    const validation = validateUrl(url);
    setUrlError(validation.error || '');
  }, [item.id, onUpdate]);

  return (
    <div className="p-4 border-none rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Social Link</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id)}
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
              onUpdate(item.id, 'platform', value);
              onUpdate(item.id, 'icon', value);
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
            onValueChange={(value) => onUpdate(item.id, 'bgColor', value)}
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
          className={`bg-[#39383D] ${urlError ? 'border-red-500' : ''}`}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://platform.com/username"
        />
        {urlError && (
          <p className="text-xs text-red-400">{urlError}</p>
        )}
      </div>
    </div>
  );
});

SocialItem.displayName = 'SocialItem';

export const SocialTab = memo(({ social, onChange }: SocialTabProps) => {
  const addSocial = useCallback(() => {
    const newSocial: SocialLink = {
      id: Date.now().toString(),
      platform: 'instagram',
      url: 'https://instagram.com/username',
      icon: 'instagram',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    };
    onChange([...social, newSocial]);
  }, [social, onChange]);

  const updateSocial = useCallback((id: string, field: keyof SocialLink, value: string) => {
    onChange(
      social.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, [social, onChange]);

  const removeSocial = useCallback((id: string) => {
    onChange(social.filter(item => item.id !== id));
  }, [social, onChange]);

  const memoizedSocial = useMemo(() => social, [social]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Social Links</h3>
        <Button onClick={addSocial} className="bg-[#39383D]" variant="outline">
          Add Social Link
        </Button>
      </div>
      
      {memoizedSocial.map((item) => (
        <SocialItem
          key={item.id}
          item={item}
          onUpdate={updateSocial}
          onRemove={removeSocial}
        />
      ))}
    </div>
  );
});

SocialTab.displayName = 'SocialTab';