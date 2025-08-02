"use client";

import React, { useState } from "react";
import { useLoyalty } from "@/components/LoyaltyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Gift, TrendingUp, History } from "lucide-react";

interface LoyaltyPointsDisplayProps {
  variant?: 'compact' | 'full';
}

const LoyaltyPointsDisplay: React.FC<LoyaltyPointsDisplayProps> = ({ variant = 'full' }) => {
  const { points, totalEarned, availableRewards, redeemPoints } = useLoyalty();
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const handleRedeem = (rewardId: string) => {
    setSelectedReward(rewardId);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      const success = redeemPoints(selectedReward);
      if (success) {
        setShowRedeemDialog(false);
        setSelectedReward(null);
      }
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium">{points} pts</span>
      </div>
    );
  }

  return (
    <>
      <Card className="border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Loyalty Points</span>
            <Badge className="bg-yellow-100 text-yellow-800 ml-auto">
              {points} pts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Points Summary */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3 border border-yellow-200">
              <div className="flex items-center space-x-1 mb-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-gray-600 text-xs">Total Earned</span>
              </div>
              <span className="font-semibold text-green-600">{totalEarned} pts</span>
            </div>
            <div className="bg-white rounded-lg p-3 border border-yellow-200">
              <div className="flex items-center space-x-1 mb-1">
                <Gift className="h-3 w-3 text-purple-500" />
                <span className="text-gray-600 text-xs">Available</span>
              </div>
              <span className="font-semibold text-purple-600">{points} pts</span>
            </div>
          </div>

          {/* Quick Rewards Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span>Quick Rewards</span>
            </h4>
            <div className="space-y-2">
              {availableRewards.slice(0, 2).map((reward) => (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                    points >= reward.pointsRequired
                      ? 'bg-white border-green-200 hover:bg-green-50 cursor-pointer'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                  onClick={() => points >= reward.pointsRequired && handleRedeem(reward.id)}
                >
                  <div>
                    <div className="font-medium">{reward.name}</div>
                    <div className="text-gray-500">{reward.pointsRequired} pts</div>
                  </div>
                  {points >= reward.pointsRequired && (
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Redeem
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-xs h-8"
              onClick={() => window.location.href = '/dashboard/loyalty'}
            >
              <History className="h-3 w-3 mr-1" />
              View History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Redeem Confirmation Dialog */}
      {showRedeemDialog && selectedReward && (
        <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Redemption</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to redeem this reward?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRedeemDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmRedeem}>
                  Confirm
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LoyaltyPointsDisplay; 