"use client";

import Image from "next/image";
import Link from "next/link";
import { Timer, ArrowRight, ShoppingBag, Tag } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section - Flash Deal */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background - Dark & Premium */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                        alt="Shopping Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="container relative z-20 px-4 md:px-6">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-sm font-bold animate-pulse">
                            <Timer className="w-4 h-4" />
                            <span>[MOCK] TIME DEAL ENDING SOON</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            [MOCK] SAMSUNG <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                GALAXY S24
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-[600px]">
                            [MOCK] 선착순 100명 한정 50% 할인 쿠폰 배포 중. <br />
                            지금 바로 쿠폰을 다운로드하고 최저가에 도전하세요.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <Link
                                href="/deal"
                                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all text-lg"
                            >
                                <Tag className="w-5 h-5" />
                                [MOCK] 선착순 쿠폰받기
                            </Link>
                            <Link
                                href="/best"
                                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all text-lg"
                            >
                                상품 더보기
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories / Items */}
            <section className="py-20 bg-background container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">🔥 [MOCK] 지금 뜨는 핫딜</h2>
                    <Link
                        href="/best"
                        className="text-sm font-medium hover:text-primary flex items-center gap-1"
                    >
                        전체보기 <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="group relative bg-secondary/20 rounded-xl overflow-hidden border border-border transition-all hover:border-primary/50 hover:shadow-lg"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden bg-gray-900">
                                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    50% OFF
                                </div>
                                {/* Placeholder for Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    <ShoppingBag className="w-12 h-12 opacity-50" />
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                                    [MOCK] Headphones {item}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Wireless noise cancelling
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-lg font-bold">
                                            {(299000).toLocaleString()}₩
                                        </span>
                                        <span className="text-sm text-muted-foreground line-through ml-2">
                                            350,000
                                        </span>
                                    </div>
                                    <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
