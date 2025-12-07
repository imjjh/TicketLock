"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { productService } from '@/services/productService';
import { Product } from '@/types';

export default function StorePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ id: number; qty: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (id: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { id, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQty = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, qty: Math.max(0, item.qty + delta) };
            }
            return item;
        }).filter(item => item.qty > 0));
    };

    const totalAmount = cart.reduce((acc, item) => {
        const product = products.find(p => p.id === item.id);
        return acc + (product ? product.price * item.qty : 0);
    }, 0);

    return (
        <div className="min-h-screen container mx-auto px-4 py-12 relative">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold">스토어</h1>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-3 bg-secondary rounded-full hover:bg-primary transition-colors"
                >
                    <ShoppingCart className="w-6 h-6" />
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
                            {cart.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                    )}
                </button>
            </div>

            {/* Categories (Simple Filter) */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                {["ALL", "SNACK", "DRINK", "COMBO"].map((cat) => (
                    <button key={cat} className="px-6 py-2 rounded-full border border-border hover:bg-secondary transition-colors text-sm font-bold whitespace-nowrap">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            {isLoading ? (
                <div className="text-center py-20">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-secondary/30 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all">
                            <div className="aspect-square relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <button
                                    data-product-id={product.id}
                                    onClick={() => addToCart(product.id)}
                                    className="absolute bottom-4 right-4 z-20 p-3 bg-primary text-white rounded-full shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                <p className="text-muted-foreground">{product.price.toLocaleString()}원</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Cart Drawer Overlay */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
                    <div className="relative w-full max-w-md bg-background border-l border-border h-full p-6 flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6" /> 장바구니
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                    <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
                                    <p>장바구니가 비어있습니다.</p>
                                </div>
                            ) : (
                                cart.map((item) => {
                                    const product = products.find(p => p.id === item.id);
                                    if (!product) return null;
                                    return (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary">
                                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold">{product.name}</h4>
                                                <p className="text-sm text-muted-foreground">{product.price.toLocaleString()}원</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                                                <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-background rounded">
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-background rounded">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="border-t border-border pt-6 mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold">총 결제금액</span>
                                <span className="text-2xl font-bold text-primary">{totalAmount.toLocaleString()}원</span>
                            </div>
                            <button
                                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={cart.length === 0}
                            >
                                결제하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
