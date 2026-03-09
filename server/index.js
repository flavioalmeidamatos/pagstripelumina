import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createMPPreference } from './mp_common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Verifica se o token existe antes de iniciar
if (!process.env.MP_ACCESS_TOKEN) {
    console.error("ERRO: MP_ACCESS_TOKEN não está definido no arquivo .env");
    process.exit(1);
}

app.post('/api/create_preference', async (req, res) => {
    try {
        const { items } = req.body;

        // Origem dinâmica para redirecionamentos locais
        let backUrl = 'http://localhost:5173';
        if (req.headers.origin && req.headers.origin !== 'null') {
            backUrl = req.headers.origin;
        }

        const result = await createMPPreference(
            process.env.MP_ACCESS_TOKEN,
            items,
            backUrl
        );

        console.log(`[Local Server] Preferência Gerada: ${result.id}`);
        res.json({ id: result.id });
    } catch (error) {
        console.error('[Express] Erro ao criar preferência:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            error: 'Erro local ao criar preferência de pagamento',
            details: error.message
        });
    }
});

app.post('/api/webhooks/mercadopago', (req, res) => {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    // 1. O Mercado Pago exige que respondamos com 200/201 logo de imediato
    res.status(200).send();

    // Se as headers não existirem ou o arquivo .env não tiver a chave, ignoramos o processamento mais a fundo
    if (!xSignature || !xRequestId || !process.env.MP_WEBHOOK_SECRET) {
        console.log("⚠️ Webhook recebido, mas faltando headers de validação (x-signature/x-request-id) ou MP_WEBHOOK_SECRET não está no .env");
        return;
    }

    try {
        // 2. Extrair parâmetros v1 e t da assinatura
        const parts = xSignature.split(',');
        let ts, hash;
        parts.forEach(p => {
            const [key, value] = p.split('=');
            if (key && value) {
                if (key.trim() === 't') ts = value.trim();
                if (key.trim() === 'v1') hash = value.trim();
            }
        });

        // 3. Obter o id da notificação a partir do body
        const dataID = req.body?.data?.id;

        if (!dataID || !ts || !hash) {
            console.log("⚠️ Webhook recebido sem ID de dados ou com assinatura incompleta.");
            return;
        }

        // 4. Montar a string manifest para validação da assinatura conforme documentação
        const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

        // 5. Calcular HMAC-SHA256 usando nosso segredo
        const calculatedHash = crypto
            .createHmac('sha256', process.env.MP_WEBHOOK_SECRET)
            .update(manifest)
            .digest('hex');

        // 6. Verificar se os hashes são idênticos
        if (calculatedHash === hash) {
            console.log(`✅ Webhook validado com sucesso! Ação: ${req.body.action || 'Desconhecida'} | ID do Pagamento: ${dataID}`);
            // O pagamento é genuíno! A partir daqui, você atualizaria o status no banco de dados.
        } else {
            console.error('❌ Assinatura de Webhook inválida! Calculado vs Esperado não bate.');
        }
    } catch (error) {
        console.error('❌ Erro interno ao validar webhook:', error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
