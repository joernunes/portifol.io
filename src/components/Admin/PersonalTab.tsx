import { PersonalInfo } from '@/types/portfolio';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PersonalTabProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalTab = ({ personalInfo, onChange }: PersonalTabProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
        <Input
          id="name"
          value={personalInfo.name}
          className="bg-[#39383D]" 
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your full name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">Title</Label>
        <Input
          id="title"
          value={personalInfo.title}
          className="bg-[#39383D]" 
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Your professional title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
        <Textarea
          id="bio"
          value={personalInfo.bio}
          className="bg-[#39383D] resize-none" 
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Tell people about yourself..."
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="profileImage" className="text-sm font-medium">Profile Image URL</Label>
        <Input
          id="profileImage"
          value={personalInfo.profileImage}
          className="bg-[#39383D]" 
          onChange={(e) => handleChange('profileImage', e.target.value)}
          placeholder="https://example.com/your-photo.jpg"
        />
        {personalInfo.profileImage && (
          <div className="mt-2">
            <img
              src={personalInfo.profileImage}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-muted"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};