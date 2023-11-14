export const VITE_URL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_URL_PROD || 'https://employeems-server-production.up.railway.app'
        : import.meta.env.VITE_URL_DEV || 'http://localhost:3000';
