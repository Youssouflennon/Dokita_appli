// src/store/useStoreAllUsers.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface UserFilters {
  name?: string;
  userType?: "MEDECIN" | "PATIENT" | "ADMIN" | "SUPERADMIN";
  isBlock?: boolean;
  specialityId?: number | string;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  q?: string;
}

interface AllUsersState {
  AllUsers: any[];
  count: number;
  loadingAllUsers: boolean;
  fetchAllUsers: (filters?: UserFilters) => Promise<void>;
  updateUserStatus: (userId: string | number) => Promise<void>;
}

const useStoreAllUsers = create<AllUsersState>((set, get) => ({
  AllUsers: [],
  loadingAllUsers: false,
  count: 0,

  fetchAllUsers: async (filters?: UserFilters) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    set({ loadingAllUsers: true });

    const params = new URLSearchParams();
    if (filters) {
      if (filters.name) params.append("name", filters.name);
      if (filters.q) params.append("q", filters.q);
      if (filters.userType) params.append("userType", filters.userType);
      if (filters.isBlock !== undefined)
        params.append("isBlock", String(filters.isBlock));
      if (filters.specialityId)
        params.append("specialityId", String(filters.specialityId));
      if (filters.isVerified !== undefined)
        params.append("isVerified", String(filters.isVerified));
      if (filters.page) params.append("page", String(filters.page));
      if (filters.limit) params.append("limit", String(filters.limit));
    }

    try {
      const response = await axios.get(
        `${config.mintClient}users/?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        AllUsers: response.data.items1,
        count: response.data.meta.total,
        loadingAllUsers: false,
      });
    } catch (error) {
      console.error("Error fetching AllUsers:", error);
      set({ loadingAllUsers: false });
    }
  },

  updateUserStatus: async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }

    try {
      await axios.patch(
        `${config.mintClient}admins/users/${userId}/toggle-block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mettre à jour le state localement sans recharger la page
      set((state) => ({
        AllUsers: state.AllUsers.map((u) =>
          u.userId === userId ? { ...u, isBlock: !u.isBlock } : u
        ),
      }));
    } catch (error) {
      console.error("Erreur lors du blocage/déblocage :", error);
    }
  },
}));

export default useStoreAllUsers;
