import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addedToRoutine, setAddedToRoutine] = useState(false);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: id || '1',
    name: 'Hydrating Face Serum',
    brand: 'GlowLab',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    barcode: '1234567890123',
    score: 92,
    verdict: 'good' as const,
    matchedGoals: ['Hydration', 'Anti-aging'],
    allergyFlags: 0,
    ingredients: ['Hyaluronic Acid', 'Vitamin C', 'Niacinamide', 'Glycerin', 'Peptides'],
    description: 'A lightweight, fast-absorbing serum that delivers intense hydration and helps reduce the appearance of fine lines.',
    benefits: [
      'Deeply hydrates skin',
      'Reduces fine lines and wrinkles',
      'Improves skin texture',
      'Suitable for all skin types'
    ]
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'good': return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'caution': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'avoid': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleAddToRoutine = () => {
    setAddedToRoutine(true);
    toast({
      title: 'Added to routine!',
      description: `${product.name} has been added to your routine.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/scan')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Product Details</h1>
            <p className="text-sm text-muted-foreground">Analysis results</p>
          </div>
        </div>

        {/* Product Image & Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-lg object-cover border border-border"
              />
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getVerdictColor(product.verdict)} variant="outline">
                    {product.verdict.toUpperCase()}
                  </Badge>
                  <span className="text-2xl font-bold text-primary">{product.score}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matched Goals */}
        {product.matchedGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Check className="w-5 h-5 text-primary" />
                Matches Your Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.matchedGoals.map((goal) => (
                  <Badge key={goal} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About This Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Key Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="outline">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Allergy Warning */}
        {product.allergyFlags > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">Allergy Warning</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This product contains {product.allergyFlags} ingredient(s) you're allergic to.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/scan')}
          >
            Scan Another
          </Button>
          <Button 
            className="flex-1"
            onClick={handleAddToRoutine}
            disabled={addedToRoutine}
          >
            {addedToRoutine ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Routine
              </>
            )}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
