// app/Services/api.tsx
import { TransactionData } from "../types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/transaction";


function getBasicAuthHeader(): HeadersInit {
  try {
    if (typeof window !== "undefined") {
      const token = btoa("B@example.com:mySecure123");
      return { Authorization: `Basic ${token}` };
    }
  } catch {}
  return {};
}

async function parseJsonOrEmpty(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const api = {
  transactions: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}`, {
        mode: "cors",
        headers: { ...getBasicAuthHeader() },
      });
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json();
    },

    add: async (data: TransactionData) => {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...getBasicAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add transaction");
      return response.json;
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: { ...getBasicAuthHeader() },
      });
      if (!response.ok) throw new Error("Failed to delete transaction");
      return parseJsonOrEmpty(response);
    },

    getSummary: async () => {
      const response = await fetch(`${API_BASE_URL}/summary`, {
        method: "GET",
        mode: "cors",
        headers: { ...getBasicAuthHeader() },
      });
      if (!response.ok) throw new Error("Failed to fetch summary statistics");
      return response.json();
    },

    update: async (id: string, data: TransactionData) => {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...getBasicAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update transaction");
      return response.json();
    },
  },

  user: {
    getProfile: async () => {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        mode: "cors",
        headers: { ...getBasicAuthHeader() },
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      return response.json();
    },
  },
};