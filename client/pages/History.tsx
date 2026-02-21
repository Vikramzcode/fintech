import { useEffect, useState } from "react";
import { mockTransactions } from "@/mock/data";
import { GlassCard } from "@/components/common/GlassCard";
import { formatCurrency, formatDate } from "@/utils/formatting";
import { Eye, Filter } from "lucide-react";
import { apiClient } from "@/services/api";
import { Transaction } from "@/context/WalletContext";

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<
    "all" | "deposit" | "withdrawal" | "profit"
  >("all");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get<{ data: Transaction[] }>(
          "/users/transaction/history",
        );

        setTransactions(res.data.data); // <-- store API data
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <main className="p-4 lg:p-8 lg:ml-64 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
          <p className="text-muted-foreground">
            View all your deposits, withdrawals, and profits
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "deposit", "withdrawal", "profit"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 border border-white/10 hover:border-white/20 text-muted-foreground"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions Table */}
        <GlassCard heavy className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-muted-foreground text-xs uppercase font-semibold">
                <th className="text-left py-3 px-4">Date & Time</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-right py-3 px-4">Gross Amount</th>
                <th className="text-right py-3 px-4">Fee</th>
                <th className="text-right py-3 px-4">Net Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-center py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{formatDate(txn.timestamp)}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="capitalize text-sm font-medium">
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-semibold">
                      {formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-loss">
                      -{formatCurrency(txn.fee)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-semibold text-profit">
                      {formatCurrency(txn.netAmount)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded capitalize ${
                        txn.status === "completed"
                          ? "bg-profit/20 text-profit"
                          : txn.status === "pending"
                          ? "bg-warning/20 text-warning"
                          : "bg-loss/20 text-loss"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="p-2 hover:bg-card rounded transition-colors">
                      <Eye size={16} className="text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <div className="text-center py-12">
              <Filter
                className="mx-auto text-muted-foreground opacity-50 mb-3"
                size={32}
              />
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </GlassCard>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm">Total Deposits</p>
            <p className="text-2xl font-bold mt-2 text-profit">
              {formatCurrency(
                transactions
                  .filter((t) => t.type === "deposit")
                  .reduce((sum, t) => sum + t.amount, 0),
              )}
            </p>
          </GlassCard>
          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm">Total Withdrawn</p>
            <p className="text-2xl font-bold mt-2 text-loss">
              {formatCurrency(
                transactions
                  .filter((t) => t.type === "withdrawal")
                  .reduce((sum, t) => sum + t.amount, 0),
              )}
            </p>
          </GlassCard>
          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm">Total Fees</p>
            <p className="text-2xl font-bold mt-2">
              {formatCurrency(
                transactions.reduce((sum, t) => sum + t.fee, 0),
              )}
            </p>
          </GlassCard>
          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm">Total Transactions</p>
            <p className="text-2xl font-bold mt-2">{transactions.length}</p>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
