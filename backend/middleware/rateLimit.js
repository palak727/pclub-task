const windowMs = 60 * 1000;
const maxRequests = 200;
const requests = new Map();

export const rateLimitMiddleware = (req, res, next) => {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const entry = requests.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  requests.set(key, entry);

  if (entry.count > maxRequests) {
    return res.status(429).json({ message: 'Too many requests. Please try again shortly.' });
  }

  return next();
};
