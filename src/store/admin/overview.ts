// src/store/useStoreOverview.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface OverviewState {
  Overview: any | null;
  loadingOverview: boolean;
  error: string | null;
  fetchOverview: () => Promise<void>;
}

const useStoreOverview = create<OverviewState>((set) => ({
  Overview: null,
  loadingOverview: false,
  error: null,

  fetchOverview: async () => {
    const savedState = localStorage.getItem("token");

    const token = savedState;

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    console.log("savedState",savedState )

    set({ loadingOverview: true, error: null });
    try {
      const configure = {
        method: "get" as const,
        maxBodyLength: Infinity,

        url: `${config.mintClient}admins/stats/overview`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(configure);

      console.log("response", response);

      set({
        Overview: response.data,
        loadingOverview: false,
      });
    } catch (error: any) {
      set({
        error: error.message || "Erreur inconnue",
        loadingOverview: false,
      });
    }
  },
}));

export default useStoreOverview;
