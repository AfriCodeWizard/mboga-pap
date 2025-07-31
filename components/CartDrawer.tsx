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
  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getCartTotal();
  const pointsEarned = getLoyaltyPointsEarned();
  const [showPointsNotification, setShowPointsNotification] = useState(false);

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md right-0 top-0 h-screen p-0 flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-brandgreen" />
            <span>Your Cart</span>
          </DialogTitle>
        </DialogHeader>
        <div className={`flex-1 p-0`}> {/* Remove extra padding for parity */}
          <div className="p-4 border-b font-bold text-lg flex items-center">
            <ShoppingCart className="h-5 w-5 text-[color:var(--color-primary)] mr-2" /> Cart
          </div>
          <div className="overflow-y-auto divide-y" style={{ maxHeight: '13.5rem' }}>
            {cart.length === 0 ? (
              <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.itemId} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">x{item.quantity} @ KSh {item.price}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[color:var(--color-primary)] font-bold">KSh {(parseFloat(item.price) * item.quantity).toFixed(0)}</span>
                    <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.itemId, item.vendorId)}>
                      ×
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="p-4 border-t bg-white">
          {cart.length > 0 && (
            <>
              {/* Loyalty Points Info */}
              <div className="p-4 border-b bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Loyalty Points</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    {points} pts available
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Points to earn:</span>
                  <span className="font-semibold text-green-600">+{pointsEarned} pts</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Earn 1 point for every KSh 10 spent
                </p>
              </div>

              {/* Order Summary */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">KSh {subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-[color:var(--color-primary)] font-bold">KSh {total.toFixed(0)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t flex flex-col gap-2">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={handleClear}>
                  Clear Cart
                </Button>
                <Button 
                  className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" 
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
  );
};

export default CartDrawer; 