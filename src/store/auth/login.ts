import config from "src/config/config.dev";
import { create } from "zustand";

interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginUserState {
  loginUser: (input: { phone: string; password: string }) => Promise<LoginResponse | null>;
  loginUserResponse: LoginResponse | null;
  loading: boolean;
  error: string | null;
}

const useAddessloginUserStore = create<LoginUserState>((set) => ({
  loginUserResponse: null,
  loading: false,
  error: null,

  loginUser: async (input) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${config.mintClient}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // obligatoire pour JSON
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Erreur de connexion: ${response.statusText}`);
      }

      const data: LoginResponse = await response.json();

      // On enregistre directement la réponse
      set({ loginUserResponse: data, loading: false });

      // On stocke aussi dans le localStorage si tu veux centraliser ici
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur login:", error.message);
        set({ error: error.message });
      } else {
        console.error("Erreur inconnue");
        set({ error: "Erreur inconnue" });
      }
      set({ loading: false });
      return null;
    }
  },
}));

export default useAddessloginUserStore;
