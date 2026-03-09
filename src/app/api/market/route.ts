import { NextResponse } from 'next/server';

// Simulated market data for demo purposes
// In production, you would connect to real APIs like CoinGecko, Binance, etc.

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  candles: Array<{
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    timestamp: number;
  }>;
}

// Generate realistic candlestick data based on current price
function generateCandleData(basePrice: number, volatility: number, count: number = 100) {
  const candles = [];
  let currentPrice = basePrice;

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5;
    const volume = Math.random() * 1000000 + 500000;

    candles.push({
      open: parseFloat(open.toFixed(8)),
      high: parseFloat(high.toFixed(8)),
      low: parseFloat(low.toFixed(8)),
      close: parseFloat(close.toFixed(8)),
      volume: parseFloat(volume.toFixed(2)),
      timestamp: Date.now() - (count - i) * 3600000 // Hourly candles
    });

    currentPrice = close;
  }

  return candles;
}

// Market pairs configuration
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const symbol = searchParams.get('symbol');

  try {
    // If specific symbol requested
    if (symbol) {
      const allPairs = [...marketPairs.crypto, ...marketPairs.forex, ...marketPairs.metals];
      const pair = allPairs.find(p => p.symbol === symbol);

      if (!pair) {
        return NextResponse.json({ error: 'Symbol not found' }, { status: 404 });
      }

      const candles = generateCandleData(pair.basePrice, pair.volatility);
      const lastCandle = candles[candles.length - 1];
      const firstCandle = candles[0];
      const change24h = ((lastCandle.close - firstCandle.close) / firstCandle.close) * 100;

      const data: MarketData = {
        symbol: pair.symbol,
        name: pair.name,
        price: lastCandle.close,
        change24h,
        candles
      };

      return NextResponse.json(data);
    }

    // Return all market data by category
    const result: Record<string, MarketData[]> = {};

    const categories = category === 'all'
      ? ['crypto', 'forex', 'metals']
      : [category];

    for (const cat of categories) {
      if (!marketPairs[cat as keyof typeof marketPairs]) continue;

      result[cat] = marketPairs[cat as keyof typeof marketPairs].map(pair => {
        const candles = generateCandleData(pair.basePrice, pair.volatility);
        const lastCandle = candles[candles.length - 1];
        const firstCandle = candles[0];
        const change24h = ((lastCandle.close - firstCandle.close) / firstCandle.close) * 100;

        return {
          symbol: pair.symbol,
          name: pair.name,
          price: lastCandle.close,
          change24h,
          candles
        };
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Market data error:', error);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
