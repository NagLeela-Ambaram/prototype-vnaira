import { useState } from "react";

const COLOR_GROUPS = [
  {
    label: "Neutrals",
    colors: [
      { hex: "#FFFFFF", name: "White" },
      { hex: "#F5F5F0", name: "Off White" },
      { hex: "#C8B8A6", name: "Sand" },
      { hex: "#808080", name: "Gray" },
      { hex: "#404040", name: "Charcoal" },
      { hex: "#1A1A1A", name: "Black" },
    ],
  },
  {
    label: "Warm",
    colors: [
      { hex: "#E74C3C", name: "Red" },
      { hex: "#FF6B4A", name: "Coral" },
      { hex: "#F39C12", name: "Amber" },
      { hex: "#D4A373", name: "Camel" },
      { hex: "#C0392B", name: "Burgundy" },
      { hex: "#E8985E", name: "Terracotta" },
    ],
  },
  {
    label: "Cool",
    colors: [
      { hex: "#2C3E7B", name: "Navy" },
      { hex: "#3498DB", name: "Sky Blue" },
      { hex: "#1ABC9C", name: "Teal" },
      { hex: "#2ECC71", name: "Emerald" },
      { hex: "#5B2C6F", name: "Plum" },
      { hex: "#6C5CE7", name: "Violet" },
    ],
  },
  {
    label: "Pastels",
    colors: [
      { hex: "#F8B4C8", name: "Blush" },
      { hex: "#B4D4F8", name: "Baby Blue" },
      { hex: "#C8F8B4", name: "Mint" },
      { hex: "#F8E8B4", name: "Butter" },
      { hex: "#E8C8F8", name: "Lavender" },
      { hex: "#F8D4B4", name: "Peach" },
    ],
  },
];

export default function ColorPicker({ selectedColor, onColorChange }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border-2 border-white/30 shadow-inner"
            style={{ backgroundColor: selectedColor }}
          />
          <h3 className="text-white font-semibold text-sm tracking-wide uppercase">
            Color
          </h3>
        </div>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="space-y-3">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1.5">
                {group.label}
              </p>
              <div className="flex gap-2 flex-wrap">
                {group.colors.map((color) => (
                  <button
                    key={color.hex}
                    title={color.name}
                    onClick={() => onColorChange(color.hex)}
                    className={`w-8 h-8 rounded-lg cursor-pointer transition-all duration-150 hover:scale-110 ${
                      selectedColor === color.hex
                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a] scale-110"
                        : "ring-1 ring-white/15 hover:ring-white/40"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
