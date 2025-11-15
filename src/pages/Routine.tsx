import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus, Edit, CheckCircle2, Circle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AppLayout } from '@/components/AppLayout';

type RoutineStep = {
  id: string;
  name: string;
  product?: string;
  completed: boolean;
};

export default function Routine() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [routineLevel, setRoutineLevel] = useState<'3-step' | '5-step'>('3-step');
  const [isEditOpen, setIsEditOpen] = useState(false);
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

  return (
    <AppLayout>
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">RoutineMatrix™</h1>
            <p className="text-sm text-muted-foreground">Your daily skincare ritual</p>
          </div>
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
        <Card>
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
        <Card>
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
        <Card>
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
              <Button variant="outline" size="sm" onClick={() => navigate('/rewards')}>
                View Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
