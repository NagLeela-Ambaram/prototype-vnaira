import { useState, useEffect, useCallback } from "react";
import { useUnityContext } from "react-unity-webgl";
import UnityViewer from "./components/UnityViewer";
import ColorPicker from "./components/ColorPicker";
import MaterialSelector from "./components/MaterialSelector";
import ProductInfo from "./components/ProductInfo";
import "./index.css";

function App() {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedMaterial, setSelectedMaterial] = useState("cotton");
  const [tshirtReady, setTshirtReady] = useState(false);

  const { unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded } =
    useUnityContext({
      loaderUrl: "/unity-build/Build/unity-build.loader.js",
      dataUrl: "/unity-build/Build/unity-build.data.br",
      frameworkUrl: "/unity-build/Build/unity-build.framework.js.br",
      codeUrl: "/unity-build/Build/unity-build.wasm.br",
      streamingAssetsUrl: "/unity-build/StreamingAssets",
    });

  // Listen for t-shirt loaded event from Unity
  const handleTshirtLoaded = useCallback(() => {
    setTshirtReady(true);
    console.log("[React] T-shirt loaded in Unity, controls enabled.");
  }, []);

  useEffect(() => {
    addEventListener("tshirtLoaded", handleTshirtLoaded);
    return () => removeEventListener("tshirtLoaded", handleTshirtLoaded);
  }, [addEventListener, removeEventListener, handleTshirtLoaded]);

  // Also enable controls after a timeout as fallback
  useEffect(() => {
    if (isLoaded && !tshirtReady) {
      const timer = setTimeout(() => setTshirtReady(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, tshirtReady]);

  const handleColorChange = (hex) => {
    setSelectedColor(hex);
    if (isLoaded) {
      sendMessage("WebBridge", "SetColor", hex);
    }
  };

  const handleMaterialChange = (materialId) => {
    setSelectedMaterial(materialId);
    if (isLoaded) {
      sendMessage("WebBridge", "SetMaterial", materialId);
    }
  };

  const handleZoomIn = () => {
    if (isLoaded) sendMessage("Main Camera", "ZoomIn");
  };

  const handleZoomOut = () => {
    if (isLoaded) sendMessage("Main Camera", "ZoomOut");
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f0f0f]">
      {/* Left: Unity 3D Viewer */}
      <div className="flex-1 p-3 min-w-0">
        <UnityViewer
          unityProvider={unityProvider}
          isLoaded={isLoaded}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
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
        <div className={`transition-opacity ${tshirtReady ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={handleColorChange}
          />
        </div>

        {/* Material Selector */}
        <div className={`transition-opacity ${tshirtReady ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <MaterialSelector
            selectedMaterial={selectedMaterial}
            onMaterialChange={handleMaterialChange}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <ProductInfo
            selectedColor={selectedColor}
            selectedMaterial={selectedMaterial}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
