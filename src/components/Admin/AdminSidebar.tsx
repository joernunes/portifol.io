import { useState, useEffect } from 'react';
import { X, HelpCircle, Home, Github, FileText, MoonIcon, SunIcon } from 'lucide-react';
import { PortfolioConfig } from '@/types/portfolio';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Re-importando seus componentes de conteúdo
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
  theme: 'light' | 'dark';
  onToggleTheme: (theme: 'light' | 'dark') => void;
}

export const AdminSidebar = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
  onExport,
  onImport,
  theme,
  onToggleTheme
}: AdminSidebarProps) => {
  const [editingConfig, setEditingConfig] = useState<PortfolioConfig>(config);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setEditingConfig(config);
    } else {
      document.body.classList.remove('no-scroll');
    }
  
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, config]);

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

  const toggleTheme = () => {
    onToggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCancel = () => {
    setEditingConfig(config);
    onClose();
  };
  
  const handleReset = () => {
    onReset();
    setEditingConfig(config); // Atualiza o estado local após o reset global
    toast({
      title: "Configurações redefinidas",
      description: "O portfólio foi redefinido para a configuração padrão.",
    });
  };


  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={handleCancel}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#121212] text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6 mt-4">
        {/* Header */}
        {/* <div className="flex items-center justify-between  ">
          
          <h2 className="text-lg font-semibold text-gray-100">
            fcfgfc
          </h2> 
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="h-8 w-8 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div> */}

        
          
          {/* Seção GERAL com o componente PersonalTab */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider px-1">
              Geral
            </h3>
            <div className="bg-[#1C1C1E] rounded-lg p-4">
              <PersonalTab
                personalInfo={editingConfig.personalInfo}
                onChange={(personalInfo) =>
                  setEditingConfig({ ...editingConfig, personalInfo })
                }
              />
            </div>
          </div>
          
          {/* Seção APARÊNCIA */}
          {/*<div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider px-1">
              Aparência
            </h3>
            <div className="bg-[#1C1C1E] rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
               <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">Tema</h4>
                  <p className="text-xs text-gray-400">
                    Alternar entre modo claro e escuro
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full"
                  aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                >
                  {theme === 'light' ? (
                    <MoonIcon className="w-4 h-4" />
                  ) : (
                    <SunIcon className="w-4 h-4" />
                  )}
                </Button>
              </div> 
            </div>
          </div>*/}

          {/* Seção CONTEÚDO com os componentes LinksTab, SocialTab, e GalleryTab */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider px-1">
              Conteúdo
            </h3>
            <div className="bg-[#1C1C1E] rounded-lg p-3 sm:p-4 space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-200 mb-4">Links</h4>
                <LinksTab
                  links={editingConfig.links}
                  onChange={(links) =>
                    setEditingConfig({ ...editingConfig, links })
                  }
                />
              </div>
              <Separator className="bg-[#3a3a3a]" />
              <div>
                <h4 className="text-sm font-semibold text-gray-200 mb-4">Redes Sociais</h4>
                <SocialTab
                  social={editingConfig.social}
                  onChange={(social) =>
                    setEditingConfig({ ...editingConfig, social })
                  }
                />
              </div>
              <Separator className="bg-[#3a3a3a]" />
              <div>
                <h4 className="text-sm font-semibold text-gray-200 mb-4">Galeria</h4>
                <GalleryTab
                  gallery={editingConfig.gallery}
                  onChange={(gallery) =>
                    setEditingConfig({ ...editingConfig, gallery })
                  }
                />
              </div>
            </div>
          </div>

          {/* Seção DADOS com o componente JSONTab */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500 tracking-wider px-1">
              Gerenciamento de Dados <HelpCircle size={14} />
            </h3>
            <div className="bg-[#1C1C1E] rounded-lg p-4">
               <JSONTab
                config={editingConfig}
                onChange={setEditingConfig}
                onExport={onExport}
                onImport={onImport}
                onReset={handleReset}
              />
            </div>
          </div>
          
          {/* Rodapé informativo dentro do scroll */}
          <div className="text-center text-xs text-gray-500 pt-6 space-y-3">
              <p>Bonjourr <span className="text-blue-400">21.2.1</span></p>
              <div className="flex justify-center items-center gap-4 text-gray-400">
                  <Home size={16} className="cursor-pointer hover:text-white" />
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current cursor-pointer hover:text-white"><title>Papillon</title><path d="M16.95 12.316a5.378 5.378 0 0 0-4.95-3.21c-.43 0-.853.052-1.266.15a5.378 5.378 0 0 0-4.95 3.21C2.5 14.156 2.5 16.5 2.5 16.5s.484 1.844 4.184 2.875a.844.844 0 0 0 .832-.313l1.104-1.654a.844.844 0 0 0-.177-1.115l-1.427-1.07a1.406 1.406 0 0 1-.354-1.86l.625-1.04a1.406 1.406 0 0 1 1.99-.46l3.896 2.34a.844.844 0 0 0 .96-.02l5.052-3.79a.844.844 0 0 0 .176-1.115z"/></svg>
                  <Github size={16} className="cursor-pointer hover:text-white" />
                  <FileText size={16} className="cursor-pointer hover:text-white" />
              </div>
              <p>Feito na França com ❤️</p>
          </div>
        

        {/* Footer fixo com botões de ação */}
       <div className="border-t border-[#2a2a2a] p-3 sm:p-4 mt-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 text-gray-300 border-[#3a3a3a] bg-transparent hover:bg-[#2a2a2a] hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#1C1C1E] text-white hover:bg-[#2a2a2a]"
            >
              Salvar
            </Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};