import { useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { isWithdrawalAllowed, getDaysUntilWithdrawal } from "@/utils/validation";
import { TrendingUp, AlertCircle, Clock } from "lucide-react";

export default function Withdraw() {
  const [withdrawType, setWithdrawType] = useState<"profit" | "principal">("profit");
  const [amount, setAmount] = useState("");
  const isAllowed = isWithdrawalAllowed();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllowed) {
      alert(
        `Withdrawals are only allowed between 1st-5th of each month. Next window in ${getDaysUntilWithdrawal()} days.`
      );
      return;
    }
    // TODO: Implement withdrawal logic
    console.log("Withdraw:", { withdrawType, amount });
  };

  return (
    <main className="p-4 lg:p-8 lg:ml-64 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
          <p className="text-muted-foreground">
            Request withdrawal of your profits or principal investment
          </p>
        </div>

        {!isAllowed && (
          <GlassCard heavy className="p-4 border-warning/50 flex items-start gap-4">
            <Clock className="text-warning flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold">Withdrawal Window Closed</p>
              <p className="text-sm text-muted-foreground mt-1">
                Withdrawals are available only from 1st to 5th of each month.
                <br />
                Next window: In {getDaysUntilWithdrawal()} days
              </p>
            </div>
          </GlassCard>
        )}

        <GlassCard heavy className="p-8 space-y-6">
          {/* Withdrawal Type Selection */}
          <div>
            <label className="block text-sm font-semibold mb-4">
              Withdrawal Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setWithdrawType("profit")}
                className={`p-4 rounded-lg border transition-all ${
                  withdrawType === "profit"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-card/50 hover:border-white/20"
                }`}
              >
                <p className="font-semibold mb-1">Profit Withdrawal</p>
                <p className="text-xs text-muted-foreground">
                  Withdraw your earnings (1% fee)
                </p>
              </button>
              <button
                type="button"
                onClick={() => setWithdrawType("principal")}
                className={`p-4 rounded-lg border transition-all ${
                  withdrawType === "principal"
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-card/50 hover:border-white/20"
                }`}
              >
                <p className="font-semibold mb-1">Principal Withdrawal</p>
                <p className="text-xs text-muted-foreground">
                  Withdraw your investment (1% fee)
                </p>
              </button>
            </div>
          </div>

          {/* Early Exit Fee Warning */}
          {withdrawType === "principal" && (
            <GlassCard className="p-4 border-loss/50 flex items-start gap-4">
              <AlertCircle className="text-loss flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="font-semibold">Early Exit Fee</p>
                <p className="text-muted-foreground mt-1">
                  If your investment is less than 6 months old, an additional 15% fee applies.
                </p>
              </div>
            </GlassCard>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Withdrawal Amount (USD)
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
                  disabled={!isAllowed}
                  className="w-full bg-input border border-white/10 rounded-lg pl-8 pr-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Minimum withdrawal: $100
              </p>
            </div>

            {/* Bank Details */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Account Details
              </label>
              <select
                disabled={!isAllowed}
                className="w-full bg-input border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
              >
                <option>Select saved account</option>
                <option>Bank Account ending in 1234</option>
                <option>Add new account</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!amount || !isAllowed}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <TrendingUp size={20} />
              Request Withdrawal
            </button>
          </form>

          {/* Fee Breakdown */}
          {amount && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-semibold mb-4">Withdrawal Breakdown</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Amount</span>
                  <span className="font-semibold">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (1%)</span>
                  <span className="text-loss">
                    -${(parseFloat(amount) * 0.01).toFixed(2)}
                  </span>
                </div>
                {withdrawType === "principal" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Early Exit Fee (if applicable, 15%)
                    </span>
                    <span className="text-loss">
                      -${(parseFloat(amount) * 0.15).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="font-semibold">Net Amount</span>
                  <span className="font-semibold text-profit">
                    ${(parseFloat(amount) * 0.99).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  );
}
