'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Clock,
  Target,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Activity
} from 'lucide-react'

interface Signal {
  pair: string;
  name: string;
  category: string;
  timeframe: string;
  trend: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  probability: number;
  analysis: string;
  direction: 'BUY' | 'SELL';
  currentPrice: number;
  timestamp: number;
}

interface SignalsData {
  success: boolean;
  overview: {
    totalSignals: number;
    buySignals: number;
    sellSignals: number;
    avgProbability: number;
    timestamp: number;
  };
  timeframe: string;
  signals: Signal[];
}

const timeframes = ['15M', '1H', '4H', '1D'];

export function SignalsSection() {
  const [signals, setSignals] = useState<SignalsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchSignals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/signals?timeframe=${selectedTimeframe}&category=${selectedCategory}`);
      const data = await response.json();
      setSignals(data);
    } catch (err) {
      setError('Failed to fetch signals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSignals, 300000);
    return () => clearInterval(interval);
  }, [selectedTimeframe, selectedCategory]);

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toFixed(2);
    if (price >= 1) return price.toFixed(4);
    return price.toFixed(6);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crypto': return '₿';
      case 'forex': return '💱';
      case 'metals': return '🥇';
      default: return '📊';
    }
  };

  return (
    <section className="py-20 bg-trading-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
            <Activity className="w-3 h-3 ml-1" />
            AI Trading Signals
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Live </span>
            <span className="text-gold-gradient">Trading Signals</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            High-probability signals powered by technical analysis (RSI, MACD, Support/Resistance)
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-amber-500/10">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTimeframe === tf
                    ? 'bg-amber-500 text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-amber-500/10">
            {['all', 'crypto', 'forex', 'metals'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSignals}
            disabled={loading}
            className="btn-outline-gold"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Overview Stats */}
        {signals?.overview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-card/50 rounded-xl p-4 border border-amber-500/10 text-center">
              <div className="text-2xl font-bold text-gold-gradient">{signals.overview.totalSignals}</div>
              <div className="text-sm text-muted-foreground">Total Signals</div>
            </div>
            <div className="bg-card/50 rounded-xl p-4 border border-emerald-500/10 text-center">
              <div className="text-2xl font-bold text-emerald-400">{signals.overview.buySignals}</div>
              <div className="text-sm text-muted-foreground">Buy Signals</div>
            </div>
            <div className="bg-card/50 rounded-xl p-4 border border-rose-500/10 text-center">
              <div className="text-2xl font-bold text-rose-400">{signals.overview.sellSignals}</div>
              <div className="text-sm text-muted-foreground">Sell Signals</div>
            </div>
            <div className="bg-card/50 rounded-xl p-4 border border-purple-500/10 text-center">
              <div className="text-2xl font-bold text-purple-400">{signals.overview.avgProbability}%</div>
              <div className="text-sm text-muted-foreground">Avg Probability</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
            <span className="ml-3 text-muted-foreground">Analyzing markets...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchSignals} className="btn-gold mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* No Signals */}
        {!loading && !error && signals?.signals.length === 0 && (
          <div className="text-center py-12 bg-card/30 rounded-2xl border border-amber-500/10">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No trade opportunities at the moment.</p>
            <p className="text-muted-foreground text-sm mt-2">Market conditions are unclear. Check back later.</p>
          </div>
        )}

        {/* Signals Grid */}
        {!loading && !error && signals?.signals && signals.signals.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signals.signals.map((signal, index) => (
              <Card
                key={`${signal.pair}-${signal.timestamp}-${index}`}
                className="card-hover bg-card/50 backdrop-blur-sm border-amber-500/10 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(signal.category)}</span>
                      <div>
                        <CardTitle className="text-lg font-bold">{signal.pair}</CardTitle>
                        <p className="text-xs text-muted-foreground">{signal.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${signal.direction === 'BUY' ? 'bg-emerald-500' : 'bg-rose-500'} text-white`}>
                        {signal.direction === 'BUY' ? (
                          <ChevronUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        )}
                        {signal.direction}
                      </Badge>
                      <Badge className={`${getRiskColor(signal.riskLevel)} text-white text-xs`}>
                        {signal.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Probability Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="text-amber-400 font-semibold">{signal.probability}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all"
                        style={{ width: `${signal.probability}%` }}
                      />
                    </div>
                  </div>

                  {/* Price Levels */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-background/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-xs mb-1">Entry</div>
                      <div className="font-semibold text-foreground">{formatPrice(signal.entryPrice)}</div>
                    </div>
                    <div className="bg-rose-500/10 rounded-lg p-3">
                      <div className="text-rose-400 text-xs mb-1">Stop Loss</div>
                      <div className="font-semibold text-rose-400">{formatPrice(signal.stopLoss)}</div>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-3">
                      <div className="text-emerald-400 text-xs mb-1">Take Profit 1</div>
                      <div className="font-semibold text-emerald-400">{formatPrice(signal.takeProfit1)}</div>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-3">
                      <div className="text-emerald-400 text-xs mb-1">Take Profit 2</div>
                      <div className="font-semibold text-emerald-400">{formatPrice(signal.takeProfit2)}</div>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-background/30 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Analysis</div>
                    <p className="text-sm text-foreground">{signal.analysis}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-amber-500/10">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(signal.timestamp)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {signal.timeframe}
                    </div>
                    <div className="flex items-center gap-1">
                      {signal.trend === 'Bullish' ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : signal.trend === 'Bearish' ? (
                        <TrendingDown className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Activity className="w-3 h-3" />
                      )}
                      {signal.trend}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            ⚠️ Trading involves substantial risk of loss. Past performance is not indicative of future results.
            Always do your own research and never trade with money you cannot afford to lose.
          </p>
        </div>
      </div>
    </section>
  );
}
