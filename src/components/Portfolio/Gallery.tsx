import { GalleryItem } from '@/types/portfolio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GalleryProps {
  gallery: GalleryItem[];
}

export const Gallery = ({ gallery }: GalleryProps) => {
  if (gallery.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-center mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="aspect-square cursor-pointer hover-lift portfolio-shadow hover:portfolio-glow rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
                  }}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-0 bg-transparent p-0">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
                }}
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
};