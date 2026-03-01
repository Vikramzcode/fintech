import { useEffect, useState } from "react";
import { GlassCard } from "@/components/common/GlassCard";
import { Copy, Check, Gift, TrendingUp, User } from "lucide-react";
import { formatCurrency } from "@/utils/formatting";
import { apiClient } from "@/services/api";
import { ReferralResponse } from "@/types/referral.types.tsx";
import { useAuth } from "@/context/AuthContext";

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const {user} = useAuth();
const [mockReferralData, setMockReferralData] = useState<ReferralResponse | null>(null)
  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockReferralData?.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
useEffect(() => {
  const fetchReferralData = async () => {
    try {
      console.log(User)
      const res = await apiClient.get<any>(
        `/referrals/${user.id}`
      )
      setMockReferralData(res.data)
      console.log(mockReferralData)
    } catch (error) {
      console.error(error)
    }
  }
  fetchReferralData()
}, [])

  const progress =
    (mockReferralData?.totalReferred / mockReferralData?.nextRankTarget) * 100;

  return (
    <main className="p-4 lg:p-8 lg:ml-64 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Earn  rewards by referring your friends
          </p>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm font-medium">
              Total Referrals
            </p>
            <p className="text-3xl font-bold mt-2">{mockReferralData?.totalReferred}</p>
            <p className="text-xs text-muted-foreground mt-2">Friends invited</p>
          </GlassCard>

          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm font-medium">
              Bonus Earned
            </p>
            <p className="text-3xl font-bold text-profit mt-2">
              {formatCurrency(mockReferralData?.totalBonus)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">From referrals</p>
          </GlassCard>

          <GlassCard heavy className="p-6">
            <p className="text-muted-foreground text-sm font-medium">Rank</p>
            <p className="text-2xl font-bold text-accent mt-2">
              {mockReferralData?.rank}
            </p>
            <p className="text-xs text-muted-foreground mt-2">Next milestone</p>
          </GlassCard>
        </div>

        {/* Referral Link */}
        <GlassCard heavy className="p-8 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Gift size={20} />
            Your Referral Link
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={mockReferralData?.referralLink}
              readOnly
              className="flex-1 bg-input border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Rank Progress */}
        <GlassCard heavy className="p-8 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp size={20} />
            Progress to Next Rank
          </h3>

          <div>
            <div className="flex justify-between mb-3">
              <span className="text-sm font-semibold">{mockReferralData?.rank}</span>
              <span className="text-sm text-muted-foreground">
                {mockReferralData?.totalReferred} / {mockReferralData?.nextRankTarget}
              </span>
            </div>
            <div className="w-full bg-card rounded-full h-3 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-profit to-accent h-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Invite {mockReferralData?.nextRankTarget - mockReferralData?.totalReferred} more friends to
              reach Gold Partner
            </p>
          </div>

          {/* Rewards Table */}
          <div className="pt-6 border-t border-white/10">
            <h4 className="font-semibold mb-4">Reward Structure</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-card/50 rounded-lg">
                <span className="text-muted-foreground">Per referral signup</span>
                <span className="font-semibold text-primary">$50</span>
              </div>
              <div className="flex justify-between p-3 bg-card/50 rounded-lg">
                <span className="text-muted-foreground">Per referral first deposit</span>
                <span className="font-semibold text-primary">5% commission</span>
              </div>
              <div className="flex justify-between p-3 bg-card/50 rounded-lg">
                <span className="text-muted-foreground">Ongoing monthly bonus</span>
                <span className="font-semibold text-profit">0.5% on referral deposits</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Referrals List */}
        <GlassCard heavy className="p-8 space-y-6">
          <h3 className="text-lg font-semibold">Recent Referrals</h3>

          <div className="space-y-3">
            {mockReferralData?.referrals.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold">{ref.name}</p>
                  <p className="text-xs text-muted-foreground">{ref.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Joined {new Date(ref.joinedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-profit font-semibold">
                    +{formatCurrency(ref.bonus)}
                  </p>
                  <p className="text-xs text-muted-foreground">{ref.status}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
