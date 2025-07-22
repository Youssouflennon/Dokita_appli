import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaBell,
  FaUserCog,
  FaThLarge,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaCreditCard,
  FaSyncAlt,
  FaFileAlt,
  FaChalkboardTeacher,
  FaVideo,
  FaPrescriptionBottleAlt,
  FaCog,
  FaUser,
  FaDotCircle,
} from "react-icons/fa";
import { useTranslation } from "../hooks/useTranslation";
import { useAuthStore } from "src/store/authStore";
import { hasPermission } from "src/helpers/permissions";
import { useThemeStore } from "src/store/themeStore";

const SideBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const user = useAuthStore((state) => state.user);
  const permissions: any = user?.permissions;

  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Assure que la classe "dark" est appliquée au chargement
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const items = [
    {
      name: "Dashboard",
      pathname: "/",
      icon: <FaThLarge />,
      subItems: [],
    },
    {
      name: "Patients",
      pathname: "/patients",
      icon: (
        <div className="relative">
          <FaUser />
          <FaDotCircle className="absolute -top-1 -right-1 text-yellow-400 text-[8px]" />
        </div>
      ),
      subItems: [],
    },
    {
      name: "Docteurs",
      pathname: "/doctors",
      icon: <FaUserMd />,
      subItems: [],
    },
    {
      name: "Abonnements",
      pathname: "/abonnement",
      icon: <FaCreditCard />,
      subItems: [],
    },
    {
      name: "Rendez vous",
      pathname: "/rendez_vous",
      icon: <FaCalendarCheck />,
      subItems: [],
    },
    {
      name: "Transactions",
      pathname: "/transaction",
      icon: <FaCreditCard />,
      subItems: [],
    },
    {
      name: "Synchronisation",
      pathname: "/synchronisation",
      icon: <FaSyncAlt />,
      subItems: [],
    },
    {
      name: "Message structurés",
      pathname: "/message_structure",
      icon: <FaFileAlt />,
      subItems: [],
    },
    {
      name: "Formation Continue",
      pathname: "/formation",
      icon: <FaChalkboardTeacher />,
      subItems: [],
    },
    {
      name: "Vidéos Educatives",
      pathname: "/videos",
      icon: <FaVideo />,
      subItems: [],
    },
    {
      name: "Ordonnance",
      pathname: "/ordonnance",
      icon: <FaPrescriptionBottleAlt />,
      subItems: [],
    },
    {
      name: "Settings",
      pathname: "/settings",
      icon: <FaCog />,
      subItems: [
        { name: t("button.add"), pathname: "/addRole" },
        { name: t("button.list"), pathname: "/listRole" },
      ],
    },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-primary py-6 px-4 dark:bg-[#1d0553]">
      <div className="h-full w-full flex flex-col py-6 px-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Avatar"
              className="w-10 h-10 flex items-center"
            />

            <span className="text-xl text-white font-bold">Dokita</span>
          </div>
        </div>

        <div className="h-px bg-gray-300 my-9 w-full" />

        <div
          className="flex-1 flex flex-col gap-4 overflow-y-auto"
          // style={{ marginTop: "70%" }}
        >
          {items.map((item, index) => {
            /*   if (
              item.permission &&
              !hasPermission(permissions, item.permission)
            ) {
              return null;
            } */

            return (
              <div key={index} className="flex flex-col">
                <div
                  onClick={() => {
                    if (item.subItems.length > 0) {
                      toggleMenu(item.name);
                    } else {
                      navigate(item.pathname);
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer ${
                    location.pathname === item.pathname
                      ? "text-yellow-400"
                      : "hover:text-yellow-300 text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon} <span className="text-sm">{item.name}</span>
                  </div>
                  {item.subItems.length > 0 && (
                    <span className="text-sm">
                      {openMenus[item.name] ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  )}
                </div>

                {item.subItems.length > 0 && openMenus[item.name] && (
                  <div className="ml-6 mt-2 flex flex-col gap-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => navigate(subItem.pathname)}
                        className={`px-4 py-2 rounded-md cursor-pointer ${
                          location.pathname === subItem.pathname
                            ? "bg-white text-purple-700"
                            : "hover:bg-gray-100 text-white hover:text-purple-700"
                        }`}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
