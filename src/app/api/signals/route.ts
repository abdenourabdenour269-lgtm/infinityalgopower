import { NextResponse } from 'next/server';
import { generateSignal, Candle } from '@/lib/technical-analysis';

// Market pairs configuration (same as market API)
const marketPairs = {
  crypto: [
    { symbol: 'BTC/USDT', name: 'Bitcoin', basePrice: 67500, volatility: 0.03 },
    { symbol: 'ETH/USDT', name: 'Ethereum', basePrice: 3450, volatility: 0.04 },
    { symbol: 'XRP/USDT', name: 'Ripple', basePrice: 0.52, volatility: 0.05 },
    { symbol: 'SOL/USDT', name: 'Solana', basePrice: 142, volatility: 0.06 },
    { symbol: 'BNB/USDT', name: 'Binance Coin', basePrice: 580, volatility: 0.04 },
  ],
  forex: [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', basePrice: 1.0850, volatility: 0.002 },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', basePrice: 1.2650, volatility: 0.003 },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', basePrice: 149.50, volatility: 0.002 },
    { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar', basePrice: 0.6550, volatility: 0.003 },
  ],
  metals: [
    { symbol: 'XAU/USD', name: 'Gold', basePrice: 2330, volatility: 0.01 },
    { symbol: 'XAG/USD', name: 'Silver', basePrice: 27.50, volatility: 0.02 },
  ]
};

// Timeframes configuration
const timeframes = [
  { name: '15M', candles: 100, multiplier: 900000 },    // 15 minutes
  { name: '1H', candles: 100, multiplier: 3600000 },    // 1 hour
  { name: '4H', candles: 100, multiplier: 14400000 },   // 4 hours
  { name: '1D', candles: 100, multiplier: 86400000 },   // 1 day
];

// Generate realistic candlestick data
function generateCandleData(basePrice: number, volatility: number, count: number = 100): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice;

  // Add some trend bias
  const trendBias = (Math.random() - 0.5) * 0.001;

  for (let i = 0; i < count; i++) {
    const trendEffect = trendBias * currentPrice;
    const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
    const change = randomChange + trendEffect;

    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.3;
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.3;
    const volume = Math.random() * 1000000 + 500000;

    candles.push({
      open: parseFloat(open.toFixed(8)),
      high: parseFloat(high.toFixed(8)),
      low: parseFloat(low.toFixed(8)),
      close: parseFloat(close.toFixed(8)),
      volume: parseFloat(volume.toFixed(2)),
      timestamp: Date.now() - (count - i) * 3600000
    });

    currentPrice = close;
  }

  return candles;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const symbol = searchParams.get('symbol');
  const timeframe = searchParams.get('timeframe') || '1H';

  try {
    const signals: any[] = [];

    // Determine which categories to analyze
    const categories = category === 'all'
      ? ['crypto', 'forex', 'metals']
      : [category];

    // Find the timeframe config
    const tfConfig = timeframes.find(tf => tf.name === timeframe) || timeframes[1];

    // Analyze each pair
    for (const cat of categories) {
      const pairs = marketPairs[cat as keyof typeof marketPairs];
      if (!pairs) continue;

      for (const pair of pairs) {
        // Skip if specific symbol requested and doesn't match
        if (symbol && pair.symbol !== symbol) continue;

        // Generate candle data
        const candles = generateCandleData(pair.basePrice, pair.volatility, tfConfig.candles);

        // Generate signal using technical analysis
        const signal = generateSignal(pair.symbol, tfConfig.name, candles);

        if (signal) {
          signals.push({
            ...signal,
            category: cat,
            name: pair.name,
            currentPrice: candles[candles.length - 1].close
          });
        }
      }
    }

    // Sort by probability (highest first)
    signals.sort((a, b) => b.probability - a.probability);

    // Add market overview
    const overview = {
      totalSignals: signals.length,
      buySignals: signals.filter(s => s.direction === 'BUY').length,
      sellSignals: signals.filter(s => s.direction === 'SELL').length,
      avgProbability: signals.length > 0
        ? Math.round(signals.reduce((a, b) => a + b.probability, 0) / signals.length)
        : 0,
      timestamp: Date.now()
    };

    return NextResponse.json({
      success: true,
      overview,
      timeframe: tfConfig.name,
      signals
    });

  } catch (error) {
    console.error('Signals API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate signals'
    }, { status: 500 });
  }
}
