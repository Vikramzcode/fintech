import { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { Wallet } from "lucide-react";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement deposit logic
    console.log("Deposit:", { amount, paymentMethod });
  };

  return (
    <main className="p-4 lg:p-8 lg:ml-64 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Deposit Funds</h1>
          <p className="text-muted-foreground">
            Add funds to your account to start investing
          </p>
        </div>

        <GlassCard heavy className="p-8 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <div className="flex-shrink-0">
              <p className="text-xs uppercase text-muted-foreground font-semibold">
                Important Notice
              </p>
            </div>
            <p className="text-sm">
              Platform fee: 1% applies. This will be deducted from your deposit.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Deposit Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-muted-foreground font-semibold">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="100"
                  step="0.01"
                  className="w-full bg-input border border-white/10 rounded-lg pl-8 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Minimum deposit: $100
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-input border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="bank">Bank Transfer</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI (India)</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!amount}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Wallet size={20} />
              Proceed to Payment
            </button>
          </form>

          {/* Fee Breakdown (shown after submission in real app) */}
          <div className="pt-6 border-t border-white/10">
            <h3 className="font-semibold mb-4">Estimated Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross Amount</span>
                <span className="font-semibold">${amount || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee (1%)</span>
                <span className="text-loss">
                  -${(parseFloat(amount) * 0.01 || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="font-semibold">Net Credited Amount</span>
                <span className="font-semibold text-profit">
                  ${(parseFloat(amount) * 0.99 || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
