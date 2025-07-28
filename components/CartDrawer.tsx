import React from "react";
import { useCart } from "@/components/CartContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  // Remove guest prompt and order complete state for strict parity
  const { toast } = useToast();
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

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
              <div className="p-4 border-t flex justify-between items-center">
                <span className="font-semibold">Subtotal</span>
                <span className="text-[color:var(--color-primary)] font-bold">KSh {subtotal.toFixed(0)}</span>
              </div>
              <div className="p-4 border-t flex flex-col gap-2">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" onClick={handleClear}>
                  Clear Cart
                </Button>
                <Button className="w-full bg-[color:var(--color-primary)] hover:bg-[color:var(--color-accent)] hover:text-black text-white" onClick={() => {/* handle guest checkout */}}>
                  Checkout as Guest
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartDrawer; 