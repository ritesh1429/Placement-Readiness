// Central API base URL config
// In development: Vite proxy handles /api → localhost:5000
// In production:  VITE_API_URL points to the deployed backend
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
