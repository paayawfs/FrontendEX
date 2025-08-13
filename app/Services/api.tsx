import { TransactionData } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/transaction';

export const api = {
    transactions: {
        getAll: async () => {
            const response = await fetch(`${API_BASE_URL}`, {
                mode: 'cors',
            });
            if (!response.ok) throw new Error('Failed to fetch transactions');
            return response.json();
        },

        add: async (data: TransactionData) => {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                mode : 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to add transaction');
            return response.json();
        },

        delete: async (id: string) => {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                mode : 'cors'
            });
            if (!response.ok) throw new Error('Failed to delete transaction');
            return response.json();
        },

        getSummary: async () => {
            const username = 'B@example.com';
            const password = 'mySecure123';
            
            const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            const response = await fetch(`${API_BASE_URL}/summary`,{
                method:'GET',
                headers: headers
            })
            
            if (!response.ok) throw new Error('Failed to fetch summary statistics');
            return response.json();
        },

        update: async (id: string, data: TransactionData) => {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                mode : 'cors',
                headers: {
                    'Content-Type': 'application/json',
                
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to update transaction');
            return response.json();
        }
    },

    user: {
        getProfile: async () => {
            const response = await fetch(`${API_BASE_URL}/user/profile`);
            if (!response.ok) throw new Error('Failed to fetch user profile');
            return response.json();
        }
    }
};