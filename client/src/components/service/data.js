export const DEV_BASE_URL = 'http://localhost:3000/api'
export const PROD_BASE_URL = 'https://repulsive-puce-sombrero.cyclic.app/api'
export const BASE_URL = import.meta.env.VITE_GET_PROD_ENV ? DEV_BASE_URL : PROD_BASE_URL 