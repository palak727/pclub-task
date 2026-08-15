import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Hardcode localhost so requests hit local server reliably
  return 'http://localhost:5000/api';
};

const API_BASE = getBaseUrl();

// Create an Axios instance with standard defaults
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10s timeout to prevent infinite hanging
});

export const CATEGORIES = [
  { slug: 'coolers', label: 'Coolers', icon: 'Wind', path: '/category/coolers' },
  { slug: 'mattresses', label: 'Mattresses', icon: 'Bed', path: '/category/mattresses' },
  { slug: 'cycles', label: 'Cycles', icon: 'Bike', path: '/category/cycles' },
  { slug: 'academics', label: 'Academics & Books', icon: 'BookOpen', path: '/category/academics' },
  { slug: 'appliances', label: 'Appliances', icon: 'Tv', path: '/category/appliances' },
];

export const HALLS = [
  'Hall 1', 'Hall 2', 'Hall 3', 'Hall 4', 'Hall 5',
  'Hall 7', 'Hall 8', 'Hall 9', 'Hall 10', 'Hall 11',
  'Hall 12', 'Hall 13', 'Hall 14', 'GH1', 'GH2',
  'CWS', 'RA Tower', 'SBRA',
];

export const CONDITIONS = ['Brand New', 'Barely Used', 'Heavily Used'];

export const api = {
  get: async (endpoint, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await apiClient.get(endpoint, { headers });
    return res.data;
  },

  post: async (endpoint, body, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await apiClient.post(endpoint, body, { headers });
    return res.data;
  },

  patch: async (endpoint, body, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await apiClient.patch(endpoint, body, { headers });
    return res.data;
  },

  delete: async (endpoint, token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await apiClient.delete(endpoint, { headers });
    return res.data;
  },

  upload: async (file, token) => {
    const formData = new FormData();
    formData.append('image', file);
    const headers = {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await apiClient.post('/products/upload', formData, { headers });
    return res.data.url;
  },
};

export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const getProductId = (product) => {
  if (!product) return '';
  return product._id || product.id || '';
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'available':
      return { label: 'Available', className: 'bg-emerald-100 text-emerald-800 border border-emerald-300' };
    case 'reserved':
      return { label: 'Reserved (24h)', className: 'bg-amber-100 text-amber-800 border border-amber-300' };
    case 'sold':
      return { label: 'Sold Out', className: 'bg-rose-100 text-rose-800 border border-rose-300' };
    default:
      return { label: status, className: 'bg-slate-100 text-slate-800' };
  }
};