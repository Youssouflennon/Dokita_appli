// src/store/useStoreVideos.ts
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

interface VideosState {
  Videos: any[];
  count: number;
  loadingVideos: boolean;
  fetchVideos: (filters?: VideoFilters) => Promise<void>;
}

const useStoreVideos = create<VideosState>((set) => ({
  Videos: [],
  loadingVideos: false,
  count: 0,

  fetchVideos: async (filters?: VideoFilters) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingVideos: true });

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
        `${config.mintClient}videos/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        Videos: response.data.items,
        count: response.data.meta.total,
        loadingVideos: false,
      });
    } catch (error) {
      console.error("Error fetching Videos:", error);
      set({ loadingVideos: false });
    }
  },
}));

export default useStoreVideos;
