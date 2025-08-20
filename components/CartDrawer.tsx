import React from "react";
import { useCart } from "@/components/CartContext";
import { useLoyalty } from "@/components/LoyaltyContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Star, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import PointsEarnedNotification from "@/components/PointsEarnedNotification";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartSubtotal, getDeliveryFee, getCartTotal, getLoyaltyPointsEarned } = useCart();
  const { points, addPoints } = useLoyalty();
  const { toast } = useToast();
  const [showPointsNotification, setShowPointsNotification] = useState(false);
  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getCartTotal();
  const pointsEarned = getLoyaltyPointsEarned();

  const handleRemove = (itemId, vendorId) => {
    try {
      removeFromCart(itemId, vendorId);
    } catch (e) {
      toast({ title: "Error", description: "Failed to remove item. Please try again.", variant: "destructive" });
    }
  };

  const handleClear = () => {
    try {
      clearCart();
    } catch (e) {
      toast({ title: "Error", description: "Failed to clear cart. Please try again.", variant: "destructive" });
    }
  };

  const isLoggedIn = false; // TODO: Replace with real auth check (simulate logged out)
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md w-full h-full max-h-screen p-0 flex flex-col fixed right-0 top-0 transform-none">
          <DialogHeader className="p-4 border-b bg-white sticky top-0 z-10">
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)]" />
              <span className="text-lg font-semibold">Your Cart</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-gray-200">
              {cart.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.itemId} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">x{item.quantity} @ KSh {item.price}</div>
                      <div className="text-xs text-gray-500 mt-1">Vendor: {item.vendorName}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[color:var(--color-primary)] font-bold text-lg">KSh {(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeFromCart(item.itemId, item.vendorId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
              </div>
            </div>
          </div>
          <div className="border-t bg-white sticky bottom-0">
            {cart.length > 0 && (
              <>
                {/* Loyalty Points Info */}
                <div className="p-4 border-b bg-gradient-to-r from-[color:var(--color-accent)]/10 to-[color:var(--color-primary)]/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">Loyalty Points</span>
                    </div>
                    <Badge className="bg-[color:var(--color-accent)] text-[color:var(--color-primary)] text-xs font-semibold">
                      {points} pts available
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Points to earn:</span>
                    <span className="font-semibold text-[color:var(--color-primary)]">+{pointsEarned} pts</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Earn 1 point for every KSh 10 spent
                  </p>
                </div>

                {/* Order Summary */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KSh {subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-[color:var(--color-primary)]' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-[color:var(--color-primary)] font-bold text-xl">KSh {total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" 
                    onClick={handleClear}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  <Button 
                    className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-primary)] text-white font-semibold py-3" 
                    onClick={() => {
                      // Add points when checkout is completed
                      if (pointsEarned > 0) {
                        addPoints(pointsEarned, 'purchase', undefined, `Order total: KSh ${total.toFixed(0)}`);
                        setShowPointsNotification(true);
                        // Auto-hide notification after 5 seconds
                        setTimeout(() => setShowPointsNotification(false), 5000);
                      }
                      // handle guest checkout
                      toast({
                        title: "Order placed!",
                        description: `You earned ${pointsEarned} loyalty points!`,
                      });
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Checkout & Earn Points
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Points Earned Notification */}
      <PointsEarnedNotification
        points={pointsEarned}
        isVisible={showPointsNotification}
        onClose={() => setShowPointsNotification(false)}
      />
    </>
  );
};

export default CartDrawer; 