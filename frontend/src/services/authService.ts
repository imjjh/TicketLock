import api from '@/lib/axios';
import { LoginCredentials, SignupCredentials, User, AuthResponse, ApiResponse } from '@/types';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/signup', credentials);
        return response.data;
    },

    getMe: async (): Promise<User> => {
        const response = await api.get<ApiResponse<User>>('/auth/me');
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },
};
