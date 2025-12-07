import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking, Seat } from '@/types';
import { bookingService, CreateBookingDto } from '@/services/bookingService';

interface BookingState {
    // Seat Selection State
    selectedSeats: Seat[];
    maxSelectable: number;
    selectSeat: (seat: Seat) => void;
    deselectSeat: (seatId: string) => void;
    clearSelection: () => void;
    setMaxSelectable: (count: number) => void;

    // Booking Data & API Actions
    bookings: Booking[];
    isLoading: boolean;
    error: string | null;
    fetchBookings: () => Promise<void>;
    addBooking: (bookingData: CreateBookingDto) => Promise<void>;
    cancelBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            // Seat Selection Logic
            selectedSeats: [],
            maxSelectable: 8,

            selectSeat: (seat) => {
                const { selectedSeats, maxSelectable } = get();
                if (selectedSeats.find((s) => s.id === seat.id)) return;
                if (selectedSeats.length >= maxSelectable) return;
                set({ selectedSeats: [...selectedSeats, seat] });
            },

            deselectSeat: (seatId) => {
                set((state) => ({
                    selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
                }));
            },

            clearSelection: () => set({ selectedSeats: [] }),

            setMaxSelectable: (count) => set({ maxSelectable: count }),

            // API Logic
            bookings: [],
            isLoading: false,
            error: null,

            fetchBookings: async () => {
                set({ isLoading: true, error: null });
                try {
                    const bookings = await bookingService.getMyBookings();
                    set({ bookings, isLoading: false });
                } catch (error: any) {
                    set({ error: error.message || 'Failed to fetch bookings', isLoading: false });
                }
            },

            addBooking: async (bookingData) => {
                set({ isLoading: true, error: null });
                try {
                    const newBooking = await bookingService.createBooking(bookingData);
                    set((state) => ({
                        bookings: [...state.bookings, newBooking],
                        isLoading: false,
                        selectedSeats: [], // Clear selection after successful booking
                    }));
                } catch (error: any) {
                    set({ error: error.message || 'Failed to create booking', isLoading: false });
                    throw error;
                }
            },

            cancelBooking: async (id) => {
                set({ isLoading: true, error: null });
                try {
                    await bookingService.cancelBooking(id);
                    set((state) => ({
                        bookings: state.bookings.map((b) =>
                            b.id === id ? { ...b, status: 'CANCELLED' } : b
                        ),
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({ error: error.message || 'Failed to cancel booking', isLoading: false });
                    throw error;
                }
            },
        }),
        {
            name: 'booking-storage',
            partialize: (state) => ({ bookings: state.bookings, selectedSeats: state.selectedSeats }),
        }
    )
);
