import { create } from 'zustand';
import { Movie } from '@/types';
import { movieService } from '@/services/movieService';

interface MovieState {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
    fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    isLoading: false,
    error: null,

    fetchMovies: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await movieService.getMovies();
            set({ movies: response.data || [], isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch movies', isLoading: false });
        }
    },
}));
