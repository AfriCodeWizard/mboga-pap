import React from "react";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PointsEarnedNotificationProps {
  points: number;
  isVisible: boolean;
  onClose: () => void;
}

const PointsEarnedNotification: React.FC<PointsEarnedNotificationProps> = ({
  points,
  isVisible,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg border border-yellow-300 max-w-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Points Earned!</h4>
              <p className="text-sm opacity-90">
                You earned <strong>{points} loyalty points</strong> for your purchase!
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((points / 100) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-white h-2 rounded-full"
            />
          </div>
          
          <p className="text-xs mt-2 opacity-80">
            Keep shopping to earn more rewards!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PointsEarnedNotification; 