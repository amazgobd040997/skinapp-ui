import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, User, Edit, LogOut, Trophy, Flame, Target, AlertTriangle, ShoppingBag, Palette, Settings, Plus, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/AppLayout';

type RoutineStep = {
  id: string;
  name: string;
  product?: string;
  completed: boolean;
};

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSkin, setIsEditingSkin] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [isEditingAllergies, setIsEditingAllergies] = useState(false);

  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editSkinType, setEditSkinType] = useState(user?.skinType || '');
  const [editSkinTone, setEditSkinTone] = useState(user?.skinTone || '');

  // Routine state
  const [routineLevel, setRoutineLevel] = useState<'3-step' | '5-step'>('3-step');
  const [isEditRoutineOpen, setIsEditRoutineOpen] = useState(false);
  const [commitmentDays, setCommitmentDays] = useState(5);

  const [morningSteps, setMorningSteps] = useState<RoutineStep[]>([
    { id: '1', name: 'Cleanser', product: 'Gentle Foam Cleanser', completed: true },
    { id: '2', name: 'Serum', product: 'Vitamin C Serum', completed: true },
    { id: '3', name: 'Moisturizer', product: 'Daily Hydrating Cream', completed: false },
  ]);

  const [eveningSteps, setEveningSteps] = useState<RoutineStep[]>([
    { id: '4', name: 'Cleanser', product: 'Gentle Foam Cleanser', completed: false },
    { id: '5', name: 'Toner', product: 'Balancing Toner', completed: false },
    { id: '6', name: 'Moisturizer', product: 'Night Repair Cream', completed: false },
  ]);

  const weeklyProgress = {
    completed: 4,
    target: commitmentDays,
  };

  const todayProgress = {
    morning: Math.round((morningSteps.filter(s => s.completed).length / morningSteps.length) * 100),
    evening: Math.round((eveningSteps.filter(s => s.completed).length / eveningSteps.length) * 100),
  };

  const availableGoals = [
    'Hydration', 'Anti-aging', 'Brightening', 'Acne Control',
    'Dark Spots', 'Pore Minimizing', 'Oil Control', 'Sensitive Skin',
  ];

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name and email are required',
        variant: 'destructive',
      });
      return;
    }

    updateUser({ name: editName.trim(), email: editEmail.trim() });
    setIsEditingProfile(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully',
    });
  };

  const handleSaveSkin = () => {
    if (!editSkinType || !editSkinTone) {
      toast({
        title: 'Validation Error',
        description: 'Please select both skin type and tone',
        variant: 'destructive',
      });
      return;
    }

    updateUser({ skinType: editSkinType, skinTone: editSkinTone });
    setIsEditingSkin(false);
    toast({
      title: 'Skin Profile Updated',
      description: 'Your skin profile has been saved',
    });
  };

  const toggleGoal = (goal: string) => {
    const currentGoals = user?.goals || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    updateUser({ goals: newGoals });
  };

  const handleLogout = () => {
    logout();
    navigate('/onboarding');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  const toggleStep = (id: string, isEvening: boolean) => {
    const setter = isEvening ? setEveningSteps : setMorningSteps;
    setter(prev => prev.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
    toast({
      title: 'Step updated',
      description: 'Your routine progress has been saved',
    });
  };

  const handleLevelChange = (level: '3-step' | '5-step') => {
    setRoutineLevel(level);
    if (level === '5-step') {
      setMorningSteps([
        ...morningSteps,
        { id: 'm4', name: 'Essence', completed: false },
        { id: 'm5', name: 'Sunscreen', completed: false },
      ]);
      setEveningSteps([
        ...eveningSteps,
        { id: 'e4', name: 'Treatment', completed: false },
        { id: 'e5', name: 'Eye Cream', completed: false },
      ]);
    } else {
      setMorningSteps(morningSteps.slice(0, 3));
      setEveningSteps(eveningSteps.slice(0, 3));
    }
    toast({
      title: 'Routine updated',
      description: `Switched to ${level} routine`,
    });
  };

  if (!user) return null;

  return (
    <AppLayout>
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your skincare journey</p>
          </div>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
              <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your personal information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Your name"
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="your@email.com"
                        maxLength={255}
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{user.xp}</div>
              <div className="text-xs text-muted-foreground">XP Points</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{user.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xs font-bold text-foreground truncate">{user.title}</div>
              <div className="text-xs text-muted-foreground">Title</div>
            </CardContent>
          </Card>
        </div>

        {/* Skin Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Skin Profile</CardTitle>
              </div>
              <Dialog open={isEditingSkin} onOpenChange={setIsEditingSkin}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Skin Profile</DialogTitle>
                    <DialogDescription>Update your skin type and tone</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Skin Type</Label>
                      <Select value={editSkinType} onValueChange={setEditSkinType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oily">Oily</SelectItem>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="combination">Combination</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="sensitive">Sensitive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Skin Tone</Label>
                      <Select value={editSkinTone} onValueChange={setEditSkinTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select skin tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="tan">Tan</SelectItem>
                          <SelectItem value="deep">Deep</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSaveSkin} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm font-medium">Skin Type</span>
              <Badge variant="secondary">
                {user.skinType ? user.skinType.charAt(0).toUpperCase() + user.skinType.slice(1) : 'Not set'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm font-medium">Skin Tone</span>
              <Badge variant="secondary">
                {user.skinTone ? user.skinTone.charAt(0).toUpperCase() + user.skinTone.slice(1) : 'Not set'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">My Goals</CardTitle>
            </div>
            <CardDescription>Tap to toggle goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableGoals.map((goal) => {
                const isSelected = user.goals?.includes(goal);
                return (
                  <Badge
                    key={goal}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleGoal(goal)}
                  >
                    {isSelected && '✓ '}
                    {goal}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <CardTitle className="text-lg">Allergies & Sensitivities</CardTitle>
            </div>
            <CardDescription>
              {user.allergies?.length || 0} allergen(s) tracked
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.allergies && user.allergies.length > 0 ? (
              <div className="space-y-2">
                {user.allergies.map((allergy, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">{allergy.ingredient}</span>
                    <Badge variant={
                      allergy.severity === 'high' ? 'destructive' :
                      allergy.severity === 'medium' ? 'default' : 'secondary'
                    }>
                      {allergy.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm">
                No allergies added yet
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" size="sm">
              Manage Allergies
            </Button>
          </CardContent>
        </Card>

        {/* Shopping Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Shopping Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.shoppingPrefs && user.shoppingPrefs.length > 0 ? (
                user.shoppingPrefs.map((pref, idx) => (
                  <Badge key={idx} variant="secondary">
                    {pref}
                  </Badge>
                ))
              ) : (
                <div className="text-center w-full py-4 text-muted-foreground text-sm">
                  No preferences set
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              Update Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Routine Section */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">RoutineMatrix™</h2>
              <p className="text-sm text-muted-foreground">Your daily skincare ritual</p>
            </div>
            <Dialog open={isEditRoutineOpen} onOpenChange={setIsEditRoutineOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Routine Settings</DialogTitle>
                  <DialogDescription>Customize your daily routine</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Routine Complexity</label>
                    <Select value={routineLevel} onValueChange={(v) => handleLevelChange(v as '3-step' | '5-step')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-step">3-Step (Essential)</SelectItem>
                        <SelectItem value="5-step">5-Step (Advanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weekly Commitment</label>
                    <Select value={commitmentDays.toString()} onValueChange={(v) => setCommitmentDays(Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days/week</SelectItem>
                        <SelectItem value="5">5 days/week</SelectItem>
                        <SelectItem value="7">7 days/week (Daily)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Weekly Progress */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Weekly Progress</CardTitle>
                  <CardDescription>
                    {weeklyProgress.completed} of {weeklyProgress.target} days completed
                  </CardDescription>
                </div>
                <Badge variant={weeklyProgress.completed >= weeklyProgress.target ? "default" : "secondary"}>
                  {Math.round((weeklyProgress.completed / weeklyProgress.target) * 100)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={(weeklyProgress.completed / weeklyProgress.target) * 100} className="h-2" />
              {weeklyProgress.completed >= weeklyProgress.target && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Goal achieved! +50 XP earned
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Morning Routine */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    ☀️ Morning Routine
                    <Badge variant="outline">{routineLevel}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {morningSteps.filter(s => s.completed).length} of {morningSteps.length} steps completed
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{todayProgress.morning}%</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {morningSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleStep(step.id, false)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{step.name}</div>
                      {step.product && (
                        <div className="text-xs text-muted-foreground truncate">{step.product}</div>
                      )}
                    </div>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Evening Routine */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🌙 Evening Routine
                    <Badge variant="outline">{routineLevel}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {eveningSteps.filter(s => s.completed).length} of {eveningSteps.length} steps completed
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{todayProgress.evening}%</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eveningSteps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => toggleStep(step.id, true)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{step.name}</div>
                      {step.product && (
                        <div className="text-xs text-muted-foreground truncate">{step.product}</div>
                      )}
                    </div>
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Streak Banner */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">4 Day Streak! 🔥</div>
                    <div className="text-sm text-muted-foreground">
                      Complete today to reach 5 days
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/onboarding')}
          >
            Re-take Onboarding Quiz
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
