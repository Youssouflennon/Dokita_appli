import config from "src/config/config.dev";
import { create } from "zustand";

interface addCategoriestate {
  addFormation: (input: FormData) => Promise<void>;
  addFormationResponse: any | null;
  loading: boolean;
}

const useAddessaddCategoriestore = create<addCategoriestate>((set) => ({
  addFormationResponse: null,
  loading: false,

  addFormation: async (input: FormData) => {
    const token = localStorage.getItem("token");

    set({ loading: true });

    try {
      const response = await fetch(`${config.mintClient}formations-continues/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ⚡️ PAS de Content-Type ici
        },
        body: input, // ✅ on envoie directement le FormData
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add formation: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ addFormationResponse: data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding formation:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      set({ loading: false });
    }
  },
}));

export default useAddessaddCategoriestore;
