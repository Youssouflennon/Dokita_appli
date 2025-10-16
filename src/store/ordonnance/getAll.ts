// src/store/useStoreAllOrdonnances.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  medecinId?: string;
  patientId?: string;
  reservationId?: string;
  page?: number;
  limit?: number;
  q?: string;
  createdAt?: string; // ISO ou format attendu par ton backend
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
      if (filters.medecinId) params.append("medecinId", filters.medecinId);
      if (filters.patientId) params.append("patientId", filters.patientId);
      if (filters.reservationId)
        params.append("reservationId", filters.reservationId);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
      if (filters.q) params.append("q", filters.q);
      if (filters.createdAt) params.append("createdAt", filters.createdAt);
    }

    try {
      const response = await axios.get(
        `${config.mintClient}ordonances/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.data);
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
