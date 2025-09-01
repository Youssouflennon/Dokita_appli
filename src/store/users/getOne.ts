// src/store/useStoreOneUser.ts
import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface VehicleState {
  OneUser: any; // L'état pour stocker les données de véhicules
  loadingOneUser: boolean; // Nouveau state pour suivre l'état du chargement
  fetchOneUser: (user_id: string) => Promise<void>; // Fonction pour récupérer les véhicules
}

const useStoreOneUser = create<VehicleState>((set) => ({
  OneUser: null,
  loadingOneUser: false,
  fetchOneUser: async (user_id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("User is not authenticated");
    }

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      return;
    }
    set({ loadingOneUser: true }); // Démarre le chargement
    try {
      const response = await axios.get(
        `${config.mintClient}users/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        }
      );
      set({ OneUser: response.data, loadingOneUser: false }); // Met à jour les données et arrête le chargement
    } catch (error) {
      console.error("Error fetching OneUser:", error);
      set({ loadingOneUser: false }); // Arrête le chargement en cas d'erreur
    }
  },
}));

export default useStoreOneUser;
