import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, GraduationCap, Mail, Phone, IdCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MembershipForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    class: '',
    section: '',
    interests: '',
    experience: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Application Submitted! 🎉",
      description: "We'll review your application and get back to you within 2-3 days.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      class: '',
      section: '',
      interests: '',
      experience: '',
      agreeTerms: false
    });
  };

  const classes = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
    "HSC 1st Year", "HSC 2nd Year"
  ];

  return (
    <section id="join" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-background via-background/90 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-glass backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
              <UserPlus className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Become a <span className="bg-gradient-accent bg-clip-text text-transparent">Member</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the Motijheel Model School and College Science Club and embark on an exciting journey of scientific discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits Card */}
            <div className="lg:col-span-1 animate-slide-up">
              <Card className="bg-gradient-primary border-0 p-6 text-white h-fit sticky top-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Member Benefits
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Access to advanced laboratory equipment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Participate in national competitions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Interactive simulations and experiments
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mentorship from experienced teachers
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Certificate of participation
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Networking with science enthusiasts
                  </li>
                </ul>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Card className="bg-gradient-card border-glass-border backdrop-blur-sm p-8 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <IdCard className="w-4 h-4 mr-2 text-primary" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        required
                        className="bg-background/50 border-glass-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="flex items-center">
                        <IdCard className="w-4 h-4 mr-2 text-secondary" />
                        Student ID
                      </Label>
                      <Input
                        id="studentId"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        placeholder="Enter your student ID"
                        required
                        className="bg-background/50 border-glass-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-accent" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        required
                        className="bg-background/50 border-glass-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-primary" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        required
                        className="bg-background/50 border-glass-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select 
                        value={formData.class} 
                        onValueChange={(value) => setFormData({ ...formData, class: value })}
                      >
                        <SelectTrigger className="bg-background/50 border-glass-border">
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Section</Label>
                      <Input
                        id="section"
                        value={formData.section}
                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                        placeholder="Enter your section (A, B, C...)"
                        required
                        className="bg-background/50 border-glass-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Scientific Interests</Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      placeholder="Tell us about your interests in physics and chemistry..."
                      className="bg-background/50 border-glass-border min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Previous Experience (Optional)</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Any previous science projects, competitions, or relevant experience..."
                      className="bg-background/50 border-glass-border min-h-[80px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the terms and conditions and commit to active participation in club activities.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-accent hover:shadow-glow transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};