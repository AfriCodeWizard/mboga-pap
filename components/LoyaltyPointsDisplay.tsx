import React from "react";
import { useLoyalty } from "@/components/LoyaltyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Star, TrendingUp, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoyaltyPointsDisplayProps {
  variant?: 'compact' | 'full';
  showRedeemButton?: boolean;
}

const LoyaltyPointsDisplay: React.FC<LoyaltyPointsDisplayProps> = ({ 
  variant = 'full', 
  showRedeemButton = true 
}) => {
  const { points, totalEarned, availableRewards, redeemPoints } = useLoyalty();
  const [redeemDialogOpen, setRedeemDialogOpen] = React.useState(false);
  const [selectedReward, setSelectedReward] = React.useState<string | null>(null);

  const handleRedeem = (rewardId: string) => {
    setSelectedReward(rewardId);
    setRedeemDialogOpen(true);
  };

  const confirmRedeem = () => {
    if (selectedReward && redeemPoints(selectedReward)) {
      setRedeemDialogOpen(false);
      setSelectedReward(null);
      // You could add a toast notification here
    }
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

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-2">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className={`font-semibold ${getPointsColor(points)}`}>
          {points} pts
        </span>
        {showRedeemButton && points >= 50 && (
          <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                <Gift className="h-3 w-3 mr-1" />
                Redeem
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Redeem Your Points</DialogTitle>
                <DialogDescription>
                  Choose a reward to redeem with your {points} points
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                {availableRewards
                  .filter(reward => reward.isActive && points >= reward.pointsRequired)
                  .map(reward => (
                    <Card key={reward.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{reward.name}</h4>
                            <p className="text-sm text-gray-600">{reward.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getPointsBadgeColor(reward.pointsRequired)}>
                              {reward.pointsRequired} pts
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }

  return (
    <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-[color:var(--color-primary)]">
          <Star className="h-5 w-5 text-yellow-500" />
          <span>Loyalty Points</span>
          <Badge className={`ml-auto ${getPointsBadgeColor(points)}`}>
            {points} pts
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Points Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-700">Earned</span>
            </div>
            <p className="text-lg font-bold text-green-800">{totalEarned}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Zap className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-700">Available</span>
            </div>
            <p className="text-lg font-bold text-blue-800">{points}</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Earn 1 point for every KSh 10 spent!</strong>
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Spend KSh {(100 - (points % 100))} more to earn {(100 - (points % 100)) / 10} more points
          </p>
        </div>

        {/* Available Rewards Preview */}
        {points >= 50 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Available Rewards:</h4>
            <div className="space-y-2">
              {availableRewards
                .filter(reward => reward.isActive && points >= reward.pointsRequired)
                .slice(0, 2)
                .map(reward => (
                  <div key={reward.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{reward.name}</p>
                      <p className="text-xs text-gray-600">{reward.description}</p>
                    </div>
                    <Badge className={getPointsBadgeColor(reward.pointsRequired)}>
                      {reward.pointsRequired} pts
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showRedeemButton && points >= 50 && (
            <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/90 text-white">
                  <Gift className="h-4 w-4 mr-2" />
                  Redeem Points
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Gift className="h-5 w-5 text-[color:var(--color-primary)]" />
                    <span>Redeem Your Points</span>
                  </DialogTitle>
                  <DialogDescription>
                    You have <strong>{points} points</strong> available. Choose a reward to redeem:
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {availableRewards
                    .filter(reward => reward.isActive && points >= reward.pointsRequired)
                    .map(reward => (
                      <Card 
                        key={reward.id} 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          selectedReward === reward.id ? 'ring-2 ring-[color:var(--color-primary)]' : ''
                        }`}
                        onClick={() => setSelectedReward(reward.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-[color:var(--color-primary)]">
                                {reward.name}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {reward.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <Badge className={`${getPointsBadgeColor(reward.pointsRequired)} text-sm`}>
                                {reward.pointsRequired} pts
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                {selectedReward && (
                  <div className="flex gap-2 pt-4">
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
                      Confirm Redemption
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.location.href = '/dashboard/loyalty'}
          >
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyPointsDisplay; 