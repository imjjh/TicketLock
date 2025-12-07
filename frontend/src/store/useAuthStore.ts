import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, SignupCredentials } from '@/types';
import { authService } from '@/services/authService';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.login(credentials);
                    // 토큰은 쿠키로 설정되므로 로컬스토리지 저장 불필요
                    set({ user: response.user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
                    throw error;
                }
            },

            signup: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.signup(credentials);
                    // 토큰은 쿠키로 설정되므로 로컬스토리지 저장 불필요
                    const user = await authService.getMe();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    set({ error: error.response?.data?.message || 'Signup failed', isLoading: false });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    await authService.logout();
                } catch (error) {
                    console.error("Logout API failed, clearing local state anyway", error);
                }
                set({ user: null, isAuthenticated: false });
            },

            checkAuth: async () => {
                // 토큰 존재 여부를 로컬스토리지에서 확인하지 않고
                // 바로 API 호출하여 쿠키 유효성 검증
                set({ isLoading: true });
                try {
                    const user = await authService.getMe();
                    console.log("checkAuth: Success", user);
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error: any) {
                    console.error("checkAuth: Failed", error);
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
