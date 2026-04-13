const MATERIALS = [
  {
    id: "cotton",
    name: "Cotton",
    description: "Soft, breathable, natural texture",
    icon: "\uD83C\uDF3E",
  },
  {
    id: "nylon",
    name: "Nylon",
    description: "Smooth, shiny, athletic feel",
    icon: "\u2728",
  },
  {
    id: "wool",
    name: "Wool",
    description: "Warm, textured, cozy finish",
    icon: "\uD83E\uDDF6",
  },
];

export default function MaterialSelector({ selectedMaterial, onMaterialChange }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-3">
        Material
      </h3>

      <div className="space-y-2">
        {MATERIALS.map((mat) => (
          <button
            key={mat.id}
            onClick={() => onMaterialChange(mat.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 text-left ${
              selectedMaterial === mat.id
                ? "bg-white/15 ring-1 ring-white/30"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <span className="text-xl">{mat.icon}</span>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  selectedMaterial === mat.id ? "text-white" : "text-white/80"
                }`}
              >
                {mat.name}
              </p>
              <p className="text-[11px] text-white/40">{mat.description}</p>
            </div>
            {selectedMaterial === mat.id && (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
