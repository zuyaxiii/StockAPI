import { StockService } from '../services/stockService.js';

export class StockController {
  static async getStockPrice(req, res, next) {
    try {
      const { symbol } = req.params;
      const stockData = await StockService.getStockPrice(symbol.toUpperCase());
      res.json(stockData);
    } catch (error) {
      next(error);
    }
  }

  static async getMultipleStockPrices(req, res, next) {
    try {
      const { symbols } = req.query;
      if (!symbols) {
        return res.status(400).json({ error: 'Symbols parameter is required' });
      }

      const symbolsArray = symbols.split(',').map(s => s.trim().toUpperCase());
      const stocksData = await StockService.getMultipleStockPrices(symbolsArray);
      res.json(stocksData);
    } catch (error) {
      next(error);
    }
  }
}