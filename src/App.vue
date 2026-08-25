<script setup lang="ts">
import { ref, computed } from 'vue';
import { demoInvoice } from './lib/data';
import { formatMoney, invoiceTotal } from './lib/money';
import { canSend, sendInvoice } from './lib/send';
import { changeCurrency } from './lib/currency';
import { exportInvoices } from './lib/exportReport';

const invoice = ref({ ...demoInvoice });
const view = ref<'invoice' | 'reports'>('invoice');

const total = computed(() => invoiceTotal(invoice.value.lineItems));

const sendBlocked = computed(() => !canSend(invoice.value));
const taxIdDraft = ref('');

function onSend(): void {
  sendInvoice(invoice.value);
}

function onAddTaxId(): void {
  const taxId = taxIdDraft.value.trim();
  if (!taxId) return;
  invoice.value = { ...invoice.value, customer: { ...invoice.value.customer, taxId } };
  taxIdDraft.value = '';
}

// Currency change is silently ignored once line items exist.
function onCurrency(e: Event): void {
  const next = (e.target as HTMLSelectElement).value;
  invoice.value = changeCurrency(invoice.value, next);
}

// Export throws on a 500 (unhandled) — also used to flush the replay chunk.
async function onExport(): Promise<void> {
  await exportInvoices({ from: '2026-08-01', to: '2026-08-31' });
}
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="brand">Acme Invoicing</div>
      <nav>
        <button data-testid="nav-invoice" :class="{ on: view === 'invoice' }" @click="view = 'invoice'">Invoices</button>
        <button data-testid="nav-reports" :class="{ on: view === 'reports' }" @click="view = 'reports'">Reports</button>
      </nav>
      <div class="user">dana@northwind.example</div>
    </header>

    <main v-if="view === 'invoice'" class="sheet">
      <div class="invoice-head">
        <div>
          <h1>{{ invoice.number }}</h1>
          <p class="muted">{{ invoice.customer.name }} · {{ invoice.customer.email }}</p>
          <p v-if="!invoice.customer.taxId" class="muted small">No tax ID on file</p>
        </div>
        <span class="status">{{ invoice.status }}</span>
      </div>

      <table class="lines">
        <thead>
          <tr><th>Description</th><th>Qty</th><th class="r">Unit</th><th class="r">Amount</th></tr>
        </thead>
        <tbody>
          <tr v-for="(li, i) in invoice.lineItems" :key="i">
            <td>{{ li.description }}</td>
            <td>{{ li.qty }}</td>
            <td class="r">{{ formatMoney(li.unit, invoice.currency) }}</td>
            <td class="r">{{ formatMoney(li.qty * li.unit, invoice.currency) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr><td colspan="3" class="r">Total</td><td class="r strong">{{ formatMoney(total, invoice.currency) }}</td></tr>
        </tfoot>
      </table>

      <div class="controls">
        <label>Currency
          <select data-testid="currency" :value="invoice.currency" @change="onCurrency">
            <option>USD</option><option>EUR</option><option>GBP</option>
          </select>
        </label>
        <label>Due
          <input data-testid="due-date" type="text" :value="invoice.dueDate" />
        </label>
      </div>

      <div v-if="sendBlocked" class="send-blocked" data-testid="send-blocked">
        <p>This invoice can't be sent: {{ invoice.customer.name }} has no tax ID on file. Add one to enable sending.</p>
        <div class="add-tax-id">
          <input data-testid="tax-id-input" type="text" v-model="taxIdDraft" placeholder="Tax ID (e.g. EU123456789)" @keyup.enter="onAddTaxId" />
          <button class="ghost" data-testid="add-tax-id" @click="onAddTaxId">Add tax ID</button>
        </div>
      </div>

      <div class="actions">
        <button class="primary" data-testid="send-invoice" :disabled="sendBlocked" @click="onSend">Send invoice</button>
        <button class="ghost" data-testid="export" @click="onExport">Export report</button>
      </div>
    </main>

    <main v-else class="sheet">
      <h1>Reports</h1>
      <p class="muted">Monthly invoice export and revenue summary.</p>
      <button class="ghost" data-testid="export-2" @click="onExport">Export August</button>
    </main>
  </div>
</template>

<style>
:root { --ink:#1c1a17; --muted:#6b6560; --line:#e7e2db; --bg:#faf8f5; --accent:#b4531f; }
* { box-sizing: border-box; }
body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); }
.topbar { display:flex; align-items:center; gap:24px; padding:14px 28px; border-bottom:1px solid var(--line); background:#fff; }
.brand { font-weight:700; letter-spacing:.02em; }
.topbar nav { display:flex; gap:6px; }
.topbar nav button { border:0; background:none; padding:6px 12px; border-radius:6px; cursor:pointer; color:var(--muted); font-size:14px; }
.topbar nav button.on { background:var(--bg); color:var(--ink); font-weight:600; }
.user { margin-left:auto; color:var(--muted); font-size:13px; }
.sheet { max-width:760px; margin:32px auto; background:#fff; border:1px solid var(--line); border-radius:12px; padding:32px; }
.invoice-head { display:flex; justify-content:space-between; align-items:flex-start; }
h1 { margin:0 0 4px; font-size:26px; }
.muted { color:var(--muted); margin:2px 0; } .small { font-size:12px; }
.status { text-transform:uppercase; font-size:11px; letter-spacing:.08em; background:var(--bg); border:1px solid var(--line); padding:4px 10px; border-radius:999px; color:var(--muted); }
table.lines { width:100%; border-collapse:collapse; margin:24px 0; }
.lines th, .lines td { text-align:left; padding:10px 8px; border-bottom:1px solid var(--line); font-size:14px; }
.lines th { color:var(--muted); font-weight:500; font-size:12px; text-transform:uppercase; letter-spacing:.04em; }
.r { text-align:right; } .strong { font-weight:700; }
.controls { display:flex; gap:24px; margin:8px 0 24px; }
.controls label { display:flex; flex-direction:column; gap:6px; font-size:12px; color:var(--muted); }
.controls select, .controls input { padding:8px 10px; border:1px solid var(--line); border-radius:8px; font-size:14px; color:var(--ink); background:#fff; }
.actions { display:flex; gap:12px; }
.send-blocked { border:1px solid var(--line); background:var(--bg); border-radius:8px; padding:12px 16px; margin-bottom:16px; font-size:13px; color:var(--muted); }
.send-blocked p { margin:0 0 10px; }
.add-tax-id { display:flex; gap:8px; }
.add-tax-id input { padding:8px 10px; border:1px solid var(--line); border-radius:8px; font-size:13px; }
button.primary { background:var(--accent); color:#fff; border:0; padding:11px 20px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; }
button.primary:disabled { opacity:.45; cursor:not-allowed; }
button.ghost { background:#fff; color:var(--ink); border:1px solid var(--line); padding:11px 20px; border-radius:8px; font-size:14px; cursor:pointer; }
</style>
