import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import { ShoppingBag, X } from 'lucide-react';

interface ProductDetailsProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
    const { addItem } = useCart();

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed inset-0 z-50 flex items-end justify-center p-2 sm:p-4 md:items-center md:p-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

                    <motion.div
                        layoutId={`product-${product.id}`}
                        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto overflow-x-hidden rounded-t-[28px] bg-white shadow-2xl md:rounded-[40px]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-400 shadow-sm backdrop-blur-sm hover:text-gray-900 cursor-pointer md:right-6 md:top-6"
                        >
                            <X size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="h-[240px] w-full bg-gray-50 sm:h-[300px] md:h-[600px]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col p-5 sm:p-6 md:p-12">
                                <p className="text-sm font-bold tracking-[0.2em] text-rose-500 uppercase">
                                    {product.brand}
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    {product.name}
                                </h2>
                                <span className="mt-4 inline-block rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600 w-fit">
                                    {product.category}
                                </span>

                                <div className="mt-5 flex-grow sm:mt-6 md:mt-8">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase">Descrição</h4>
                                    <p className="mt-2 text-base leading-relaxed text-gray-600 sm:text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-col items-stretch justify-between gap-4 border-t border-gray-100 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:gap-6 sm:pt-6 md:mt-12">
                                    <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            addItem(product);
                                            onClose();
                                        }}
                                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:shadow-lg hover:bg-gray-800 cursor-pointer whitespace-nowrap sm:w-auto sm:text-[13px]"
                                    >
                                        <ShoppingBag size={16} />
                                        <span>Adicionar</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
