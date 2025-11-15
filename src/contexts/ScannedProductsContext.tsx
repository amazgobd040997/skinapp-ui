import { createContext, useContext, useState, ReactNode } from 'react';

interface ScannedProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  score: number;
  verdict: 'good' | 'caution' | 'avoid';
  scannedAt: Date;
}

interface ScannedProductsContextType {
  scannedProducts: ScannedProduct[];
  addScannedProduct: (product: Omit<ScannedProduct, 'scannedAt'>) => void;
  clearHistory: () => void;
}

const ScannedProductsContext = createContext<ScannedProductsContextType | undefined>(undefined);

export function ScannedProductsProvider({ children }: { children: ReactNode }) {
  const [scannedProducts, setScannedProducts] = useState<ScannedProduct[]>([]);

  const addScannedProduct = (product: Omit<ScannedProduct, 'scannedAt'>) => {
    const newProduct: ScannedProduct = {
      ...product,
      scannedAt: new Date(),
    };
    setScannedProducts((prev) => [newProduct, ...prev]);
  };

  const clearHistory = () => {
    setScannedProducts([]);
  };

  return (
    <ScannedProductsContext.Provider value={{ scannedProducts, addScannedProduct, clearHistory }}>
      {children}
    </ScannedProductsContext.Provider>
  );
}

export function useScannedProducts() {
  const context = useContext(ScannedProductsContext);
  if (!context) {
    throw new Error('useScannedProducts must be used within ScannedProductsProvider');
  }
  return context;
}
