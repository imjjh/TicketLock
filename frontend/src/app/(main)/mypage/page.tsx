"use client";

import { useState } from 'react';
import { User, Ticket, ShoppingBag, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MyPage() {
    const [activeTab, setActiveTab] = useState<'BOOKING' | 'ORDER'>('BOOKING');

    return (
        <div className="min-h-screen container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Profile */}
                <div className="lg:col-span-1">
                    <div className="bg-secondary/30 rounded-xl border border-border p-6 text-center sticky top-24">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                            J
                        </div>
                        <h2 className="text-xl font-bold mb-1">Junho Kim</h2>
                        <p className="text-sm text-muted-foreground mb-6">junho@example.com</p>

                        <div className="space-y-2">
                            <button className="w-full py-2 px-4 rounded-lg bg-secondary hover:bg-muted transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                프로필 수정
                            </button>
                            <button className="w-full py-2 px-4 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                <LogOut className="w-4 h-4" /> 로그아웃
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-border mb-8">
                        <button
                            onClick={() => setActiveTab('BOOKING')}
                            className={cn(
                                "pb-4 text-lg font-bold transition-colors relative",
                                activeTab === 'BOOKING' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <span className="flex items-center gap-2"><Ticket className="w-5 h-5" /> 예매 내역</span>
                            {activeTab === 'BOOKING' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>}
                        </button>
                        <button
                            onClick={() => setActiveTab('ORDER')}
                            className={cn(
                                "pb-4 text-lg font-bold transition-colors relative",
                                activeTab === 'ORDER' ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <span className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> 주문 내역</span>
                            {activeTab === 'ORDER' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>}
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-6">
                        {activeTab === 'BOOKING' ? (
                            // Booking List Mock
                            [1, 2].map((i) => (
                                <div key={i} className="bg-secondary/20 rounded-xl border border-border p-6 flex flex-col md:flex-row gap-6">
                                    <div className="w-full md:w-32 aspect-[2/3] bg-muted rounded-lg overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop" alt="Poster" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold">인터스텔라 Re-Mastering</h3>
                                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">예매완료</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-muted-foreground mb-4">
                                            <p>2024.12.07 (토) 19:30</p>
                                            <p>강남점 3관 (IMAX)</p>
                                            <p>성인 2명 (F13, F14)</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-secondary hover:bg-muted rounded-lg text-sm font-bold transition-colors">
                                                모바일 티켓
                                            </button>
                                            <button className="px-4 py-2 border border-border hover:bg-secondary rounded-lg text-sm font-bold transition-colors">
                                                예매 취소
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Order List Mock
                            <div className="text-center py-20 text-muted-foreground">
                                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>최근 주문 내역이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
