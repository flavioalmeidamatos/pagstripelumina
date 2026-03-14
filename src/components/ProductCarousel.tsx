import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
    products: Product[];
    onSelect: (product: Product) => void;
    selectedId?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onSelect, selectedId }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (containerRef.current) {
            const { scrollLeft } = containerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - 320 : scrollLeft + 320;
            containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            <div className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 opacity-100 transition-opacity md:block md:opacity-0 md:group-hover:opacity-100">
                <button
                    onClick={() => scroll('left')}
                    className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white text-gray-900 ml-4 cursor-pointer"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            <motion.div
                ref={containerRef}
                className="flex gap-4 overflow-x-auto px-4 py-8 no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth sm:gap-6 sm:px-6 sm:py-10 md:gap-8 md:px-8 md:py-12"
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => onSelect(product)}
                        isSelected={selectedId === product.id}
                    />
                ))}
            </motion.div>

            <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 opacity-100 transition-opacity md:block md:opacity-0 md:group-hover:opacity-100">
                <button
                    onClick={() => scroll('right')}
                    className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white text-gray-900 mr-4 cursor-pointer"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};
