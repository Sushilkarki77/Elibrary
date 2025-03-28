import axios from 'axios';
import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'userToken';



interface LoginResponse {
  token: string;
}

interface ApiResponse<T> {
  data: T
}



const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error(axiosError.response.data);
      console.error(axiosError.response.status);
      console.error(axiosError.response.headers);
    } else if (axiosError.request) {
      console.error(axiosError.request);
    } else {
      console.error('Error', axiosError.message);
    }

    return Promise.reject(error);
  }
);

export const loginRequest = async (username: string, password: string): Promise<string> => {
  try {
    const response: AxiosResponse<LoginResponse> = await apiClient.post('/auth/login', { username, password });
    return response?.data?.token;
  } catch (error) {
    if (error instanceof AxiosError) {
      window.alert(error.response?.data.message)
      throw error
    } else {
      throw error;
    }
  }
};


export const getNavItems = async (): Promise<{ name: string, path: string }[]> => {
  const navItems: { name: string, path: string }[] = await getData('/general/nav-items');
  return navItems;
}

export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(endpoint);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw error;
    }
  }
};

export const postData = async <T>(endpoint: string, data: T): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(endpoint, data);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw error;
    }
  }
};
