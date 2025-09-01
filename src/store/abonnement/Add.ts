import config from "src/config/config.dev";
import { create } from "zustand";
// import { user } from "../parrtial";

interface addAbonnementState {
  addAbonnement: (input: any) => Promise<void>;
  addAbonnementResponse: any | null;
  loading: boolean;
}

const useAddessaddAbonnementStore = create<addAbonnementState>((set) => ({
  addAbonnementResponse: null,
  loading: false,

  addAbonnement: async (input: any) => {
    const savedState = JSON.parse(
      localStorage.getItem("token") || "{}"
    );

    console.log(savedState.accessToken);

    const token = savedState.accessToken;

    set({ loading: true });

    try {
      const response = await fetch(`${config.mintClient + "abonnements/"}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
          // "Content-Type": "multipart/form-data",
        },
        body: input,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add addAbonnement address: ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ addAbonnementResponse: data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding addAbonnement address:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      set({ loading: false });
    }
  },
}));

export default useAddessaddAbonnementStore;
