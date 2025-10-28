import config from "src/config/config.dev";
import { create } from "zustand";

interface PaludismeFormState {
  submitForm: (input: any) => Promise<void>;
  response: any | null;
  loading: boolean;
}

const usePaludismeFormStore = create<PaludismeFormState>((set) => ({
  response: null,
  loading: false,

  submitForm: async (input: any) => {
    const token = localStorage.getItem("token");

    set({ loading: true });

    try {
      const response = await fetch(`${config.mintClient}paludisme/anamnese/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ On envoie du JSON ici
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to submit: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ response: data, loading: false });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      set({ loading: false });
    }
  },
}));

export default usePaludismeFormStore;
