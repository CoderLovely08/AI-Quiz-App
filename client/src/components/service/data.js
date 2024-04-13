export const DEV_BASE_URL = 'http://localhost:3000/api'
// export const PROD_BASE_URL = "https://ai-quiz-app-api-service.onrender.com/api";
export const PROD_BASE_URL = "https://ai-quiz-app-344f9b03bd85.herokuapp.com/api";
export const BASE_URL = (import.meta.env.VITE_GET_PROD_ENV == 'true') ? PROD_BASE_URL : DEV_BASE_URL 