import fs from 'fs';
import path from 'path';
import { seedProducts } from '../data/seedProducts.js';

let memoryMode = false;

export const setMemoryMode = (mode) => {
  memoryMode = mode;
};

export const isMemoryMode = () => memoryMode;

// Use Vercel's writable /tmp directory in production, local path otherwise
const STORAGE_FILE = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', '.memory_store_data.json')
  : path.resolve('./.memory_store_data.json');

const loadPersistedData = () => {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load local memory store cache:', err.message);
  }
  return { users: [], products: [], messages: [] };
};

const buildSeedProductList = () =>
  seedProducts.map((product, index) => ({
    ...product,
    image: product.image || product.images?.[0] || '',
    images: Array.isArray(product.images) && product.images.length ? product.images : product.image ? [product.image] : [],
    createdAt: product.createdAt || new Date(Date.now() - (seedProducts.length - index) * 60 * 60 * 1000).toISOString(),
    updatedAt: product.updatedAt || new Date(Date.now() - (seedProducts.length - index) * 60 * 60 * 1000).toISOString(),
  }));

export const reloadSeedProducts = () => {
  const hydrated = buildSeedProductList();
  memoryStore.products = hydrated;
  memoryStore.save();
  return hydrated;
};

const initialCache = loadPersistedData();

export const memoryStore = {
  users: initialCache.users || [],
  products: buildSeedProductList(),
  messages: initialCache.messages || [],
  otps: new Map(),

  save() {
    try {
      fs.writeFileSync(
        STORAGE_FILE,
        JSON.stringify(
          {
            users: this.users,
            products: this.products,
            messages: this.messages,
          },
          null,
          2
        )
      );
    } catch (err) {
      console.error('Failed to persist memory store to disk:', err.message);
    }
  }
};

reloadSeedProducts();