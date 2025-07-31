"use client"

import { useState } from "react";
import { useLoyalty } from "@/components/LoyaltyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Gift, 
  TrendingUp, 
  Clock, 
  ArrowLeft,
  Calendar,
  DollarSign,
  Truck,
  Package
} from "lucide-react";
import { useRouter } from "next/navigation";
import CustomerNavbar from "@/components/CustomerNavbar";
import LoyaltyPointsDisplay from "@/components/LoyaltyPointsDisplay";

export default function LoyaltyPage() {
  const router = useRouter();
  const { 
    points, 
    totalEarned, 
    totalRedeemed, 
    pointHistory, 
    availableRewards, 
    redeemPoints 
  } = useLoyalty();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);

  const confirmRedeem = () => {
    if (selectedReward && redeemPoints(selectedReward)) {
      setRedeemDialogOpen(false);
      setSelectedReward(null);
    }
  };

  const getRewardIcon = (category: string) => {
    switch (category) {
      case 'discount':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'free_delivery':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'cashback':
        return <DollarSign className="h-5 w-5 text-purple-600" />;
      case 'product':
        return <Package className="h-5 w-5 text-orange-600" />;
      default:
        return <Gift className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getPointsColor = (points: number) => {
    if (points >= 300) return "text-purple-600";
    if (points >= 200) return "text-blue-600";
    if (points >= 100) return "text-green-600";
    return "text-gray-600";
  };

  const getPointsBadgeColor = (points: number) => {
    if (points >= 300) return "bg-purple-100 text-purple-800";
    if (points >= 200) return "bg-blue-100 text-blue-800";
    if (points >= 100) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--color-primary)]">Loyalty Program</h1>
            <p className="text-gray-600">Earn points with every purchase and redeem for rewards</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Points Overview */}
          <div className="lg:col-span-1">
            <LoyaltyPointsDisplay showRedeemButton={false} />
            
            {/* Quick Stats */}
            <Card className="mt-6 border-2 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[color:var(--color-primary)]">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-green-800">{totalEarned}</p>
                    <p className="text-xs text-green-700">Total Earned</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <Gift className="h-6 w-6 text-red-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-red-800">{totalRedeemed}</p>
                    <p className="text-xs text-red-700">Total Redeemed</p>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-blue-800">{points}</p>
                  <p className="text-xs text-blue-700">Available Points</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
                <TabsTrigger value="history">Point History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="rewards" className="mt-6">
                <Card className="border-2 border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                      <Gift className="h-5 w-5" />
                      <span>Redeem Your Points</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {availableRewards
                        .filter(reward => reward.isActive)
                        .map(reward => (
                          <Card 
                            key={reward.id} 
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                              points >= reward.pointsRequired 
                                ? 'border-green-200 hover:border-green-300' 
                                : 'border-gray-200 opacity-60'
                            }`}
                            onClick={() => {
                              if (points >= reward.pointsRequired) {
                                setSelectedReward(reward.id);
                                setRedeemDialogOpen(true);
                              }
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  {getRewardIcon(reward.category)}
                                  <div>
                                    <h4 className="font-semibold text-[color:var(--color-primary)]">
                                      {reward.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">{reward.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge className={`${getPointsBadgeColor(reward.pointsRequired)}`}>
                                    {reward.pointsRequired} pts
                                  </Badge>
                                  {points >= reward.pointsRequired ? (
                                    <p className="text-xs text-green-600 mt-1">Available</p>
                                  ) : (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Need {reward.pointsRequired - points} more pts
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <Card className="border-2 border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
                      <Clock className="h-5 w-5" />
                      <span>Point History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pointHistory.length === 0 ? (
                        <div className="text-center py-8">
                          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No points history yet</h3>
                          <p className="text-gray-600">Start shopping to earn your first loyalty points!</p>
                        </div>
                      ) : (
                        pointHistory.map((point) => (
                          <div 
                            key={point.id} 
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-full ${
                                point.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                {point.amount > 0 ? (
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Gift className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{point.description}</p>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(point.earnedAt)}</span>
                                  {point.source && (
                                    <>
                                      <span>•</span>
                                      <span className="capitalize">{point.source}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`font-bold text-lg ${
                                point.amount > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {point.amount > 0 ? '+' : ''}{point.amount}
                              </span>
                              <p className="text-xs text-gray-500">points</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Dialog */}
      {redeemDialogOpen && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Confirm Redemption</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to redeem this reward? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setRedeemDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white"
                onClick={confirmRedeem}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 