import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Search, Sparkles, ScanLine, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useScannedProducts } from '@/contexts/ScannedProductsContext';
import { AppLayout } from '@/components/AppLayout';

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
    <AppLayout>
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ScanFlow™</h1>
            <p className="text-sm text-muted-foreground">Scan or search for products</p>
          </div>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>

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

        {/* Recent Scans */}
        {scannedProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scannedProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <Badge className={getVerdictColor(product.verdict)}>
                      {product.score}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
