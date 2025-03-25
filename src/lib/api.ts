
import { toast } from "sonner";

const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000/api' 
  : '/api';

export const fetchAPI = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    toast.error(message);
    console.error('API request failed:', error);
    throw error;
  }
};

// Helper methods for common API operations
export const api = {
  get: <T>(endpoint: string) => fetchAPI<T>(endpoint),
  
  post: <T>(endpoint: string, data: any) => fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: <T>(endpoint: string, data: any) => fetchAPI<T>(endpoint, {
    method: 'PUT', 
    body: JSON.stringify(data),
  }),
  
  delete: <T>(endpoint: string) => fetchAPI<T>(endpoint, {
    method: 'DELETE',
  }),
};
