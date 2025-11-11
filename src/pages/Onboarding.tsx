import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SKIN_TONES = ['Fair', 'Light', 'Medium', 'Tan', 'Deep', 'Dark'];
const SKIN_TYPES = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
const GOALS = ['Brightening', 'Anti-aging', 'Acne control', 'Hydration', 'Even tone', 'Minimize pores'];
const COMMON_ALLERGENS = ['Fragrance', 'Parabens', 'Sulfates', 'Alcohol', 'Essential oils'];
const SHOPPING_PREFS = ['Budget-friendly', 'Mid-range', 'Luxury', 'Natural/Organic', 'Cruelty-free'];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [skinTone, setSkinTone] = useState('');
  const [skinType, setSkinType] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<Array<{ ingredient: string; severity: 'low' | 'medium' | 'high' }>>([]);
  const [shoppingPrefs, setShoppingPrefs] = useState<string[]>([]);
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleGoal = (goal: string) => {
    setGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const toggleAllergy = (ingredient: string) => {
    setAllergies(prev => {
      const exists = prev.find(a => a.ingredient === ingredient);
      if (exists) {
        return prev.filter(a => a.ingredient !== ingredient);
      }
      return [...prev, { ingredient, severity: 'medium' }];
    });
  };

  const togglePref = (pref: string) => {
    setShoppingPrefs(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return skinTone !== '';
      case 1: return skinType !== '';
      case 2: return goals.length > 0;
      case 3: return true;
      case 4: return shoppingPrefs.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      updateUser({ onboardingStatus: 'in_progress' });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleComplete = () => {
    updateUser({
      skinTone,
      skinType,
      goals,
      allergies,
      shoppingPrefs,
      onboardingStatus: 'complete'
    });
    navigate('/');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {SKIN_TONES.map(tone => (
                <Button
                  key={tone}
                  variant={skinTone === tone ? 'default' : 'outline'}
                  onClick={() => setSkinTone(tone)}
                  className="h-auto py-4"
                >
                  {tone}
                </Button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {SKIN_TYPES.map(type => (
                <Button
                  key={type}
                  variant={skinType === type ? 'default' : 'outline'}
                  onClick={() => setSkinType(type)}
                  className="h-auto py-4"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {GOALS.map(goal => (
                <Badge
                  key={goal}
                  variant={goals.includes(goal) ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => toggleGoal(goal)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select ingredients to avoid (optional)</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_ALLERGENS.map(allergen => (
                <Badge
                  key={allergen}
                  variant={allergies.find(a => a.ingredient === allergen) ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => toggleAllergy(allergen)}
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select all that apply</p>
            <div className="flex flex-wrap gap-2">
              {SHOPPING_PREFS.map(pref => (
                <Badge
                  key={pref}
                  variant={shoppingPrefs.includes(pref) ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => togglePref(pref)}
                >
                  {pref}
                </Badge>
              ))}
            </div>
          </div>
        );
    }
  };

  const titles = [
    { title: 'What\'s your skin tone?', description: 'Help us personalize recommendations' },
    { title: 'What\'s your skin type?', description: 'Understanding your skin is key' },
    { title: 'What are your goals?', description: 'Let\'s target what matters to you' },
    { title: 'Any allergies or sensitivities?', description: 'We\'ll keep you safe' },
    { title: 'Shopping preferences?', description: 'Find products that fit your style' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl shadow-card">
        <CardHeader>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
          <CardTitle className="text-2xl mt-4">{titles[step].title}</CardTitle>
          <CardDescription>{titles[step].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {step < totalSteps - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="ml-auto"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="ml-auto"
              >
                Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
