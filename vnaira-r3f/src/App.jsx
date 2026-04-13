import { useState } from "react";
import Scene from "./components/Scene";
import ColorPicker from "./components/ColorPicker";
import MaterialSelector from "./components/MaterialSelector";
import ProductInfo from "./components/ProductInfo";
import "./index.css";

function App() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("cotton");
  const [zoomDelta, setZoomDelta] = useState(0);

  const handleZoomIn = () => setZoomDelta((d) => d + 1);
  const handleZoomOut = () => setZoomDelta((d) => d - 1);

  return (
    <div className="flex h-screen w-screen bg-[#0f0f0f]">
      {/* Left: 3D Scene */}
      <div className="relative flex-1 p-3 min-w-0">
        <Scene
          selectedColor={selectedColor}
          selectedMaterial={selectedMaterial}
          zoomDelta={zoomDelta}
        />

        {/* Zoom +/- buttons */}
        <div className="absolute bottom-6 left-6 flex gap-2 z-20">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xl font-bold
                       hover:bg-black/70 active:scale-95 transition-all cursor-pointer
                       border border-white/15 flex items-center justify-center"
          >
            &minus;
          </button>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xl font-bold
                       hover:bg-black/70 active:scale-95 transition-all cursor-pointer
                       border border-white/15 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Right: Controls Panel */}
      <div className="w-[380px] shrink-0 flex flex-col p-3 pl-0 gap-3 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 px-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">
            Vnaira Configurator
          </span>
        </div>

        {/* Color Picker */}
        <ColorPicker
          selectedColor={selectedColor || "#FFFFFF"}
          onColorChange={setSelectedColor}
        />

        {/* Material Selector */}
        <MaterialSelector
          selectedMaterial={selectedMaterial}
          onMaterialChange={setSelectedMaterial}
        />

        {/* Product Info */}
        <div className="flex-1">
          <ProductInfo
            selectedColor={selectedColor || "#FFFFFF"}
            selectedMaterial={selectedMaterial}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
