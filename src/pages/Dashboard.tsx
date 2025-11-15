import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { 
  Sparkles, Camera, Award, Gift, ChevronRight, Menu, 
  AlertCircle, TrendingUp, Plus, Edit, CreditCard, Settings,
  Bell, Lock, User, HelpCircle, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMockDashboardData } from '@/lib/mockData';
import BottomNav from '@/components/BottomNav';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    // Simulate API fetch
    setTimeout(() => {
      const data = getMockDashboardData(user.id);
      setDashboardData(data);
      setLoading(false);
    }, 800);
  }, [user]);

  if (!user) return null;

  const isOnboardingComplete = user.onboardingStatus === 'complete';

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-b-3xl">
          <div className="max-w-4xl mx-auto space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-background/50 rounded-lg">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Payment Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payment
                    </h3>
                    <div className="space-y-1">
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to payment method page
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <span>Payment Methods</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to subscription page
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <Award className="w-5 h-5 text-muted-foreground" />
                        <span>Subscription</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to billing history
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                        <span>Billing History</span>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Settings Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </h3>
                    <div className="space-y-1">
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <User className="w-5 h-5 text-muted-foreground" />
                        <span>Profile Settings</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to notifications settings
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span>Notifications</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to privacy settings
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <span>Privacy & Security</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          // Navigate to help page
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-left"
                      >
                        <HelpCircle className="w-5 h-5 text-muted-foreground" />
                        <span>Help & Support</span>
                      </button>
                    </div>
                  </div>

                  <Separator />

                  {/* Logout */}
                  <button 
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <Badge variant="secondary">Welcome back</Badge>
            <button className="p-2 hover:bg-background/50 rounded-lg">
              <span className="text-xl">⋯</span>
            </button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Hi, {dashboardData.user.name}
            </h1>
            <p className="text-muted-foreground">Your skin at a glance</p>
          </div>

          {/* Hero Carousel */}
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">RoutineMatrix™ Snapshot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Today: {dashboardData.routineToday.morning.length} AM steps / {dashboardData.routineToday.evening.length} PM steps
                    </p>
                    {dashboardData.routineToday.onTrack && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        On track
                      </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Weekly: {dashboardData.routineToday.weeklyCompleted}/{dashboardData.routineToday.weeklyTarget}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">ScanFlow™ Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-2xl font-bold">{dashboardData.scans.total}</p>
                    <p className="text-sm text-muted-foreground">products scanned</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/scan')}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Scan now
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative left-0" />
              <CarouselNext className="relative right-0" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Onboarding Card */}
        {!isOnboardingComplete && (
          <Card className="shadow-card border-accent/20">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <Progress value={dashboardData.user.onboardingCompletedPct} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {user.skinType && <Badge>Skin Type: {user.skinType}</Badge>}
                {user.skinTone && <Badge>Tone: {user.skinTone}</Badge>}
                {user.goals && user.goals.length > 0 && <Badge>Goals set</Badge>}
                {user.allergies && user.allergies.length > 0 && <Badge>Allergies noted</Badge>}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate('/onboarding')} className="flex-1">
                  Resume questionnaire
                </Button>
                <Button variant="outline" className="flex-1">
                  See starter routine
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ExplainAI Recent Scan */}
        {dashboardData.explainRecent && (
          <Card className="shadow-card cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>ExplainAI™ — Recent Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img 
                  src={dashboardData.explainRecent.product.thumbUrl} 
                  alt={dashboardData.explainRecent.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{dashboardData.explainRecent.product.name}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">Score: {dashboardData.explainRecent.score}</Badge>
                    {dashboardData.explainRecent.allergyFlags === 0 ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        No allergy flags
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        {dashboardData.explainRecent.allergyFlags} flags
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Routine Today */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Routine — Today</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm">Morning</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                {dashboardData.routineToday.morning.map((step: string, i: number) => (
                  <p key={i}>{i + 1}. {step}</p>
                ))}
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm">Evening</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                {dashboardData.routineToday.evening.map((step: string, i: number) => (
                  <p key={i}>{i + 1}. {step}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AllergySync */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>AllergySync™</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.allergies.count === 0 ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <AlertCircle className="w-5 h-5" />
                <span>No active notices</span>
              </div>
            ) : (
              <div className="space-y-2">
                {dashboardData.allergies.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.ingredient}</p>
                      <Badge variant={item.severity === 'high' ? 'destructive' : 'secondary'}>
                        {item.severity}
                      </Badge>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recommendations for you</CardTitle>
              <Button variant="ghost" size="sm">See all</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {dashboardData.recommendations.items.map((rec: any) => (
                <div key={rec.productId} className="flex-shrink-0 w-40 cursor-pointer">
                  <img 
                    src={rec.imageUrl} 
                    alt={rec.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-medium text-sm line-clamp-2">{rec.name}</h4>
                  <Badge variant="secondary" className="mt-1">{rec.tag}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">Match {rec.match}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* NutriDerm & Rewards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">NutriDerm™</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {dashboardData.nutriderm.message}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Rewards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">XP</span>
                <span className="font-bold">{dashboardData.user.xp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Title</span>
                <Badge variant="secondary">{dashboardData.user.title}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Streak</span>
                <span className="font-bold">{dashboardData.user.streak} days</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* What I've Used So Far */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>What I've used so far (today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dashboardData.usedToday.used.map((item: string, i: number) => (
                <Badge key={i} variant="secondary">{item}</Badge>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Banner Nudge */}
        <Card className="shadow-card bg-accent/10">
          <CardContent className="py-4">
            <p className="text-sm text-center">
              Complete 5 days to unlock 'Routine Pro' 🎉
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
