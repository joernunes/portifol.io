import { GalleryItem } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';

interface GalleryTabProps {
  gallery: GalleryItem[];
  onChange: (gallery: GalleryItem[]) => void;
}

export const GalleryTab = ({ gallery, onChange }: GalleryTabProps) => {
  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      alt: 'Gallery image',
    };
    onChange([...gallery, newItem]);
  };

  const updateGalleryItem = (id: string, field: keyof GalleryItem, value: string) => {
    onChange(
      gallery.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeGalleryItem = (id: string) => {
    onChange(gallery.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gallery</h3>
        <Button onClick={addGalleryItem} variant="outline">
          Add Image
        </Button>
      </div>
      
      {gallery.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Gallery Image</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeGalleryItem(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={item.image}
              onChange={(e) => updateGalleryItem(item.id, 'image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Alt Text</Label>
            <Input
              value={item.alt}
              onChange={(e) => updateGalleryItem(item.id, 'alt', e.target.value)}
              placeholder="Description of the image"
            />
          </div>
          
          {item.image && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <img
                src={item.image}
                alt={item.alt}
                className="w-32 h-32 object-cover rounded border-2 border-muted"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};