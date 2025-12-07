"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { movieService } from '@/services/movieService';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types';

export default function NewMoviePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Movie>>({
        title: '',
        rating: 0,
        genre: '',
        duration: 0,
        description: '',
        releaseDate: '',
        posterUrl: '',
        backdropUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'rating' || name === 'duration' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Cast to required type, assuming form validation ensures required fields
            await movieService.createMovie(formData as Omit<Movie, 'id'>);
            router.push('/admin/movies');
        } catch (error) {
            alert('영화 등록 실패');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">영화 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">제목</label>
                    <input
                        name="title"
                        required
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">평점 (0-10)</label>
                        <input
                            name="rating"
                            type="number"
                            step="0.1"
                            required
                            className="w-full p-2 rounded-md border border-input bg-background"
                            value={formData.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">상영 시간 (분)</label>
                        <input
                            name="duration"
                            type="number"
                            required
                            className="w-full p-2 rounded-md border border-input bg-background"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">장르</label>
                    <input
                        name="genre"
                        required
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.genre}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">개봉일</label>
                    <input
                        name="releaseDate"
                        type="date"
                        required
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.releaseDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">포스터 URL</label>
                    <input
                        name="posterUrl"
                        required
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.posterUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">배경 이미지 URL</label>
                    <input
                        name="backdropUrl"
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.backdropUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">줄거리</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        className="w-full p-2 rounded-md border border-input bg-background"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                        취소
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? '등록 중...' : '등록하기'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
