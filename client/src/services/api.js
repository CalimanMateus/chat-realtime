import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
    
    // Configurar axios
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor para adicionar token
    this.api.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async register(username, password) {
    try {
      const response = await this.api.post('/register', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro no registro' };
    }
  }

  async login(username, password) {
    try {
      const response = await this.api.post('/login', {
        username,
        password
      });
      
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro no login' };
    }
  }

  async getProfile() {
    try {
      const response = await this.api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar perfil' };
    }
  }

  getToken() {
    return this.token;
  }

  isAuth() {
    return !!this.token;
  }
}

export default new ApiService();
