"use client"

import { useEffect } from 'react';
import Link from 'next/link';
import { Play, Star } from 'lucide-react';
import { useMovieStore } from '@/store/useMovieStore';

export default function Home() {
    const { movies, fetchMovies, isLoading, error } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // Featured movie (first one or specific logic)
    const featuredMovie = movies && movies.length > 0 ? movies[0] : null;

    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url('${featuredMovie?.backdropUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop'}')` }}
                ></div>

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-20 px-4">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold bg-primary text-white rounded-full w-fit">
                        NOW PLAYING
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 max-w-3xl leading-tight">
                        {featuredMovie?.title || "영화를 불러오는 중..."} <br />
                        <span className="text-primary">TICKETLOCK</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-xl mb-8 line-clamp-2">
                        {featuredMovie?.description || "프리미엄 영화 예매 서비스"}
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href={featuredMovie ? `/booking/${featuredMovie.id}` : '#'}
                            className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            예매하기
                        </Link>
                        <Link
                            href={featuredMovie ? `/movie/${featuredMovie.id}` : '#'}
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-colors"
                        >
                            상세정보
                        </Link>
                    </div>
                </div>
            </section>

            {/* Movie List Section */}
            <section className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">현재 상영작</h2>
                    <Link href="/movie" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        전체보기 &rarr;
                    </Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : error ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>영화 정보를 불러올 수 없습니다.</p>
                        <p className="text-sm mt-2">백엔드에 영화 API가 구현되면 표시됩니다.</p>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>현재 상영중인 영화가 없습니다.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {movies.slice(0, 4).map((movie) => (
                            <div key={movie.id} className="group relative">
                                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-secondary mb-4 relative">
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 text-xs font-bold text-accent">
                                        <Star className="w-3 h-3 fill-current" />
                                        {movie.rating}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{movie.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="border border-muted px-1 rounded text-[10px]">15세</span>
                                    <span>{movie.duration}분</span>
                                    <span>•</span>
                                    <span>{movie.genre}</span>
                                </div>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
                                    <Link
                                        href={`/booking/${movie.id}`}
                                        className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:scale-105 transition-transform"
                                    >
                                        예매하기
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

