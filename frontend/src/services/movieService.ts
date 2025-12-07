import api from '@/lib/axios';
import { Movie } from '@/types';

export interface MovieListResponse {
    data: Movie[];
    total: number;
    page: number;
}

export const movieService = {
    getMovies: async (page = 1, limit = 10): Promise<MovieListResponse> => {
        const response = await api.get<MovieListResponse>('/movies', {
            params: { page, limit },
        });
        return response.data;
    },

    getMovieById: async (id: number): Promise<Movie> => {
        const response = await api.get<Movie>(`/movies/${id}`);
        return response.data;
    },

    createMovie: async (movieData: Omit<Movie, 'id'>): Promise<Movie> => {
        const response = await api.post<Movie>('/movies', movieData);
        return response.data;
    },

    deleteMovie: async (id: number): Promise<void> => {
        await api.delete(`/movies/${id}`);
    },
};
