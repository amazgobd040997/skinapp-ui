// Mock data for dashboard - simulates API responses

export const getMockDashboardData = (userId: string) => {
  return {
    user: {
      id: userId,
      name: "Sarah",
      avatarUrl: undefined,
      onboardingCompletedPct: 80,
      title: "Glow Seeker",
      xp: 450,
      streak: 3
    },
    scans: {
      total: 12,
      recentScanId: "scan-1"
    },
    explainRecent: {
      scanId: "scan-1",
      product: {
        id: "prod-1",
        name: "Vitamin C Serum",
        thumbUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop"
      },
      score: 92,
      verdict: "good" as const,
      badges: ["Brightening", "Antioxidant"],
      allergyFlags: 0
    },
    routineToday: {
      morning: ["Gentle cleanser", "Vitamin C serum", "Moisturizer with SPF"],
      evening: ["Oil cleanser", "Hydrating toner", "Night cream"],
      onTrack: true,
      weeklyCompleted: 4,
      weeklyTarget: 7
    },
    allergies: {
      count: 0,
      items: []
    },
    recommendations: {
      items: [
        {
          productId: "rec-1",
          name: "Hyaluronic Acid Serum",
          imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
          tag: "Hydrating",
          match: 95
        },
        {
          productId: "rec-2",
          name: "Niacinamide Treatment",
          imageUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4b8f0bb?w=200&h=200&fit=crop",
          tag: "Brightening",
          match: 88
        },
        {
          productId: "rec-3",
          name: "Retinol Night Cream",
          imageUrl: "https://images.unsplash.com/photo-1556228852-80a39b2c2f71?w=200&h=200&fit=crop",
          tag: "Anti-aging",
          match: 82
        }
      ]
    },
    usedToday: {
      used: ["Gentle cleanser", "Vitamin C serum"]
    },
    nutriderm: {
      message: "Boost collagen with vitamin C-rich foods like oranges and bell peppers"
    }
  };
};
