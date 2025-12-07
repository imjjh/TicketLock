"use client";

import { useState } from 'react';
import { SeatMap } from '@/components/features/booking/SeatMap';
import { useBookingStore } from '@/store/useBookingStore';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BookingPage({ params }: { params: { id: string } }) {
    const [selectedDate, setSelectedDate] = useState<string>('2024-12-07');
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const { selectedSeats } = useBookingStore();

    // Mock Data
    const dates = [
        { date: '2024-12-07', day: '토' },
        { date: '2024-12-08', day: '일' },
        { date: '2024-12-09', day: '월' },
        { date: '2024-12-10', day: '화' },
        { date: '2024-12-11', day: '수' },
    ];

    const times = [
        { id: '1', time: '10:00', type: '2D', seats: 120 },
        { id: '2', time: '13:30', type: '2D', seats: 85 },
        { id: '3', time: '16:00', type: 'IMAX', seats: 42 },
        { id: '4', time: '19:30', type: 'IMAX', seats: 10 },
        { id: '5', time: '22:00', type: '2D', seats: 156 },
    ];

    return (
        <div className="min-h-screen pb-32">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">예매하기</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Schedule Selection */}
                    <div className="space-y-8">
                        {/* Date Selection */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" /> 날짜 선택
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                {dates.map((d) => (
                                    <button
                                        key={d.date}
                                        onClick={() => setSelectedDate(d.date)}
                                        className={cn(
                                            "flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-xl border transition-all",
                                            selectedDate === d.date
                                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                                : "bg-secondary border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <span className="text-sm">{d.date.split('-')[1]}.{d.date.split('-')[2]}</span>
                                        <span className="font-bold text-lg">{d.day}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Time Selection */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" /> 시간 선택
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {times.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTime(t.time)}
                                        className={cn(
                                            "p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                                            selectedTime === t.time
                                                ? "bg-white text-black border-white"
                                                : "bg-secondary border-border hover:border-primary/50"
                                        )}
                                    >
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xl font-bold tracking-tight">{t.time}</span>
                                            <span className={cn(
                                                "text-xs font-bold px-1.5 py-0.5 rounded",
                                                t.type === 'IMAX' ? "bg-blue-600 text-white" : "bg-gray-600 text-white"
                                            )}>{t.type}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                            {t.seats}석 남음
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Seat Selection */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold mb-4">좌석 선택</h2>
                        <div className="bg-black/20 rounded-2xl p-4 border border-border min-h-[500px] flex items-center justify-center">
                            {selectedTime ? (
                                <SeatMap />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>상영 시간을 먼저 선택해주세요.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Booking Summary Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border p-4 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="hidden md:block">
                            <p className="text-xs text-muted-foreground">선택한 영화</p>
                            <p className="font-bold text-lg">인터스텔라 Re-Mastering</p>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border"></div>
                        <div>
                            <p className="text-xs text-muted-foreground">일시</p>
                            <p className="font-bold">
                                {selectedDate} {selectedTime ? selectedTime : '--:--'}
                            </p>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border"></div>
                        <div>
                            <p className="text-xs text-muted-foreground">선택 좌석</p>
                            <p className="font-bold">
                                {selectedSeats.length > 0
                                    ? selectedSeats.map(s => s.id).join(', ')
                                    : '선택안함'}
                            </p>
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border"></div>
                        <div>
                            <p className="text-xs text-muted-foreground">총 결제금액</p>
                            <p className="font-bold text-xl text-primary">
                                {selectedSeats.reduce((acc, s) => acc + s.price, 0).toLocaleString()}원
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/booking/payment"
                        className={cn(
                            "px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2",
                            selectedSeats.length > 0 && selectedTime
                                ? "bg-primary text-white hover:bg-red-700 shadow-lg shadow-primary/20"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                        onClick={(e) => {
                            if (selectedSeats.length === 0 || !selectedTime) e.preventDefault();
                        }}
                    >
                        결제하기 <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
