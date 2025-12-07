"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
            // Redirect to login if not admin
            // For now, let's assume login page handles redirect back or we just go to home
            // router.push('/login'); 
            // Actually, if they are logged in but not admin, maybe go home?
            if (isAuthenticated && user?.role !== 'ADMIN') {
                router.push('/');
            } else if (!isAuthenticated) {
                router.push('/login');
            }
        }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated || user?.role !== 'ADMIN') {
        return null; // Will redirect
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card">
                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold text-primary">TicketLock Admin</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin/movies">
                        <Button variant="ghost" className="w-full justify-start">
                            영화 관리
                        </Button>
                    </Link>
                    <Link href="/admin/products">
                        <Button variant="ghost" className="w-full justify-start">
                            상품 관리
                        </Button>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-border">
                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10" onClick={() => { logout(); router.push('/login'); }}>
                            로그아웃
                        </Button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
