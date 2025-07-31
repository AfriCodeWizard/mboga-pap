import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type LoyaltyPoint = {
  id: string;
  amount: number;
  earnedAt: Date;
  source: 'purchase' | 'bonus' | 'referral';
  orderId?: string;
  description: string;
};

export type LoyaltyReward = {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  discount: number; // percentage discount
  isActive: boolean;
  image?: string;
  category: 'discount' | 'free_delivery' | 'cashback' | 'product';
};

interface LoyaltyContextType {
  points: number;
  totalEarned: number;
  totalRedeemed: number;
  pointHistory: LoyaltyPoint[];
  availableRewards: LoyaltyReward[];
  addPoints: (amount: number, source: LoyaltyPoint['source'], orderId?: string, description?: string) => void;
  redeemPoints: (rewardId: string) => boolean;
  getPointsFromSpend: (amount: number) => number;
  getSpendFromPoints: (points: number) => number;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error("useLoyalty must be used within a LoyaltyProvider");
  return context;
};

// Default rewards
const defaultRewards: LoyaltyReward[] = [
  {
    id: 'free-delivery-1',
    name: 'Free Delivery',
    description: 'Free delivery on your next order',
    pointsRequired: 50,
    discount: 100, // 100% off delivery
    isActive: true,
    category: 'free_delivery',
    image: '/delivery-icon.svg'
  },
  {
    id: 'discount-10',
    name: '10% Off',
    description: '10% discount on your next order',
    pointsRequired: 100,
    discount: 10,
    isActive: true,
    category: 'discount',
    image: '/discount-icon.svg'
  },
  {
    id: 'discount-20',
    name: '20% Off',
    description: '20% discount on your next order',
    pointsRequired: 200,
    discount: 20,
    isActive: true,
    category: 'discount',
    image: '/discount-icon.svg'
  },
  {
    id: 'cashback-50',
    name: 'KSh 50 Cashback',
    description: 'KSh 50 cashback to your account',
    pointsRequired: 150,
    discount: 50,
    isActive: true,
    category: 'cashback',
    image: '/cashback-icon.svg'
  },
  {
    id: 'cashback-100',
    name: 'KSh 100 Cashback',
    description: 'KSh 100 cashback to your account',
    pointsRequired: 300,
    discount: 100,
    isActive: true,
    category: 'cashback',
    image: '/cashback-icon.svg'
  },
  {
    id: 'free-vegetables',
    name: 'Free Vegetable Pack',
    description: 'Free pack of fresh vegetables',
    pointsRequired: 250,
    discount: 100,
    isActive: true,
    category: 'product',
    image: '/vegetables-icon.svg'
  }
];

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalRedeemed, setTotalRedeemed] = useState(0);
  const [pointHistory, setPointHistory] = useState<LoyaltyPoint[]>([]);
  const [availableRewards] = useState<LoyaltyReward[]>(defaultRewards);

  // Add some sample points for demonstration
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem("loyalty") : null;
    if (!stored) {
      // Add sample data for first-time users
      const samplePoints = 175;
      const sampleHistory: LoyaltyPoint[] = [
        {
          id: '1',
          amount: 50,
          earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          source: 'purchase',
          orderId: 'ORD-1001',
          description: 'Order total: KSh 500'
        },
        {
          id: '2',
          amount: 75,
          earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          source: 'purchase',
          orderId: 'ORD-1002',
          description: 'Order total: KSh 750'
        },
        {
          id: '3',
          amount: 50,
          earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          source: 'purchase',
          orderId: 'ORD-1003',
          description: 'Order total: KSh 500'
        }
      ];
      
      setPoints(samplePoints);
      setTotalEarned(samplePoints);
      setPointHistory(sampleHistory);
    }
  }, []);

  // Load loyalty data from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem("loyalty") : null;
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setPoints(data.points || 0);
        setTotalEarned(data.totalEarned || 0);
        setTotalRedeemed(data.totalRedeemed || 0);
        setPointHistory(data.pointHistory || []);
      } catch {}
    }
  }, []);

  // Save loyalty data to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("loyalty", JSON.stringify({
        points,
        totalEarned,
        totalRedeemed,
        pointHistory
      }));
    }
  }, [points, totalEarned, totalRedeemed, pointHistory]);

  const addPoints = (amount: number, source: LoyaltyPoint['source'], orderId?: string, description?: string) => {
    const newPoint: LoyaltyPoint = {
      id: Date.now().toString(),
      amount,
      earnedAt: new Date(),
      source,
      orderId,
      description: description || `Earned ${amount} points from ${source}`
    };

    setPoints(prev => prev + amount);
    setTotalEarned(prev => prev + amount);
    setPointHistory(prev => [newPoint, ...prev]);
  };

  const redeemPoints = (rewardId: string): boolean => {
    const reward = availableRewards.find(r => r.id === rewardId);
    if (!reward || !reward.isActive || points < reward.pointsRequired) {
      return false;
    }

    const redeemedPoint: LoyaltyPoint = {
      id: Date.now().toString(),
      amount: -reward.pointsRequired,
      earnedAt: new Date(),
      source: 'purchase',
      description: `Redeemed ${reward.name} for ${reward.pointsRequired} points`
    };

    setPoints(prev => prev - reward.pointsRequired);
    setTotalRedeemed(prev => prev + reward.pointsRequired);
    setPointHistory(prev => [redeemedPoint, ...prev]);
    return true;
  };

  const getPointsFromSpend = (amount: number): number => {
    // 1 point for every KSh 10 spent
    return Math.floor(amount / 10);
  };

  const getSpendFromPoints = (points: number): number => {
    // Convert points back to spend value
    return points * 10;
  };

  return (
    <LoyaltyContext.Provider value={{
      points,
      totalEarned,
      totalRedeemed,
      pointHistory,
      availableRewards,
      addPoints,
      redeemPoints,
      getPointsFromSpend,
      getSpendFromPoints
    }}>
      {children}
    </LoyaltyContext.Provider>
  );
}; 