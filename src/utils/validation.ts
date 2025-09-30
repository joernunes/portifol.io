export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return { isValid: false, error: 'URL é obrigatória' };
  }

  try {
    const urlObj = new URL(url);
    
    // Check if protocol is http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL deve começar com http:// ou https://' };
    }

    // Check if hostname exists
    if (!urlObj.hostname) {
      return { isValid: false, error: 'URL deve ter um domínio válido' };
    }

    return { isValid: true };
  } catch {
    return { isValid: false, error: 'URL inválida' };
  }
};

export const validateImageUrl = async (url: string): Promise<{ isValid: boolean; error?: string }> => {
  const basicValidation = validateUrl(url);
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  try {
    // Check if URL points to an image by trying to load it
    const img = new Image();
    return new Promise((resolve) => {
      img.onload = () => resolve({ isValid: true });
      img.onerror = () => resolve({ isValid: false, error: 'URL não aponta para uma imagem válida' });
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => {
        resolve({ isValid: false, error: 'Timeout ao validar imagem' });
      }, 5000);
    });
  } catch {
    return { isValid: false, error: 'Erro ao validar imagem' };
  }
};