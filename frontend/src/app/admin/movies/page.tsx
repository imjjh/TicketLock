"use client";

import { useEffect } from 'react';
import { useMovieStore } from '@/store/useMovieStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { movieService } from '@/services/movieService';

export default function AdminMoviesPage() {
    const { movies, fetchMovies, isLoading } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleDelete = async (id: number) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await movieService.deleteMovie(id);
                fetchMovies(); // Refresh list
            } catch (error) {
                alert('삭제 실패');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">영화 관리</h2>
                <Link href="/admin/movies/new">
                    <Button>영화 등록</Button>
                </Link>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium">제목</th>
                                <th className="p-4 font-medium">장르</th>
                                <th className="p-4 font-medium">개봉일</th>
                                <th className="p-4 font-medium text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie.id} className="border-t border-border hover:bg-muted/10">
                                    <td className="p-4">{movie.id}</td>
                                    <td className="p-4 font-medium">{movie.title}</td>
                                    <td className="p-4">{movie.genre}</td>
                                    <td className="p-4">{movie.releaseDate}</td>
                                    <td className="p-4 text-right">
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(movie.id)}>
                                            삭제
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
