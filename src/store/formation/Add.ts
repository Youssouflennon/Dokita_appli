import config from "src/config/config.dev";
import { create } from "zustand";

interface addCategoriestate {
  addFormation: (input: any) => Promise<void>;
  addFormationResponse: any | null;
  loading: boolean;
}

const useAddessaddCategoriestore = create<addCategoriestate>((set) => ({
  addFormationResponse: null,
  loading: false,

  addFormation: async (input) => {
    const token = localStorage.getItem("token");
    set({ loading: true });

    try {
      const response = await fetch(
        `${config.mintClient}formations-continues/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input), // ✅ Envoi JSON direct
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add formation: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ addFormationResponse: data, loading: false });
    } catch (error) {
      console.error("Error adding formation:", error);
      set({ loading: false });
    }
  },
}));

export default useAddessaddCategoriestore;
