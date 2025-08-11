
export interface TransactionData {
    transactionName: string;
    amount: number;
    transactionType: 'Debit' | 'Credit';
    category: string;
    date: string;
    description: string;
}

export interface Transaction extends TransactionData {
    id: string;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}