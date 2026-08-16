import { randomBytes } from 'crypto';

export const generateAccountNumber = () => {
  return randomBytes(10).toString('hex').slice(0, 12).toUpperCase();
};

export const generateReference = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = randomBytes(8).toString('hex').toUpperCase();
  return `TXN-${dateStr}-${random}`;
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
