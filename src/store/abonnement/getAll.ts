// src/store/useStoreAbonnements.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface VideoFilters {
  medecinId?: string | number;
  patientId?: string | number;
  category?: string;
  date?: string; // ISO ou format attendu par ton backend
  page?: number;
  limit?: number;
}

interface AbonnementsState {
  Abonnements: any[];
  count: number;
  loadingAbonnements: boolean;
  fetchAbonnements: (filters?: VideoFilters) => Promise<void>;
}

const useStoreAbonnements = create<AbonnementsState>((set) => ({
  Abonnements: [],
  loadingAbonnements: false,
  count: 0,

  fetchAbonnements: async (filters?: VideoFilters) => {
    const token = localStorage.getItem("token");



    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAbonnements: true });

    const params = new URLSearchParams();

    if (filters) {
      if (filters.medecinId)
        params.append("medecinId", String(filters.medecinId));
      if (filters.patientId)
        params.append("patientId", String(filters.patientId));
      if (filters.category) params.append("category", filters.category);
      if (filters.date) params.append("date", filters.date);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    try {
      const response = await axios.get(
        `${config.mintClient}abonnements/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        Abonnements: response.data.items,
        count: response.data.meta.total,
        loadingAbonnements: false,
      });
    } catch (error) {
      console.error("Error fetching Abonnements:", error);
      set({ loadingAbonnements: false });
    }
  },
}));

export default useStoreAbonnements;
