# Acme Invoicing

A small invoicing app — create an invoice, add line items, pick a currency, set a due date, and send it. Reports exports the month's invoices.

It's instrumented with the [Opslane](https://opslane.com) browser SDK for always-on session replay and error + friction capture.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # vitest
```

Point the SDK at your ingest endpoint with `VITE_OPSLANE_ENDPOINT` and `VITE_OPSLANE_API_KEY`.

## Structure

- `src/App.vue` — the invoice detail and reports views
- `src/lib/money.ts` — currency formatting and totals
- `src/lib/send.ts` — send eligibility
- `src/lib/currency.ts` — currency-change rules
- `src/lib/dates.ts` — due-date parsing and report dates
- `src/lib/exportReport.ts` — report export
- `src/lib/data.ts` — sample invoice

## License

MIT
