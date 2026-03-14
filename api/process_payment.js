import { createBrickPayment } from '../server/pix_service.js';

export default async function handler(req, res) {
    const origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const result = await createBrickPayment({
            req,
            payload: req.body
        });

        return res.status(200).json(result);
    } catch (error) {
        const statusCode = error.message?.includes('inválido') || error.message?.includes('obrigatório')
            ? 400
            : 500;

        console.error('[BRICK] Erro ao processar pagamento:', {
            message: error.message,
            stack: error.stack
        });

        return res.status(statusCode).json({
            error: statusCode === 400
                ? error.message
                : 'Não foi possível processar o pagamento no momento.'
        });
    }
}
