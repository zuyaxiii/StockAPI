import { createClient } from 'redis';
import { config } from './config.js';

const redisClient = createClient({
  url: config.redisUrl
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.connect();

export default redisClient;