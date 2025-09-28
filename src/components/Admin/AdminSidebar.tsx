import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PortfolioConfig } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { PersonalTab } from './PersonalTab';
import { LinksTab } from './LinksTab';
import { SocialTab } from './SocialTab';
import { GalleryTab } from './GalleryTab';
import { JSONTab } from './JSONTab';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onSave: (config: PortfolioConfig) => boolean;
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
}

type SectionType = 'general' | 'appearance' | 'content' | 'data';

export const AdminSidebar = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  onExport,
  onImport
}: AdminSidebarProps) => {
  const [editingConfig, setEditingConfig] = useState<PortfolioConfig>(config);
  const [activeSection, setActiveSection] = useState<SectionType>('general');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setEditingConfig(config);
    }
  }, [isOpen, config]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSave = () => {
    if (onSave(editingConfig)) {
      toast({
        title: "Configurações salvas!",
        description: "Seu portfólio foi atualizado com sucesso.",
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Falha ao salvar",
        description: "Houve um erro ao salvar suas configurações.",
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
      title: "Configurações redefinidas",
      description: "O portfólio foi redefinido para a configuração padrão.",
    });
  };

  const sections = [
    { id: 'general' as SectionType, label: 'GERAL', icon: '⚙️' },
    { id: 'appearance' as SectionType, label: 'APARÊNCIA', icon: '🎨' },
    { id: 'content' as SectionType, label: 'CONTEÚDO', icon: '📝' },
    { id: 'data' as SectionType, label: 'DADOS', icon: '💾' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <PersonalTab
            personalInfo={editingConfig.personalInfo}
            onChange={(personalInfo) =>
              setEditingConfig({ ...editingConfig, personalInfo })
            }
          />
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-sidebar-foreground">Tema</h3>
              <p className="text-xs text-sidebar-foreground/70">
                Altere o tema no botão superior direito da tela
              </p>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Links</h3>
              <LinksTab
                links={editingConfig.links}
                onChange={(links) =>
                  setEditingConfig({ ...editingConfig, links })
                }
              />
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Redes Sociais</h3>
              <SocialTab
                social={editingConfig.social}
                onChange={(social) =>
                  setEditingConfig({ ...editingConfig, social })
                }
              />
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Galeria</h3>
              <GalleryTab
                gallery={editingConfig.gallery}
                onChange={(gallery) =>
                  setEditingConfig({ ...editingConfig, gallery })
                }
              />
            </div>
          </div>
        );
      case 'data':
        return (
          <JSONTab
            config={editingConfig}
            onChange={setEditingConfig}
            onExport={onExport}
            onImport={onImport}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={handleCancel}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-sidebar-background border-l border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Configurações
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="border-b border-sidebar-border">
          <nav className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'text-sidebar-primary border-b-2 border-sidebar-primary bg-sidebar-accent/50'
                    : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-6">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};