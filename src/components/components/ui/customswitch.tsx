import React from "react";

type CustomSwitchProps = {
  label: string;
  enabled: boolean;
  onChange: (newState: boolean) => void;
};

export function CustomSwitch({ label, enabled, onChange }: CustomSwitchProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!enabled)}
        className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
          enabled ? "bg-purple-600" : ""
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            enabled ? "translate-x-5" : ""
          }`}
        ></div>
      </div>
      <span className="bg-green-200 text-green-700 p-1 rounded-full">{label}</span>

    </label>
  );
}
