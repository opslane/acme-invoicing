// Demo fixture data for Acme Invoicing.

export interface LineItem {
  description: string;
  qty: number;
  unit: number;
}

export interface Customer {
  name: string;
  email: string;
  taxId: string | null;
}

export interface Invoice {
  id: string;
  number: string;
  customer: Customer;
  currency: string;
  lineItems: LineItem[];
  dueDate: string;
  status: 'draft' | 'sent' | 'paid';
}

// The demo invoice: real line items, but the customer has NO tax id, which is
// what makes "Send invoice" silently do nothing.
export const demoInvoice: Invoice = {
  id: 'inv_8842',
  number: 'INV-8842',
  customer: { name: 'Northwind Traders', email: 'ap@northwind.example', taxId: null },
  currency: 'USD',
  lineItems: [
    { description: 'Annual subscription — Pro plan', qty: 1, unit: 4800 },
    { description: 'Onboarding & setup', qty: 1, unit: 1200 },
    { description: 'Additional seats', qty: 12, unit: 35 },
  ],
  dueDate: '2026-09-15',
  status: 'draft',
};
