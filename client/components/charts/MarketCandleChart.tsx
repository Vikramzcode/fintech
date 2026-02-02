import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartDataPoint {
  time: string;
  price: number;
  high: number;
  low: number;
  volume: number;
}

export function MarketCandleChart() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);

  const fetchMarketData = async (tradingSymbol: string) => {
    try {
      setLoading(true);
      // Fetch 1-hour candlestick data from Binance
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${tradingSymbol}&interval=1h&limit=24`
      );
      const candleData = await response.json();

      const formattedData: ChartDataPoint[] = candleData.map(
        (candle: unknown[]) => {
          const timestamp = new Date(candle[0] as number);
          const hour = timestamp.getHours().toString().padStart(2, "0");
          const minute = timestamp.getMinutes().toString().padStart(2, "0");

          return {
            time: `${hour}:${minute}`,
            price: parseFloat(candle[4] as string), // close price
            high: parseFloat(candle[2] as string),
            low: parseFloat(candle[3] as string),
            volume: parseFloat(candle[7] as string),
          };
        }
      );

      setData(formattedData);

      // Calculate price change
      if (formattedData.length > 1) {
        const firstPrice = formattedData[0].price;
        const lastPriceVal = formattedData[formattedData.length - 1].price;
        setLastPrice(lastPriceVal);
        const change = ((lastPriceVal - firstPrice) / firstPrice) * 100;
        setPriceChange(change);
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(symbol);
    // Refresh every 5 minutes
    const interval = setInterval(() => {
      fetchMarketData(symbol);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [symbol]);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Live Market Candles</h3>
            <p className="text-sm text-muted-foreground">Real-time 1-hour data</p>
          </div>
          <div className="text-right animate-pulse-glow">
            {lastPrice && (
              <>
                <p className="text-2xl font-bold">
                  ${lastPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    priceChange >= 0 ? "text-profit" : "text-loss"
                  }`}
                >
                  {priceChange >= 0 ? "+" : ""}
                  {priceChange.toFixed(2)}%
                </p>
              </>
            )}
          </div>
        </div>

        {/* Symbol Selector */}
        <div className="flex gap-2 flex-wrap">
          {["BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT"].map((sym) => (
            <button
              key={sym}
              onClick={() => handleSymbolChange(sym)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                symbol === sym
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              {sym.replace("USDT", "")}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="w-full h-80 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-2">⚡</div>
            <p className="text-muted-foreground">Loading market data...</p>
          </div>
        </div>
      ) : data.length > 0 ? (
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--border))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [
                  `$${value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                fillOpacity={1}
                fill="url(#colorPrice)"
                isAnimationActive={true}
                animationDuration={500}
              />
              <Bar
                dataKey="volume"
                fill="hsl(var(--accent))"
                opacity={0.1}
                yAxisId="right"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="w-full h-80 flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
        <div className="animate-slide-in">
          <p className="text-muted-foreground">Data Source</p>
          <p className="font-semibold">Binance API</p>
        </div>
        <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-muted-foreground">Update Interval</p>
          <p className="font-semibold">5 minutes</p>
        </div>
        <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-muted-foreground">Timeframe</p>
          <p className="font-semibold">1 Hour</p>
        </div>
      </div>
    </div>
  );
}
