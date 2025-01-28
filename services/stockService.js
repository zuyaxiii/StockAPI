import yahooFinance from 'yahoo-finance2';
import redisClient from '../config/redis.js';

export class StockService {
  static async getStockPrice(symbol) {
    const cacheKey = `stock:${symbol}`;
    
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    try {
      const quote = await yahooFinance.quote(symbol);
      const stockData = {
        symbol: quote.symbol,
        region : quote.region,
        price: quote.regularMarketPrice,
        currency: quote.currency,
        timestamp: new Date().toISOString(),
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent,
        dayHigh: quote.regularMarketDayHigh,
        dayLow: quote.regularMarketDayLow,
        volume: quote.regularMarketVolume
      };

      await redisClient.setEx(cacheKey, process.env.CACHE_TTL, JSON.stringify(stockData));
      return stockData;
    } catch (error) {
      throw new Error(`Failed to fetch stock data: ${error.message}`);
    }
  }

  static async getMultipleStockPrices(symbols) {
    return Promise.all(symbols.map(symbol => this.getStockPrice(symbol)));
  }
}