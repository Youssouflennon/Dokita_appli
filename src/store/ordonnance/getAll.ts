// src/store/useStoreAllOrdonnances.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  status?: "PENDING" | "PAID" | "CANCELLED";
  type?: "RESERVATION" | "ABONNEMENT";
  page?: number;
  limit?: number;
}

interface AllOrdonnancesState {
  AllOrdonnances: any[];
  count: number;
  loadingAllOrdonnances: boolean;
  fetchAllOrdonnances: (filters?: UserFilters) => Promise<void>;
}

const useStoreAllOrdonnances = create<AllOrdonnancesState>((set, get) => ({
  AllOrdonnances: [],
  loadingAllOrdonnances: false,
  count: 0,

  fetchAllOrdonnances: async (filters?: UserFilters) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAllOrdonnances: true });

    const params = new URLSearchParams();
    if (filters) {
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("status", filters.type);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    try {
      const response = await axios.get(
        `${config.mintClient}ordonances/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        AllOrdonnances: response.data.items,
        count: response.data.meta.total,
        loadingAllOrdonnances: false,
      });
    } catch (error) {
      console.error("Error fetching AllOrdonnances:", error);
      set({ loadingAllOrdonnances: false });
    }
  },
}));

export default useStoreAllOrdonnances;
