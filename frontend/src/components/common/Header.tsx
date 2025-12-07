"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from "next-themes";
import { Sun, Moon, ShoppingCart } from "lucide-react";

export function Header() {
    const router = useRouter();
    const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        checkAuth();
        setMounted(true);
    }, [checkAuth]); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tighter text-primary">
                        DIBS<span className="text-foreground">!</span>
                        <span className="text-xs ml-1 text-muted-foreground font-normal border px-1 rounded">SHOP</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/deal" className="transition-colors hover:text-primary font-bold text-primary">
                        타임딜
                    </Link>
                    <Link href="/best" className="transition-colors hover:text-primary">
                        베스트
                    </Link>
                    <Link href="/coupons" className="transition-colors hover:text-primary">
                        쿠폰존
                    </Link>
                    <Link href="/event" className="transition-colors hover:text-primary">
                        이벤트
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-secondary transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    )}
                    <button className="p-2 hover:bg-secondary rounded-full transition-colors" aria-label="Search">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link href="/store/cart" className="p-2 hover:bg-secondary rounded-full transition-colors relative" aria-label="Cart">
                        <ShoppingBag className="w-5 h-5" />
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Link href="/mypage" className="flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-lg transition-colors">
                                <User className="w-5 h-5" />
                                <span className="hidden md:inline text-sm font-medium">
                                    {user?.name || '마이페이지'}
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                aria-label="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                            로그인
                        </Link>
                    )}

                    <button className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors" aria-label="Menu">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
