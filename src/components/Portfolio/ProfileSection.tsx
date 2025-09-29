import { PersonalInfo } from '@/types/portfolio';

interface ProfileSectionProps {
  personalInfo: PersonalInfo;
}

export const ProfileSection = ({ personalInfo }: ProfileSectionProps) => {
  return (
    <section className="text-center space-y-6 mb-12">
      <div className="relative inline-block">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 portfolio-shadow">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face';
            }}
          />
        </div>
        {/* <div className="absolute -bottom-2 -right-0 w-8 h-8 rounded-full border-none border-background flex items-center justify-center">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div> */}
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          {personalInfo.name}
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          {personalInfo.title}
        </p>
      </div>
      
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        {personalInfo.bio}
      </p>
    </section>
  );
};