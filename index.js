import express from 'express';
import { StockController } from './controllers/stockController.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/config.js';

const app = express();
const port = config.port;

app.use(express.json());

app.get('/api/stocks/:symbol', StockController.getStockPrice);
app.get('/api/stocks', StockController.getMultipleStockPrices);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});