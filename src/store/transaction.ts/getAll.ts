// src/store/useStoreAllTransactions.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  status?: "PENDING" | "PAID" | "CANCELLED";
  type?: "RESERVATION" | "ABONNEMENT";
  page?: number;
  limit?: number;
}

interface AllTransactionsState {
  AllTransactions: any[];
  count: number;
  loadingAllTransactions: boolean;
  fetchAllTransactions: (filters?: UserFilters) => Promise<void>;
}

const useStoreAllTransactions = create<AllTransactionsState>((set, get) => ({
  AllTransactions: [],
  loadingAllTransactions: false,
  count: 0,

  fetchAllTransactions: async (filters?: UserFilters) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAllTransactions: true });

    const params = new URLSearchParams();
    if (filters) {
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("status", filters.type);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    try {
      const response = await axios.get(
        `${config.mintClient}admins/transactions/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        AllTransactions: response.data.items,
        count: response.data.meta.total,
        loadingAllTransactions: false,
      });
    } catch (error) {
      console.error("Error fetching AllTransactions:", error);
      set({ loadingAllTransactions: false });
    }
  },
}));

export default useStoreAllTransactions;
