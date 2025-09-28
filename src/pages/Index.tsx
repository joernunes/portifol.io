import { useState } from 'react';
import { usePortfolioConfig } from '@/hooks/usePortfolioConfig';
import { ProfileSection } from '@/components/Portfolio/ProfileSection';
import { LinkCard } from '@/components/Portfolio/LinkCard';
import { SocialLinks } from '@/components/Portfolio/SocialLinks';
import { Gallery } from '@/components/Portfolio/Gallery';
import { ThemeToggle } from '@/components/Portfolio/ThemeToggle';
import { AdminToggle } from '@/components/Portfolio/AdminToggle';
import { AdminPanel } from '@/components/Admin/AdminPanel';

const Index = () => {
  const {
    config,
    setConfig,
    saveConfig,
    resetConfig,
    exportConfig,
    importConfig,
    isLoading
  } = usePortfolioConfig();
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleThemeToggle = (theme: 'light' | 'dark') => {
    const newConfig = {
      ...config,
      settings: { ...config.settings, theme }
    };
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Effects */}
      <div className="fixed inset-0 portfolio-gradient-soft opacity-30 pointer-events-none"></div>
      
      {/* Admin Controls */}
      <AdminToggle onClick={() => setIsAdminOpen(true)} />
      <ThemeToggle theme={config.settings.theme} onToggle={handleThemeToggle} />
      
      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        <ProfileSection personalInfo={config.personalInfo} />
        
        <section className="space-y-4 mb-12">
          {config.links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </section>
        
        <SocialLinks socialLinks={config.social} />
        
        <Gallery gallery={config.gallery} />
        
        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-16">
          <p>Made with ❤️ using Lovable</p>
        </footer>
      </main>
      
      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSave={saveConfig}
        onReset={resetConfig}
        onExport={exportConfig}
        onImport={importConfig}
      />
    </div>
  );
};

export default Index;
