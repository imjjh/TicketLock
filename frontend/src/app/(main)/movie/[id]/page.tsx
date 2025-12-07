import Link from 'next/link';
import { Star, Clock, Calendar, Play } from 'lucide-react';

export default function MovieDetailPage({ params }: { params: { id: string } }) {
    // Mock Data - In real app, fetch based on params.id
    const movie = {
        id: params.id,
        title: "인터스텔라 Re-Mastering",
        originalTitle: "Interstellar",
        posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
        backdropUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2670&auto=format&fit=crop",
        rating: 9.8,
        duration: 169,
        releaseDate: "2024.12.07",
        genre: ["SF", "드라마", "어드벤처"],
        director: "크리스토퍼 놀란",
        cast: ["매튜 맥커너히", "앤 해서웨이", "마이클 케인"],
        description: "세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다. 이때 시공간에 불가사의한 틈이 열리고, 남은 자들에게는 이 곳을 탐험해 인류를 구해야 하는 임무가 지워진다. 사랑은 시공간을 초월하는 유일한 것. 인류의 미래를 위해 우주로 떠난 그들의 위대한 여정이 다시 시작된다.",
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section with Backdrop */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${movie.backdropUrl})` }}
                ></div>

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-12 px-4">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        {/* Poster */}
                        <div className="hidden md:block w-64 rounded-lg overflow-hidden shadow-2xl border-2 border-white/10">
                            <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold text-white">{movie.title}</h1>
                            <p className="text-xl text-gray-300">{movie.originalTitle}</p>

                            <div className="flex items-center gap-4 text-sm md:text-base text-gray-200">
                                <span className="flex items-center gap-1 text-accent font-bold">
                                    <Star className="w-5 h-5 fill-current" /> {movie.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {movie.duration}분
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> {movie.releaseDate} 개봉
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie.genre.map((g) => (
                                    <span key={g} className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                                        {g}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Link
                                    href={`/booking/${movie.id}`}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg shadow-lg shadow-primary/30"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    예매하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">영화 줄거리</h2>
                            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                {movie.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 border-l-4 border-primary pl-4">출연진 / 제작진</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">감독</p>
                                    <p className="font-bold">{movie.director}</p>
                                </div>
                                {movie.cast.map((actor) => (
                                    <div key={actor} className="p-4 bg-secondary rounded-lg">
                                        <p className="text-sm text-muted-foreground">배우</p>
                                        <p className="font-bold">{actor}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar (Ad or Related) */}
                    <div className="space-y-8">
                        <div className="bg-secondary p-6 rounded-xl border border-border">
                            <h3 className="text-xl font-bold mb-4">관람 포인트</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">1.</span>
                                    압도적인 영상미와 사운드
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">2.</span>
                                    가족애를 다룬 감동적인 스토리
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">3.</span>
                                    과학적 고증을 거친 블랙홀 묘사
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
