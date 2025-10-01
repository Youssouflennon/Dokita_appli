// src/store/useStoreCategories.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface VideoFilters {
  medecinId?: string | number;
  category?: string;
  date?: string; // ISO ou format attendu par ton backend
  page?: number;
  limit?: number;
}

interface CategoriesState {
  Categories: any[];
  count: number;
  loadingCategories: boolean;
  fetchCategories: (filters?: VideoFilters) => Promise<void>;
}

const useStoreCategories = create<CategoriesState>((set) => ({
  Categories: [],
  loadingCategories: false,
  count: 0,

  fetchCategories: async (filters?: VideoFilters) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingCategories: true });

    const params = new URLSearchParams();

    if (filters) {
      if (filters.medecinId)
        params.append("medecinId", String(filters.medecinId));
      if (filters.category) params.append("category", filters.category);
      if (filters.date) params.append("date", filters.date);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    try {
      const response = await axios.get(
        `${config.mintClient}categories/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        Categories: response.data.data,
        count: response.data.meta.total,
        loadingCategories: false,
      });
    } catch (error) {
      console.error("Error fetching Categories:", error);
      set({ loadingCategories: false });
    }
  },
}));

export default useStoreCategories;
