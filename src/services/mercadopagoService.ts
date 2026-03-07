import type { CartItem } from '../types/product';

interface CheckoutData {
    items: CartItem[];
    total: number;
}

export const mercadopagoService = {
    createPreference: async (data: CheckoutData): Promise<string> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        try {
            const apiUrl = import.meta.env.PROD
                ? '/api/create_preference'
                : 'http://localhost:3000/api/create_preference';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Erro ao processar checkout');
            }

            const result = await response.json();

            if (!result.id) {
                throw new Error('ID de preferência não retornado pelo servidor');
            }

            return result.id;
        } catch (error: unknown) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.error('Checkout request timed out');
                throw new Error('A requisição demorou muito. Tente novamente.');
            }
            console.error('Erro ao chamar o checkout na API:', error);
            throw error;
        }
    }
};
