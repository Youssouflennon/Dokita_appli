import config from "src/config/config.dev";
import { create } from "zustand";
// import { user } from "../parrtial";

interface addVideoState {
  addVideo: (input: any) => Promise<void>;
  addVideoResponse: any | null;
  loading: boolean;
}

const useAddessaddVideoStore = create<addVideoState>((set) => ({
  addVideoResponse: null,
  loading: false,

  addVideo: async (input: any) => {
    const savedState = JSON.parse(
      localStorage.getItem("token") || "{}"
    );

    console.log(savedState.accessToken);

    const token = savedState.accessToken;

    set({ loading: true });

    try {
      const response = await fetch(`${config.mintClient + "videos/"}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
          // "Content-Type": "multipart/form-data",
        },
        body: input,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add addVideo address: ${response.statusText}`
        );
      }

      const data = await response.json();
      set({ addVideoResponse: data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding addVideo address:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      set({ loading: false });
    }
  },
}));

export default useAddessaddVideoStore;
