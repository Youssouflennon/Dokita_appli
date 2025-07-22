import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icônes de react-icons
import Header from "../header";
import SideBar from "../sideBar";
import { useThemeStore } from "src/store/themeStore";
import { ScrollArea } from "../components/ui/scroll-area";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Assure que la classe "dark" est appliquée au chargement
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex w-screen h-screen">
      {/* Header */}
      <header className="">
        {/* Bouton hamburger pour ouvrir le menu en mobile */}

        <div className="hidden md:flex w-[250px] h-full bg-white border-r shadow-sm z-10">
        <SideBar />
        </div>
      </header>

      <main className="flex flex-col w-screen h-screen">
        {/* Sidebar pour écran large */}

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-200 transition bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars size={24} />
        </button>
        <div className="">
          <Header />
        </div>

        {/* Sidebar Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="w-[250px] h-full bg-white shadow-lg p-4 absolute left-0 top-0 transition-transform transform"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique dedans
            >
              {/* Bouton de fermeture */}
              <button
                className="p-2 rounded-md hover:bg-gray-200 transition bg-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes size={24} />
              </button>
              <SideBar />
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <ScrollArea className="bg-gray-100">
          <Outlet />
        </ScrollArea>
      </main>
    </div>
  );
};

export default MainLayout;
