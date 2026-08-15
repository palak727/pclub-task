export const validateRequiredFields = (fields, source = 'body') => (req, res, next) => {
  const payload = req[source] || {};
  const missing = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length) {
    return res.status(400).json({
      message: `Missing required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`,
    });
  }

  return next();
};

export const validateEmailBody = (req, res, next) => {
  const { email } = req.body || {};

  if (!email || !String(email).trim().endsWith('@iitk.ac.in')) {
    return res.status(400).json({ message: 'A valid @iitk.ac.in webmail is required.' });
  }

  return next();
};
