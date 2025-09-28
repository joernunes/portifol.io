import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '@/types/portfolio';

const STORAGE_KEY = 'portfolio-config';

export const usePortfolioConfig = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  // Load config from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedConfig = JSON.parse(saved);
        setConfig(parsedConfig);
      }
    } catch (error) {
      console.error('Failed to load portfolio config:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save config to localStorage
  const saveConfig = (newConfig: PortfolioConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setConfig(newConfig);
      return true;
    } catch (error) {
      console.error('Failed to save portfolio config:', error);
      return false;
    }
  };

  // Reset to default config
  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(defaultConfig);
  };

  // Export config as JSON file
  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import config from JSON file
  const importConfig = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (saveConfig(imported)) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error('Failed to import config:', error);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    config,
    setConfig,
    saveConfig,
    resetConfig,
    exportConfig,
    importConfig,
    isLoading
  };
};