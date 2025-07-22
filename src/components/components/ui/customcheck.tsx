import React from "react";

type CustomCheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CustomCheckbox({
  label,
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <label className="inline-flex items-center cursor-pointer gap-2">
      <input
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center transition-colors">
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-gray-800">{label}</span>
    </label>
  );
}
