"use client";

import { useState } from "react";
import { Timer, Ticket, ShoppingBag, Zap } from "lucide-react";

export default function EventPage() {
    const [coupons, setCoupons] = useState([
        {
            id: 1,
            title: "[MOCK] 선착순 50% 할인 쿠폰",
            description: "매일 오후 1시, 선착순 100명에게만 드리는 혜택!",
            total: 100,
            remaining: 5,
            status: "ACTIVE", // ACTIVE, UPCOMING, ENDED
        },
        {
            id: 2,
            title: "[MOCK] 무료 배송 쿠폰",
            description: "오늘 단 하루, 배송비 0원 쿠폰",
            total: 500,
            remaining: 0,
            status: "ENDED",
        },
    ]);

    const [products, setProducts] = useState([
        {
            id: 101,
            name: "[MOCK] Limited Edition Sneakers",
            price: 189000,
            discountPrice: 89000,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop",
            total: 50,
            remaining: 12,
            opensAt: "2024-12-25 10:00",
        },
        {
            id: 102,
            name: "[MOCK] Gaming Monitor XL",
            price: 450000,
            discountPrice: 199000,
            image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=2000&auto=format&fit=crop",
            total: 10,
            remaining: 10,
            opensAt: "2024-12-07 18:00",
        },
    ]);

    return (
        <div className="container mx-auto py-12 px-4 space-y-20">

            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-primary">
                    [MOCK] SPECIAL EVENT
                </h1>
                <p className="text-muted-foreground text-lg">
                    지금 놓치면 다시 오지 않는 특별한 기회!
                </p>
            </div>

            {/* Section 1: FCFS Coupons */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 border-b pb-4">
                    <Ticket className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">선착순 쿠폰 ZONE</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coupons.map((coupon) => (
                        <div
                            key={coupon.id}
                            className={`p-6 rounded-2xl border-2 ${coupon.status === "ACTIVE"
                                    ? "border-primary bg-primary/5"
                                    : "border-border bg-muted/50 opacity-70"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{coupon.title}</h3>
                                    <p className="text-sm text-muted-foreground">{coupon.description}</p>
                                </div>
                                {coupon.status === "ACTIVE" && (
                                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                                        마감 임박
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>남은 수량</span>
                                    <span className={coupon.status === "ACTIVE" ? "text-primary" : ""}>
                                        {coupon.remaining} / {coupon.total}
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{
                                            width: `${(coupon.remaining / coupon.total) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={coupon.status !== "ACTIVE"}
                                className="w-full mt-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-all"
                            >
                                {coupon.status === "ACTIVE"
                                    ? "쿠폰 받기 (클릭)"
                                    : coupon.remaining === 0
                                        ? "선착순 마감"
                                        : "오픈 예정"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 2: Time Deal Products */}
            <section className="space-y-8">
                <div className="flex items-center gap-2 border-b pb-4">
                    <Zap className="w-6 h-6 text-red-500 fill-current" />
                    <h2 className="text-2xl font-bold">한정 수량 타임딜</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                            <div className="aspect-square relative flex items-center justify-center bg-secondary">
                                {/* Image Placeholder or Actual Image */}
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded font-bold backdrop-blur-md">
                                    한정수량 {product.total}개
                                </div>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="text-2xl font-bold text-primary">
                                            {product.discountPrice.toLocaleString()}₩
                                        </span>
                                        <span className="text-sm text-muted-foreground line-through mb-1">
                                            {product.price.toLocaleString()}₩
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>재고 현황</span>
                                        <span className="font-bold text-foreground">{product.remaining}개 남음</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${(product.remaining / product.total) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
                                    구매 도전하기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
