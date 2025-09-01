import React from "react";

type CustomSwitchProps = {
  enabled: boolean; // true = Actif, false = Bloqué
  onChange: (newState: boolean) => void;
};

export function CustomSwitch({ enabled, onChange }: CustomSwitchProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {/* Switch */}
      <div
        onClick={() => onChange(!enabled)}
        className={`w-11 h-6 flex items-center rounded-full p-1 duration-300 ${
          enabled ? "bg-green-400" : "bg-red-400"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            enabled ? "translate-x-5" : ""
          }`}
        ></div>
      </div>

      {/* Label */}
      <span
        className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
          enabled ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {enabled ? "Actif" : "Bloqué"}
      </span>
    </label>
  );
}
