import { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { mercadopagoService, type PixPaymentResponse } from '../services/mercadopagoService';
import { useCart } from '../hooks/useCart';

const publicKey =
    import.meta.env.VITE_MP_PUBLIC_KEY
    || import.meta.env.MERCADOPAGO_PUBLIC_KEY
    || '';

if (publicKey) {
    initMercadoPago(publicKey);
}

export const CheckoutButton = () => {
    const { items, subtotal } = useCart();
    const [paymentMode, setPaymentMode] = useState<'wallet' | 'pix'>('wallet');
    const [payerEmail, setPayerEmail] = useState('');
    const [pixPayment, setPixPayment] = useState<PixPaymentResponse | null>(null);
    const [walletPreferenceId, setWalletPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isWalletReady, setIsWalletReady] = useState(false);

    useEffect(() => {
        if (!pixPayment || pixPayment.status !== 'pending') {
            return;
        }

        const intervalId = window.setInterval(async () => {
            try {
                const updated = await mercadopagoService.getOrderStatus(pixPayment.orderId);
                setPixPayment(updated);
            } catch (pollError) {
                console.error('Erro ao consultar status do PIX:', pollError);
            }
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [pixPayment]);

    useEffect(() => {
        setPixPayment(null);
        setWalletPreferenceId(null);
        setIsWalletReady(false);
        setError(null);
        setCopied(false);
    }, [items, subtotal]);

    useEffect(() => {
        if (paymentMode !== 'wallet' || items.length === 0) {
            return;
        }

        let isMounted = true;

        const loadWallet = async () => {
            setIsLoading(true);
            setError(null);
            setIsWalletReady(false);

            try {
                const preferenceId = await mercadopagoService.createWalletPreference({
                    items,
                    total: subtotal,
                    checkoutMode: 'wallet'
                });

                if (isMounted) {
                    setWalletPreferenceId(preferenceId);
                }
            } catch (walletError) {
                if (isMounted) {
                    setError(walletError instanceof Error ? walletError.message : 'Erro ao carregar checkout Mercado Pago');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadWallet();

        return () => {
            isMounted = false;
        };
    }, [paymentMode, items, subtotal]);

    if (items.length === 0) {
        return (
            <button
                disabled
                className="w-full h-12 bg-gray-300 text-white rounded-xl font-bold flex items-center justify-center cursor-not-allowed"
            >
                Carrinho Vazio
            </button>
        );
    }

    const handleCreatePix = async () => {
        setIsLoading(true);
        setError(null);
        setCopied(false);

        try {
            const result = await mercadopagoService.createPixPayment({
                items,
                total: subtotal,
                payerEmail
            });
            setPixPayment(result);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Erro inesperado ao configurar pagamento PIX';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full mt-4 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-gray-100 p-1">
                <button
                    onClick={() => setPaymentMode('wallet')}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${paymentMode === 'wallet' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                >
                    Mercado Pago
                </button>
                <button
                    onClick={() => setPaymentMode('pix')}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${paymentMode === 'pix' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                >
                    PIX
                </button>
            </div>

            {paymentMode === 'wallet' && (
                <>
                    {isLoading && !walletPreferenceId ? (
                        <button
                            disabled
                            className="w-full h-12 bg-gray-900 text-white rounded-xl text-sm font-bold flex items-center justify-center cursor-not-allowed"
                        >
                            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        </button>
                    ) : null}

                    {walletPreferenceId ? (
                        <div className="w-full relative z-0 min-h-[48px] flex items-center justify-center">
                            {!isWalletReady && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gray-100 animate-pulse">
                                    <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                            <div className={`w-full transition-opacity duration-300 ${isWalletReady ? 'opacity-100' : 'opacity-0'}`}>
                                <Wallet
                                    initialization={{
                                        preferenceId: walletPreferenceId,
                                        redirectMode: 'self'
                                    }}
                                    onReady={() => setIsWalletReady(true)}
                                />
                            </div>
                        </div>
                    ) : null}
                </>
            )}

            {paymentMode === 'pix' && !pixPayment && (
                <>
                    <input
                        type="email"
                        value={payerEmail}
                        onChange={(event) => setPayerEmail(event.target.value)}
                        placeholder="Digite seu e-mail para gerar o PIX"
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
                    />
                    <button
                        onClick={handleCreatePix}
                        disabled={isLoading || !payerEmail.trim()}
                        className="w-full h-12 bg-gray-900 text-white rounded-xl text-sm font-bold flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Gerando PIX...' : 'Gerar PIX'}
                    </button>
                </>
            )}

            {paymentMode === 'pix' && pixPayment && (
                <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-2 text-sm">
                        <p className="font-semibold text-gray-900">Pagamento PIX sandbox</p>
                        <p className="text-gray-500">Pedido: {pixPayment.orderId}</p>
                        <p className="text-gray-500">
                            Status: <span className="font-semibold text-gray-900">{pixPayment.status}</span>
                        </p>
                        {pixPayment.expiresAt && (
                            <p className="text-gray-500">
                                Expira em: {new Date(pixPayment.expiresAt).toLocaleString('pt-BR')}
                            </p>
                        )}
                    </div>

                    {pixPayment.qrCodeBase64 && (
                        <img
                            src={`data:image/png;base64,${pixPayment.qrCodeBase64}`}
                            alt="QR Code PIX"
                            className="mx-auto my-4 h-52 w-52 rounded-2xl border border-gray-100 p-3"
                        />
                    )}

                    {pixPayment.qrCode && (
                        <>
                            <textarea
                                readOnly
                                value={pixPayment.qrCode}
                                className="min-h-28 w-full rounded-2xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700"
                            />
                            <button
                                onClick={async () => {
                                    await navigator.clipboard.writeText(pixPayment.qrCode || '');
                                    setCopied(true);
                                }}
                                className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white"
                            >
                                {copied ? 'Código PIX copiado' : 'Copiar código PIX'}
                            </button>
                        </>
                    )}

                    {pixPayment.status === 'approved' && (
                        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                            Pagamento aprovado. O pedido foi confirmado no Supabase.
                        </p>
                    )}
                </div>
            )}

            {error ? (
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setError(null)}
                        className="w-full h-16 bg-red-100 text-red-600 rounded-2xl font-bold flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                        Revisar dados
                    </button>
                    <p className="text-xs text-red-500 text-center px-2">{error}</p>
                </div>
            ) : null}
        </div>
    );
};
