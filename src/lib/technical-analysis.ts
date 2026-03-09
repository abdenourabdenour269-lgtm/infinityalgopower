/**
 * Technical Analysis Engine
 * Calculates RSI, MACD, Support/Resistance, and generates trading signals
 */

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
}

export interface IndicatorValues {
  rsi: number;
  rsiSignal: 'overbought' | 'oversold' | 'neutral';
  macd: { macd: number; signal: number; histogram: number };
  macdSignal: 'bullish' | 'bearish' | 'neutral';
  sma20: number;
  sma50: number;
  ema12: number;
  ema26: number;
  trend: 'bullish' | 'bearish' | 'sideways';
  support: number[];
  resistance: number[];
  atr: number;
}

export interface TradeSignal {
  pair: string;
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
  timestamp: number;
}

/**
 * Calculate RSI (Relative Strength Index)
 */
export function calculateRSI(closes: number[], period: number = 14): number {
  if (closes.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = closes.length - period; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

/**
 * Calculate EMA (Exponential Moving Average)
 */
export function calculateEMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0;

  const multiplier = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
}

/**
 * Calculate SMA (Simple Moving Average)
 */
export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0;
  const relevantPrices = prices.slice(-period);
  return relevantPrices.reduce((a, b) => a + b, 0) / period;
}

/**
 * Calculate MACD
 */
export function calculateMACD(closes: number[]): { macd: number; signal: number; histogram: number } {
  if (closes.length < 26) {
    return { macd: 0, signal: 0, histogram: 0 };
  }

  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const macd = ema12 - ema26;

  // Calculate MACD line for signal
  const macdLine: number[] = [];
  for (let i = 26; i <= closes.length; i++) {
    const e12 = calculateEMA(closes.slice(0, i), 12);
    const e26 = calculateEMA(closes.slice(0, i), 26);
    macdLine.push(e12 - e26);
  }

  const signal = macdLine.length >= 9 ? calculateEMA(macdLine, 9) : macd;
  const histogram = macd - signal;

  return { macd, signal, histogram };
}

/**
 * Calculate ATR (Average True Range)
 */
export function calculateATR(candles: Candle[], period: number = 14): number {
  if (candles.length < period + 1) return 0;

  const trueRanges: number[] = [];

  for (let i = 1; i < candles.length; i++) {
    const high = candles[i].high;
    const low = candles[i].low;
    const prevClose = candles[i - 1].close;

    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    trueRanges.push(tr);
  }

  const recentTR = trueRanges.slice(-period);
  return recentTR.reduce((a, b) => a + b, 0) / period;
}

/**
 * Find Support and Resistance levels
 */
export function findSupportResistance(candles: Candle[]): { support: number[]; resistance: number[] } {
  const support: number[] = [];
  const resistance: number[] = [];

  if (candles.length < 20) {
    return { support: [], resistance: [] };
  }

  const recentCandles = candles.slice(-50);

  for (let i = 2; i < recentCandles.length - 2; i++) {
    const candle = recentCandles[i];

    // Check for local low (support)
    if (
      candle.low < recentCandles[i - 1].low &&
      candle.low < recentCandles[i - 2].low &&
      candle.low < recentCandles[i + 1].low &&
      candle.low < recentCandles[i + 2].low
    ) {
      support.push(candle.low);
    }

    // Check for local high (resistance)
    if (
      candle.high > recentCandles[i - 1].high &&
      candle.high > recentCandles[i - 2].high &&
      candle.high > recentCandles[i + 1].high &&
      candle.high > recentCandles[i + 2].high
    ) {
      resistance.push(candle.high);
    }
  }

  // Sort and remove duplicates
  const uniqueSupport = [...new Set(support)].sort((a, b) => b - a).slice(0, 3);
  const uniqueResistance = [...new Set(resistance)].sort((a, b) => a - b).slice(0, 3);

  return { support: uniqueSupport, resistance: uniqueResistance };
}

/**
 * Determine trend based on moving averages and price action
 */
export function determineTrend(closes: number[], sma20: number, sma50: number): 'bullish' | 'bearish' | 'sideways' {
  const currentPrice = closes[closes.length - 1];
  const prevPrice = closes[closes.length - 5];

  // Strong bullish: price above both MAs and MAs are rising
  if (currentPrice > sma20 && sma20 > sma50 && currentPrice > prevPrice) {
    return 'bullish';
  }

  // Strong bearish: price below both MAs and MAs are falling
  if (currentPrice < sma20 && sma20 < sma50 && currentPrice < prevPrice) {
    return 'bearish';
  }

  return 'sideways';
}

/**
 * Calculate all indicators
 */
export function calculateIndicators(candles: Candle[]): IndicatorValues {
  const closes = candles.map(c => c.close);

  const rsi = calculateRSI(closes);
  const macd = calculateMACD(closes);
  const sma20 = calculateSMA(closes, 20);
  const sma50 = calculateSMA(closes, 50);
  const ema12 = calculateEMA(closes, 12);
  const ema26 = calculateEMA(closes, 26);
  const atr = calculateATR(candles);
  const { support, resistance } = findSupportResistance(candles);
  const trend = determineTrend(closes, sma20, sma50);

  // RSI Signal
  let rsiSignal: 'overbought' | 'oversold' | 'neutral' = 'neutral';
  if (rsi > 70) rsiSignal = 'overbought';
  else if (rsi < 30) rsiSignal = 'oversold';

  // MACD Signal
  let macdSignal: 'bullish' | 'bearish' | 'neutral' = 'neutral';
  if (macd.histogram > 0 && macd.macd > macd.signal) macdSignal = 'bullish';
  else if (macd.histogram < 0 && macd.macd < macd.signal) macdSignal = 'bearish';

  return {
    rsi,
    rsiSignal,
    macd,
    macdSignal,
    sma20,
    sma50,
    ema12,
    ema26,
    trend,
    support,
    resistance,
    atr
  };
}

/**
 * Generate trading signal based on technical analysis
 */
export function generateSignal(
  pair: string,
  timeframe: string,
  candles: Candle[]
): TradeSignal | null {
  if (candles.length < 50) {
    return null;
  }

  const indicators = calculateIndicators(candles);
  const currentPrice = candles[candles.length - 1].close;

  // Count bullish and bearish signals
  let bullishCount = 0;
  let bearishCount = 0;
  const reasons: string[] = [];

  // RSI Analysis
  if (indicators.rsiSignal === 'oversold') {
    bullishCount += 2;
    reasons.push(`RSI oversold (${indicators.rsi.toFixed(1)})`);
  } else if (indicators.rsiSignal === 'overbought') {
    bearishCount += 2;
    reasons.push(`RSI overbought (${indicators.rsi.toFixed(1)})`);
  }

  // MACD Analysis
  if (indicators.macdSignal === 'bullish') {
    bullishCount += 2;
    reasons.push('MACD bullish crossover');
  } else if (indicators.macdSignal === 'bearish') {
    bearishCount += 2;
    reasons.push('MACD bearish crossover');
  }

  // Trend Analysis
  if (indicators.trend === 'bullish') {
    bullishCount += 1;
    reasons.push('Uptrend confirmed');
  } else if (indicators.trend === 'bearish') {
    bearishCount += 1;
    reasons.push('Downtrend confirmed');
  }

  // Support/Resistance bounce
  if (indicators.support.length > 0) {
    const nearestSupport = indicators.support[0];
    const distanceToSupport = ((currentPrice - nearestSupport) / currentPrice) * 100;
    if (distanceToSupport < 2 && distanceToSupport > -0.5) {
      bullishCount += 1;
      reasons.push('Price at support level');
    }
  }

  if (indicators.resistance.length > 0) {
    const nearestResistance = indicators.resistance[0];
    const distanceToResistance = ((nearestResistance - currentPrice) / currentPrice) * 100;
    if (distanceToResistance < 2 && distanceToResistance > -0.5) {
      bearishCount += 1;
      reasons.push('Price at resistance level');
    }
  }

  // Calculate probability
  const totalSignals = bullishCount + bearishCount;
  if (totalSignals === 0) return null;

  const direction: 'BUY' | 'SELL' = bullishCount > bearishCount ? 'BUY' : 'SELL';
  const probability = Math.round(((direction === 'BUY' ? bullishCount : bearishCount) / Math.max(totalSignals, 5)) * 100);

  // Only generate signal if probability > 70%
  if (probability < 70) {
    return null;
  }

  // Calculate entry, stop loss, and take profit
  const atr = indicators.atr || currentPrice * 0.01;

  let entryPrice = currentPrice;
  let stopLoss: number;
  let takeProfit1: number;
  let takeProfit2: number;

  if (direction === 'BUY') {
    stopLoss = currentPrice - (atr * 1.5);
    takeProfit1 = currentPrice + (atr * 2);
    takeProfit2 = currentPrice + (atr * 3);
  } else {
    stopLoss = currentPrice + (atr * 1.5);
    takeProfit1 = currentPrice - (atr * 2);
    takeProfit2 = currentPrice - (atr * 3);
  }

  // Determine risk level
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (probability >= 85) riskLevel = 'Low';
  else if (probability < 75) riskLevel = 'High';

  // Build analysis text
  const analysis = reasons.join('. ') + `. Probability: ${probability}%.`;

  return {
    pair,
    timeframe,
    trend: indicators.trend.charAt(0).toUpperCase() + indicators.trend.slice(1),
    entryPrice,
    stopLoss,
    takeProfit1,
    takeProfit2,
    riskLevel,
    probability,
    analysis,
    direction,
    timestamp: Date.now()
  };
}
