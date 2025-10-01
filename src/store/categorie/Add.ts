import config from "src/config/config.dev";
import { create } from "zustand";
// import { user } from "../parrtial";

interface addCategoriestate {
  addCategory: (input: any) => Promise<void>;
  addCategoryResponse: any | null;
  loading: boolean;
}

const useAddessaddCategoriestore = create<addCategoriestate>((set) => ({
  addCategoryResponse: null,
  loading: false,

  addCategory: async (input: any) => {
   

    const token = localStorage.getItem("token");

    set({ loading: true });

    try {
      const response = await fetch(`${config.mintClient}categories/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // obligatoire pour JSON
        },
        body: JSON.stringify(input), // conversion objet → JSON
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add addCategory address: ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ addCategoryResponse: data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding addCategory address:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      set({ loading: false });
    }
  },
}));

export default useAddessaddCategoriestore;
