import { useState, useEffect } from 'react';
import { PortfolioConfig } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface JSONTabProps {
  config: PortfolioConfig;
  onChange: (config: PortfolioConfig) => void;
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
  onReset: () => void;
}

export const JSONTab = ({ config, onChange, onExport, onImport, onReset }: JSONTabProps) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(config, null, 2));
  const { toast } = useToast();

  const handleApplyJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onChange(parsed);
      toast({
        title: "JSON applied!",
        description: "Configuration has been updated from JSON.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please check your JSON syntax and try again.",
      });
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file).then((success) => {
        if (success) {
          toast({
            title: "Import successful!",
            description: "Configuration has been imported from file.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Import failed",
            description: "There was an error importing the file.",
          });
        }
      });
      // Reset input
      event.target.value = '';
    }
  };

  const handleReset = () => {
    onReset();
    toast({
      title: "Reset complete",
      description: "Configuration has been reset to defaults.",
    });
  };

  // Update JSON text when config changes
  useEffect(() => {
    setJsonText(JSON.stringify(config, null, 2));
  }, [config]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">JSON Configuration</h3>
        <p className="text-sm text-muted-foreground mb-4">
          You can directly edit the JSON configuration or import/export settings.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="json-config">Configuration JSON</Label>
        <Textarea
  id="json-config"
  value={jsonText}
  onChange={(e) => setJsonText(e.target.value)}
  className="font-mono text-sm opacity-80 w-full h-[120px] min-h-[120px] max-h-[3000px] my-1.5 py-4 tab-[1.5] cursor-pointer rounded-[10px] text-white bg-[#39383D] transition-[min-height] duration-100 ease-in-out"
  placeholder="Paste your JSON configuration here..."
  rows={20}
/>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={handleApplyJSON} className="bg-[#39383D]" variant="outline">
          Apply JSON
        </Button>
        <Button onClick={onExport} className="bg-[#39383D]" variant="outline">
          Export File
        </Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file-import">Import Configuration</Label>
        <input
          id="file-import"
          type="file"
          accept=".json"
          onChange={handleFileImport}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
      
      <div className="border-t pt-4">
        <Button 
          onClick={handleReset} 
          variant="destructive"
          className="w-full"
        >
          Reset to Default Configuration
        </Button>
      </div>
    </div>
  );
};