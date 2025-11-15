import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Search, Sparkles, ScanLine, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useScannedProducts } from '@/contexts/ScannedProductsContext';
import BottomNav from '@/components/BottomNav';

export default function Scan() {
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scannedProducts, addScannedProduct } = useScannedProducts();

  // Mock product result
  const mockProduct = {
    id: '1',
    name: 'Hydrating Face Serum',
    brand: 'GlowLab',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    score: 92,
    verdict: 'good' as const,
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      addScannedProduct(mockProduct);
      toast({
        title: 'Product Scanned!',
        description: 'Analyzing ingredients...',
      });
      navigate(`/product/${mockProduct.id}`);
    }, 2000);
  };

  const handleManualSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Enter product name',
        description: 'Please type a product name to search',
        variant: 'destructive',
      });
      return;
    }
    addScannedProduct(mockProduct);
    toast({
      title: 'Product Found!',
      description: 'Analyzing ingredients...',
    });
    navigate(`/product/${mockProduct.id}`);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'good': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'caution': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'avoid': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ScanFlow™</h1>
            <p className="text-sm text-muted-foreground">Scan or search for products</p>
          </div>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

        {!showResult ? (
          <>
            {/* Camera Scanner */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted flex items-center justify-center">
                  {isScanning ? (
                    <div className="flex flex-col items-center gap-4">
                      <ScanLine className="w-16 h-16 text-primary animate-pulse" />
                      <p className="text-sm text-muted-foreground">Scanning barcode...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                      <Camera className="w-16 h-16 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Position the barcode within the frame
                      </p>
                    </div>
                  )}
                  {/* Scanning frame overlay */}
                  <div className="absolute inset-0 border-2 border-primary/20 m-12 rounded-lg pointer-events-none" />
                </div>
                <div className="p-4">
                  <Button 
                    onClick={handleScan} 
                    disabled={isScanning}
                    className="w-full"
                    size="lg"
                  >
                    {isScanning ? 'Scanning...' : 'Scan Barcode'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Manual Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Or search manually</CardTitle>
                <CardDescription>Enter product name or barcode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Hydrating Face Serum"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                  />
                  <Button onClick={handleManualSearch} size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Product Result */
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={mockProduct.image}
                    alt={mockProduct.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{mockProduct.brand}</p>
                    <h3 className="text-lg font-semibold">{mockProduct.name}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getVerdictColor(mockProduct.verdict)}>
                        {mockProduct.verdict.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary">Score: {mockProduct.score}</Badge>
                      {mockProduct.allergyFlags === 0 && (
                        <Badge variant="outline" className="text-green-600">
                          No Allergy Flags
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matched Goals */}
            {mockProduct.matchedGoals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Matches Your Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockProduct.matchedGoals.map((goal) => (
                      <Badge key={goal} variant="secondary">
                        ✓ {goal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Ingredients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Ingredients</CardTitle>
                <CardDescription>Top 5 active ingredients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockProduct.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {idx + 1}
                      </div>
                      <span className="text-sm">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResult(false)}
                className="flex-1"
              >
                Scan Another
              </Button>
              <Button
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Add to Routine
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
