import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Camera, Award, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const isOnboardingComplete = user.onboardingStatus === 'complete';

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Hello, {user.name}! ✨
              </h1>
              <p className="text-muted-foreground">Your skin's best friend</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Onboarding Card */}
        {!isOnboardingComplete && (
          <Card className="shadow-card border-accent/20">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>Help us personalize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={user.onboardingStatus === 'in_progress' ? 50 : 0} />
              <div className="flex flex-wrap gap-2">
                {user.skinType && <Badge>Skin Type: {user.skinType}</Badge>}
                {user.skinTone && <Badge>Tone: {user.skinTone}</Badge>}
                {user.goals && user.goals.length > 0 && <Badge>Goals set</Badge>}
                {user.allergies && user.allergies.length > 0 && <Badge>Allergies noted</Badge>}
              </div>
              <Button onClick={() => navigate('/onboarding')}>
                {user.onboardingStatus === 'in_progress' ? 'Resume' : 'Start'} Questionnaire
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>ScanFlow™</CardTitle>
                  <CardDescription>Scan a product</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Scan Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <div>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>{user.xp} XP · {user.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{user.streak} day streak</Badge>
                <Gift className="w-6 h-6 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Routine Card */}
        {isOnboardingComplete && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Today's Routine</CardTitle>
              <CardDescription>Your personalized skincare journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Morning</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>1. Gentle cleanser</p>
                  <p>2. Vitamin C serum</p>
                  <p>3. Moisturizer with SPF</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evening</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>1. Oil cleanser</p>
                  <p>2. Hydrating toner</p>
                  <p>3. Night cream</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Routine
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
