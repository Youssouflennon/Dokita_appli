// src/store/useStoreAllFormation.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  categoryId?: string;
  page?: number;
  limit?: number;
  search?: string;
}

interface AllFormationState {
  AllFormation: any[];
  count: number;
  loadingAllFormation: boolean;
  fetchAllFormation: (filters?: UserFilters) => Promise<void>;
}

const useStoreAllFormation = create<AllFormationState>((set, get) => ({
  AllFormation: [],
  loadingAllFormation: false,
  count: 0,

  fetchAllFormation: async (filters?: UserFilters) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAllFormation: true });

    const params = new URLSearchParams();
    if (filters) {
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
      if (filters.search) params.append("search", filters.search);
    }

    try {
      const response = await axios.get(
        `${config.mintClient}formations-continues/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.data);
      set({
        AllFormation: response.data.data,
        count: response.data.meta.total,
        loadingAllFormation: false,
      });
    } catch (error) {
      console.error("Error fetching AllFormation:", error);
      set({ loadingAllFormation: false });
    }
  },
}));

export default useStoreAllFormation;
