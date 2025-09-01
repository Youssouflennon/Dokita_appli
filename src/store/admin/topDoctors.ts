// src/store/useStoreTopDoctors.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface TopDoctorsState {
  TopDoctors: any[];
  count: number;
  loadingTopDoctors: boolean;
  fetchTopDoctors: () => Promise<void>;
}

const useStoreTopDoctors = create<TopDoctorsState>((set) => ({
  TopDoctors: [],
  loadingTopDoctors: false,
  count: 0,

  fetchTopDoctors: async () => {
    const savedState = localStorage.getItem("token");

    const token = savedState;

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingTopDoctors: true });

    try {
      const response = await axios.get(
        `${config.mintClient}admins/stats/top-doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        TopDoctors: response.data.items,
        count: response.data.count,
        loadingTopDoctors: false,
      });
    } catch (error) {
      console.error("Error fetching TopDoctors:", error);
      set({ loadingTopDoctors: false });
    }
  },
}));

export default useStoreTopDoctors;
