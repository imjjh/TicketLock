"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        // 쿠키 기반 인증이므로, URL에서 토큰을 추출할 필요 없이
        // 바로 백엔드에 사용자 정보를 요청(checkAuth -> /auth/me)하여 세션 확인
        // 성공시 -> 홈으로 이동
        // 실패시 -> 로그인 페이지로 이동 (checkAuth 내부 에러 핸들링 or 여기서 처리)

        checkAuth().then(() => {
            // 인증 성공 (쿠키 유효)
            router.push('/');
            // 인증 실패
            router.push('/login?error=auth_failed');
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">로그인 처리 중입니다...</p>
        </div>
    );
}

export default function OAuthCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
