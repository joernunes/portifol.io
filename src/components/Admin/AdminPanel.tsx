import { useState } from 'react';
import { PortfolioConfig } from '@/types/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PersonalTab } from './PersonalTab';
import { LinksTab } from './LinksTab';
import { SocialTab } from './SocialTab';
import { GalleryTab } from './GalleryTab';
import { JSONTab } from './JSONTab';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onSave: (config: PortfolioConfig) => boolean;
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
}

export const AdminPanel = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  onExport,
  onImport
}: AdminPanelProps) => {
  const [editingConfig, setEditingConfig] = useState<PortfolioConfig>(config);
  const { toast } = useToast();

  const handleSave = () => {
    if (onSave(editingConfig)) {
      toast({
        title: "Settings saved!",
        description: "Your portfolio has been updated successfully.",
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "There was an error saving your settings.",
      });
    }
  };

  const handleCancel = () => {
    setEditingConfig(config);
    onClose();
  };

  const handleReset = () => {
    onReset();
    setEditingConfig(config);
    toast({
      title: "Settings reset",
      description: "Portfolio has been reset to default configuration.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Portfolio Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="personal" className="h-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
          </TabsList>
          
          <div className="h-[500px] overflow-y-auto">
            <TabsContent value="personal" className="space-y-4">
              <PersonalTab
                personalInfo={editingConfig.personalInfo}
                onChange={(personalInfo) =>
                  setEditingConfig({ ...editingConfig, personalInfo })
                }
              />
            </TabsContent>
            
            <TabsContent value="links" className="space-y-4">
              <LinksTab
                links={editingConfig.links}
                onChange={(links) =>
                  setEditingConfig({ ...editingConfig, links })
                }
              />
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <SocialTab
                social={editingConfig.social}
                onChange={(social) =>
                  setEditingConfig({ ...editingConfig, social })
                }
              />
            </TabsContent>
            
            <TabsContent value="gallery" className="space-y-4">
              <GalleryTab
                gallery={editingConfig.gallery}
                onChange={(gallery) =>
                  setEditingConfig({ ...editingConfig, gallery })
                }
              />
            </TabsContent>
            
            <TabsContent value="json" className="space-y-4">
              <JSONTab
                config={editingConfig}
                onChange={setEditingConfig}
                onExport={onExport}
                onImport={onImport}
                onReset={handleReset}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="portfolio" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};