# cadclientes

Loja em React + TypeScript + Vite com carrinho e checkout via Mercado Pago.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Estrutura principal

- `src/App.tsx`: vitrine principal
- `src/components`: interface de produtos, carrinho e checkout
- `src/context/CartContext.tsx`: estado global do carrinho
- `src/services/mercadopagoService.ts`: integração frontend com backend de pagamento
- `server/index.js`: backend local para criação de preferência Mercado Pago
- `api/`: endpoints para ambiente serverless

## Observações

- Não alterar `.env.local` automaticamente.
- Qualquer mudança de banco deve ser feita por migration versionada.
- Deploy em produção só com confirmação.
