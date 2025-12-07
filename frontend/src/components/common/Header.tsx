"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function Header() {
    const router = useRouter();
    const { isAuthenticated, user, logout, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []); // 빈 배열: 컴포넌트 마운트 시 한 번만 실행

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-primary">
                        TICKET<span className="text-foreground">LOCK</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/movie" className="transition-colors hover:text-primary">
                        영화
                    </Link>
                    <Link href="/store" className="transition-colors hover:text-primary">
                        스토어
                    </Link>
                    <Link href="/event" className="transition-colors hover:text-primary">
                        이벤트
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
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
                        <Link href="/login" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
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
