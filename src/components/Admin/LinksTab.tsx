import { PortfolioLink } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TrashIcon } from '@heroicons/react/24/outline';

interface LinksTabProps {
  links: PortfolioLink[];
  onChange: (links: PortfolioLink[]) => void;
}

const iconOptions = [
  { value: 'briefcase', label: 'Briefcase' },
  { value: 'pencil', label: 'Pencil' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'link', label: 'Link' },
  { value: 'heart', label: 'Heart' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'camera', label: 'Camera' },
  { value: 'music', label: 'Music' },
];

const colorOptions = [
  { value: 'bg-gradient-to-r from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { value: 'bg-gradient-to-r from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
  { value: 'bg-gradient-to-r from-green-500 to-emerald-500', label: 'Green to Emerald' },
  { value: 'bg-gradient-to-r from-orange-500 to-red-500', label: 'Orange to Red' },
  { value: 'bg-gradient-to-r from-indigo-500 to-purple-500', label: 'Indigo to Purple' },
  { value: 'bg-gradient-to-r from-pink-500 to-rose-500', label: 'Pink to Rose' },
];

export const LinksTab = ({ links, onChange }: LinksTabProps) => {
  const addLink = () => {
    const newLink: PortfolioLink = {
      id: Date.now().toString(),
      title: 'New Link',
      description: 'Description',
      url: 'https://example.com',
      icon: 'link',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      openInNewTab: true,
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, field: keyof PortfolioLink, value: string | boolean) => {
    onChange(
      links.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const removeLink = (id: string) => {
    onChange(links.filter(link => link.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Portfolio Links</h3>
        <Button onClick={addLink} variant="outline">
          Add Link
        </Button>
      </div>
      
      {links.map((link) => (
        <div key={link.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Link Settings</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLink(link.id)}
              className="text-destructive hover:text-destructive"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={link.title}
                onChange={(e) => updateLink(link.id, 'title', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={link.description}
              onChange={(e) => updateLink(link.id, 'description', e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={link.icon}
                onValueChange={(value) => updateLink(link.id, 'icon', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
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
                value={link.bgColor}
                onValueChange={(value) => updateLink(link.id, 'bgColor', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={link.openInNewTab}
              onCheckedChange={(checked) => updateLink(link.id, 'openInNewTab', checked)}
            />
            <Label>Open in new tab</Label>
          </div>
        </div>
      ))}
    </div>
  );
};