import api from '@/lib/axios';
import { Booking } from '@/types';

export interface CreateBookingDto {
    movieId: number;
    scheduleId?: string;
    date: string;
    time: string;
    seats: string[];
    totalPrice: number;
}

export const bookingService = {
    createBooking: async (bookingData: CreateBookingDto): Promise<Booking> => {
        const response = await api.post<Booking>('/bookings', bookingData);
        return response.data;
    },

    getMyBookings: async (): Promise<Booking[]> => {
        const response = await api.get<Booking[]>('/bookings/me');
        return response.data;
    },

    cancelBooking: async (id: string): Promise<void> => {
        await api.post(`/bookings/${id}/cancel`);
    },
};
