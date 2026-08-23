import { createApp } from 'vue';
import App from './App.vue';
import { init, setUser } from '@opslane/sdk';

// Opslane browser SDK — always-on session replay + error and friction capture.
init({
  endpoint: import.meta.env['VITE_OPSLANE_ENDPOINT'] ?? 'https://ingest.opslane.com',
  apiKey: import.meta.env['VITE_OPSLANE_API_KEY'] ?? 'opslane_pk_your_public_key',
  release: import.meta.env['VITE_OPSLANE_RELEASE'] ?? 'acme-invoicing-v1',
  environment: import.meta.env['VITE_OPSLANE_ENVIRONMENT'] ?? 'production',
  replay: { enabled: true },
});

// Identify the signed-in user so friction is attributed, not anonymous.
setUser({
  id: import.meta.env['VITE_DEMO_USER'] ?? 'dana-northwind',
  email: 'dana@northwind.example',
  account: { id: 'northwind', name: 'Northwind Traders' },
});

createApp(App).mount('#app');
