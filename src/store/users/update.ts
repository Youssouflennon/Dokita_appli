import { create } from "zustand";
import axios from "axios";
import config from "src/config/config.dev";

interface VehicleState {
  updateUsers: (UserId: any, input: any) => Promise<void>;
}

const useStoreUpdateUser = create<VehicleState>(() => ({
  updateUsers: async (UserId, input) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token available. User might not be authenticated.");
      throw new Error("User is not authenticated");
    }

    try {
      await axios.patch(`${config.mintClient}users/patient/${UserId}`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(`Utilisateur ${UserId} mis à jour avec succès`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      throw error;
    }
  },
}));

export default useStoreUpdateUser;
