export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
}

export interface PortfolioLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  bgColor: string;
  openInNewTab: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  bgColor: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface PortfolioSettings {
  theme: 'light' | 'dark';
}

export interface PortfolioConfig {
  personalInfo: PersonalInfo;
  links: PortfolioLink[];
  social: SocialLink[];
  gallery: GalleryItem[];
  settings: PortfolioSettings;
}

export const defaultConfig: PortfolioConfig = {
  personalInfo: {
    name: "Joel Nunes",
    title: "Digital Creator & Designer",
    bio: "Transforming ideas into beautiful digital experiences. Passionate about design, technology, and creative storytelling.",
    profileImage: "https://files.on.adaptive.ai/cdn/tYzLbRajCCfTC4cTt7tfAJzmad2xWF4j-9-tcz-9-qejejblpywl.png"
  },
  links: [
    {
      id: "1",
      title: "My Portfolio",
      description: "Check out my latest creative projects",
      url: "https://portfolio.example.com",
      icon: "briefcase",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      openInNewTab: true
    },
    {
      id: "2", 
      title: "Creative Blog",
      description: "Stories and insights from my creative journey",
      url: "https://blog.example.com",
      icon: "pencil",
      bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      openInNewTab: true
    },
    {
      id: "3",
      title: "Book a Call",
      description: "Let's discuss your next project",
      url: "https://calendly.com/example",
      icon: "calendar",
      bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      openInNewTab: true
    }
  ],
  social: [
    {
      id: "1",
      platform: "Instagram",
      url: "https://instagram.com/example",
      icon: "instagram",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      id: "2",
      platform: "Twitter",
      url: "https://twitter.com/example",
      icon: "twitter",
      bgColor: "bg-blue-500"
    },
    {
      id: "3",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/example",
      icon: "linkedin",
      bgColor: "bg-blue-600"
    },
    {
      id: "4",
      platform: "GitHub",
      url: "https://github.com/example",
      icon: "github",
      bgColor: "bg-gray-800"
    }
  ],
  gallery: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      alt: "Creative project showcase"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      alt: "Design workspace"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      alt: "Creative tools"
    }
  ],
  settings: {
    theme: 'dark'
  }
};