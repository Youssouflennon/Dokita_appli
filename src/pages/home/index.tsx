import TotalLoad from "../../components/components/totalLoad";
import { ArrowUpRight, Banknote, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mois: "Jan", profit: 4000 },
  { mois: "Fév", profit: 3200 },
  { mois: "Mar", profit: 4500 },
  { mois: "Avr", profit: 3000 },
  { mois: "Mai", profit: 5000 },
  { mois: "Juin", profit: 4700 },
  { mois: "Juil", profit: 5300 },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simule un chargement pendant 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Nettoyage
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TotalLoad />;
  }
  return (
    <div>
      <div className="bg-gray-100 p-6 mt-14  h-screen">
        {/* Header */}

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <CardStat
            title="Nombre total de Médecins"
            total={150}
            growth="10.5%"
            growthPositive={true}
            monthlyChange="+23"
            onClick={() => navigate("/doctors")}
          />

          <CardStat
            title="Nombre total de Patients"
            total={150}
            growth="10.5%"
            growthPositive={true}
            monthlyChange="+23"
            onClick={() => navigate("/patients")}
          />
          <CardRdvStat
            title="Nombres total des rendez vous"
            activeCount={234}
            expiredCount={67}
            onClick={() => navigate("/rendez_vous")}
          />
          <CardRdvStat
            title="Transactions"
            activeCount={234}
            expiredCount={67}
            onClick={() => navigate("/transaction")}
          />
        </div>

        {/* Revenus et transactions */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between">
            <div>
              <p className="text-sm text-green-500 font-semibold">
                📈 Revenues
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                86,044,700 F CFA
              </h2>
              <p className="text-sm text-gray-400">De 50,000 XAF</p>
            </div>

            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>

          <div className="flex justify-between bg-white p-4 rounded-lg shadow-sm border">
            <div>
              <p className="text-sm text-yellow-500 font-semibold">
                📉 Moy. Transactions
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                6,144,800 F CFA
              </h2>
              <p className="text-sm text-gray-400">Sur 6 mois</p>
            </div>

            <Banknote className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* Bas: Top médecins + Graphique */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top médecins */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-4">Top médecins</h3>
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/docta.png"
                    alt="Doctor"
                    className="w-10 h-10 rounded-full object-cover bg-cover"
                  />
                  <div>
                    <p className="font-medium">Nana Momo Nene</p>
                    <p className="text-sm text-gray-500">
                      Cardiologue | Hôpital Général
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 font-bold">
                  5 <FaArrowUp className="ml-1 text-xs" />
                </div>
              </div>
            ))}
          </div>

          {/* Graphique placeholder */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-4">Total Profit</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

type CardStatProps = {
  title: string;
  total: number;
  growth: string;
  onClick?: () => void;
  growthPositive?: boolean;
  monthlyChange: string;
};

function CardStat({
  title,
  total,
  growth,
  onClick,
  growthPositive = true,
  monthlyChange,
}: CardStatProps) {
  return (
    <div
      className="bg-gray-50 rounded-xl shadow-sm border p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-md border p-2 ">
        <p className="text-sm text-gray-600">{title}</p>

        <div className="flex items-center gap-2 mt-1 ">
          <span className="text-2xl font-semibold text-gray-900">{total}</span>
          <span
            className={`flex items-center gap-1 ${
              growthPositive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            } text-xs font-medium px-2 py-0.5 rounded-full`}
          >
            <ArrowUpRight className="w-3 h-3" />
            {growth}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {monthlyChange} <span className="ml-1">le dernier mois</span>
      </p>
    </div>
  );
}

type CardRdvStatProps = {
  title: string;
  activeCount: number;
  expiredCount: number;
  onClick?: () => void;
};

function CardRdvStat({
  title,
  activeCount,
  expiredCount,
  onClick,
}: CardRdvStatProps) {
  return (
    <div
      className="bg-gray-50 rounded-xl shadow-sm border p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-md border p-2 ">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              {activeCount}
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
              Actifs
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">
              {expiredCount}
            </span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
              Expirés
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
