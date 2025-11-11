import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, User, Edit, LogOut, Trophy, Flame, Target, AlertTriangle, ShoppingBag, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
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

      <BottomNav />
    </div>
  );
}
