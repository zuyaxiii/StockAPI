import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadConfig = () => {
  try {
    const configPath = join(__dirname, 'config.json');
    const configFile = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configFile);
  } catch (error) {

    return {
      port: process.env.PORT || 3000,
      redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
      cacheTTL: process.env.CACHE_TTL || 300
    };
  }
};

export const config = loadConfig();