// src/store/useStoreAllReservation.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  status?: "PENDING" | "COMPLETED" | "CANCELLED";
  type?: "CALL" | "IN_PERSON";
  page?: number;
  limit?: number;
  medecinId?: number;
  patientId?: number;
  q?: string;
  date?: string; // ISO ou format attendu par ton backend
}

interface AllReservationState {
  AllReservation: any[];
  count: number;
  loadingAllReservation: boolean;
  fetchAllReservation: (filters?: UserFilters) => Promise<void>;
}

const useStoreAllReservation = create<AllReservationState>((set, get) => ({
  AllReservation: [],
  loadingAllReservation: false,
  count: 0,

  fetchAllReservation: async (filters?: UserFilters) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAllReservation: true });

    const params = new URLSearchParams();
    if (filters) {
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("status", filters.type);
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
      if (filters.medecinId) params.append("page", String(filters.medecinId));
      if (filters.patientId) params.append("limit", String(filters.patientId));
      if (filters.q) params.append("q", filters.q);
      if (filters.date) params.append("date", filters.date);
    }

    try {
      const response = await axios.get(
        `${config.mintClient}reservations/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        AllReservation: response.data.items,
        count: response.data.meta.total,
        loadingAllReservation: false,
      });
    } catch (error) {
      console.error("Error fetching AllReservation:", error);
      set({ loadingAllReservation: false });
    }
  },
}));

export default useStoreAllReservation;
