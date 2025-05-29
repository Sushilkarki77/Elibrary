import axios, { AxiosRequestConfig } from 'axios';
import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { Document, QuizQuestion, Subject, User } from '../interfaces/interfaces';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'userToken';
const MAX_RETRIES = 3;



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
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      delete config.headers['Content-Type'];
    }
    if (config.headers['Content-Type'] === 'application/pdf') {
      delete config.headers['Authorization']
    }
    return config;
  },
  (error: AxiosError) => {
    const axiosError = error as AxiosError;

    const config = error.config as AxiosRequestConfig & { _retryCount?: number };

    if (!config || (config._retryCount ?? 0) >= MAX_RETRIES) {
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

    config._retryCount = (config._retryCount ?? 0) + 1;

    console.warn(`Retrying request... Attempt ${config._retryCount}`);

    return apiClient(config);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/login';
      localStorage.removeItem(TOKEN_KEY);

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

      throw error
    } else {
      throw error;
    }
  }
};

export const fileUpload = async (uploadURL: string, formData: File): Promise<Document> => {
  const uploadedDoc: Document = await uploadFileRequest(uploadURL, formData, 'application/pdf');
  return uploadedDoc;
}

export const getPreSignedURL = async (filename: string, subjectId: string): Promise<Document & { uploadUrl: string }> => {
  const uploadApproval: Document & { uploadUrl: string } = await postData('documents/signed-url', { filename, documentLabel: filename, subjectId })
  return uploadApproval;
}


export const getNavItems = async (): Promise<{ name: string, path: string, icon: 'dashboard' | 'users' | 'search' | 'home' | 'folder' }[]> => {
  const navItems: { name: string, path: string, icon: 'dashboard' | 'users' | 'search' | 'home' | 'folder' }[] = await getData('/general/nav-items');
  return navItems;
}

export const getDocuments = async (): Promise<Document[]> => {
  const documents: Document[] = await getData('/documents');
  return documents;
}

export const deleteDocuments = async (documentId: string): Promise<{ message: string }> => {
  const documents: { message: string } = await deleteData(`/documents/${documentId}`);
  return documents;
}

export const addSubject = async (subject: { subjectName: string }): Promise<Subject> => {
  const addedSubject: Subject = await postData(`/subjects`, subject);
  return addedSubject;
}


export const getSubjects = async (): Promise<Subject[]> => {
  const subjects: Subject[] = await getData('/subjects');
  return subjects;
}

export const deleteSubjects = async (subjectId: string): Promise<{ message: string }> => {
  const subjects: { message: string } = await deleteData(`/subjects/${subjectId}`);
  return subjects;
}

export const getOriginalDocument = async (documentId: string): Promise<{ downloadURL: string }> => {
  const res: { downloadURL: string } = await getData(`/documents/download-url/${documentId}`);
  return res;
}


export const getDocumentSummary = async (documentId: string): Promise<{ summary: string }> => {
  const res: { summary: string } = await getData(`/documents/summary/${documentId}`);
  return res;
}

export const getDocumentQuiz = async (documentId: string): Promise<QuizQuestion[]> => {
  const documents: QuizQuestion[] = await getData(`/documents/quiz/${documentId}`);
  return documents;
}

export const deleteUsers = async (userId: string): Promise<{ message: string }> => {
  const documents: { message: string } = await deleteData(`/users/${userId}`);
  return documents;
}

export const registerUser = async (user: { username: string, password: string }): Promise<User> => {
  const addedUser: { user: User, message: string } = await postData(`/auth/register`, user);
  return addedUser.user;
}

export const inviteUser = async (user: { username: string }): Promise<User> => {
  const addedUser: { user: User, message: string } = await postData(`/auth/invite-user`, user);
  return addedUser.user;
}

export const getUsers = async (): Promise<User[]> => {
  const users: User[] = await getData(`/users`);
  return users;
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

export const postData = async <T, R = T>(endpoint: string, data: T): Promise<R> => {
  try {
    const response: AxiosResponse<ApiResponse<R>> = await apiClient.post(endpoint, data);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw error;
    }
  }
};

export const deleteData = async <T, R = T>(endpoint: string): Promise<R> => {
  try {
    const response: AxiosResponse<ApiResponse<R>> = await apiClient.delete(endpoint);
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw error;
    }
  }
};


export const uploadFileRequest = async <T, R = T>(endpoint: string, data: T, contenttype: string): Promise<R> => {
  try {
    const response: AxiosResponse<ApiResponse<R>> = await apiClient.put(endpoint, data, {
      headers: {
        'Content-Type': contenttype
      }
    });
    return response.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error
    } else {
      throw error;
    }
  }
}
