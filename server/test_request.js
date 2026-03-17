import fetch from 'node-fetch';

async function run() {
  const res = await fetch('http://localhost:3000/api/create_preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ id: '1', name: 'Test', price: 10, quantity: 1 }],
      payer: { email: 'test@example.com' },
    }),
  });
  console.log('status', res.status);
  console.log(await res.text());
}

run().catch((err) => console.error(err));
