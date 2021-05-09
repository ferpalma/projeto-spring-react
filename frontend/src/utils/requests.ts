export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
// ?? operador de valor nulo, ele pega a variável definida no Netlify REACT_APP_BACKEND_URL, se
// não estiver definida ele pega a URL local - 'http://localhost:8080'