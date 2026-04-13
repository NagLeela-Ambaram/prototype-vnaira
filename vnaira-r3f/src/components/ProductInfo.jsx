export default function ProductInfo({ selectedColor, selectedMaterial }) {
  const materialNames = {
    cotton: "100% Organic Cotton",
    nylon: "Premium Nylon Blend",
    wool: "Merino Wool",
  };

  const materialDetails = {
    cotton: "Lightweight and breathable. Pre-shrunk, machine washable at 30\u00B0C. Ideal for everyday wear.",
    nylon: "Quick-dry, wrinkle-resistant fabric with a sleek finish. Perfect for active lifestyles and travel.",
    wool: "Temperature-regulating merino wool that stays fresh longer. Naturally odor-resistant. Hand wash recommended.",
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-lg">Oversized T-Shirt</h3>
          <p className="text-white/40 text-xs mt-0.5">
            {materialNames[selectedMaterial] || "Premium Fabric"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">$49.00</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3 mb-3">
        <p className="text-white/50 text-xs leading-relaxed">
          A modern oversized silhouette crafted for effortless style. Dropped shoulders, relaxed fit through the body, and a clean finished hem.
        </p>
      </div>

      <div className="border-t border-white/10 pt-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Fabric</span>
          <span className="text-white/60">{materialNames[selectedMaterial]}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Fit</span>
          <span className="text-white/60">Oversized / Unisex</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Sizes</span>
          <span className="text-white/60">XS \u2013 3XL</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/30">Care</span>
          <span className="text-white/60">
            {selectedMaterial === "wool" ? "Hand wash" : "Machine wash 30\u00B0C"}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <p className="text-white/30 text-[10px] leading-relaxed">
          {materialDetails[selectedMaterial]}
        </p>
      </div>
    </div>
  );
}
