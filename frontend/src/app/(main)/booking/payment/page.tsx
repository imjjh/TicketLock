"use client";

import { useBookingStore } from '@/store/useBookingStore';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage() {
    const { selectedSeats } = useBookingStore();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            alert("결제가 완료되었습니다!");
            router.push('/mypage');
        }, 2000);
    };

    return (
        <div className="min-h-screen py-12 container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">결제하기</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Payment Methods */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-secondary/30 p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-6">결제 수단 선택</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="flex items-center gap-4 p-6 rounded-xl border border-primary bg-primary/10 text-primary transition-all">
                                <CreditCard className="w-8 h-8" />
                                <div className="text-left">
                                    <p className="font-bold">신용/체크카드</p>
                                    <p className="text-sm opacity-80">모든 카드 지원</p>
                                </div>
                                <CheckCircle className="w-6 h-6 ml-auto" />
                            </button>

                            <button className="flex items-center gap-4 p-6 rounded-xl border border-border bg-background hover:bg-secondary transition-all opacity-50 cursor-not-allowed">
                                <Smartphone className="w-8 h-8" />
                                <div className="text-left">
                                    <p className="font-bold">간편결제</p>
                                    <p className="text-sm opacity-80">카카오페이, 네이버페이</p>
                                </div>
                            </button>
                        </div>
                    </section>

                    <section className="bg-secondary/30 p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-4">할인 적용</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="쿠폰 번호 입력"
                                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="px-6 py-3 bg-secondary hover:bg-muted font-bold rounded-lg transition-colors">
                                적용
                            </button>
                        </div>
                    </section>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white text-black p-6 rounded-xl shadow-xl sticky top-24">
                        <h2 className="text-xl font-bold mb-6 border-b border-gray-200 pb-4">결제 정보</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-600">영화</span>
                                <span className="font-bold text-right">인터스텔라<br />Re-Mastering</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">일시</span>
                                <span className="font-bold">2024.12.07 19:30</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">좌석</span>
                                <span className="font-bold">
                                    {selectedSeats.map(s => s.id).join(', ')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">인원</span>
                                <span className="font-bold">성인 {selectedSeats.length}명</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">총 결제금액</span>
                                <span className="text-2xl font-bold text-red-600">
                                    {totalPrice.toLocaleString()}원
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isProcessing ? '처리중...' : '결제하기'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
