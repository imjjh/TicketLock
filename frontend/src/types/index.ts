export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface User {
    id: number;
    email: string;
    name: string;
    roles: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    email: string;
    password: string;
    name: string;
    role?: 'CUSTOMER' | 'ADMIN';
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface Movie {
    id: number;
    title: string;
    posterUrl: string;
    backdropUrl?: string;
    rating: number;
    genre: string;
    duration: number;
    description: string;
    director?: string;
    cast?: string[];
    releaseDate: string;
}

export interface Seat {
    id: string;
    row: string;
    col: number;
    status: 'available' | 'reserved' | 'selected' | 'locked';
    price: number;
}

export interface Booking {
    id: string;
    movie: Partial<Movie>;
    date: string;
    time: string;
    seats: string[];
    totalPrice: number;
    status: 'CONFIRMED' | 'CANCELLED';
    createdAt: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: 'SNACK' | 'DRINK' | 'COMBO';
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Coupon {
    id: number;
    code: string;
    name: string;
    discountAmount: number;
    discountType: 'PERCENT' | 'FIXED';
    validUntil: string;
    description: string;
    totalQuantity: number;
    remainingQuantity: number;
}
