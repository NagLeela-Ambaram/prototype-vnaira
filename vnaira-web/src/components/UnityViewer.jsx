import { Unity } from "react-unity-webgl";

export default function UnityViewer({ unityProvider, isLoaded, onZoomIn, onZoomOut }) {
  return (
    <div className="relative w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#1a1a1a]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white/50 text-sm">Loading 3D Fitting Room...</p>
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100%",
          height: "100%",
          visibility: isLoaded ? "visible" : "hidden",
        }}
      />

      {/* Zoom +/- buttons */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 flex gap-2 z-20">
          <button
            onClick={onZoomOut}
            className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xl font-bold
                       hover:bg-black/70 active:scale-95 transition-all cursor-pointer
                       border border-white/15 flex items-center justify-center"
          >
            &minus;
          </button>
          <button
            onClick={onZoomIn}
            className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xl font-bold
                       hover:bg-black/70 active:scale-95 transition-all cursor-pointer
                       border border-white/15 flex items-center justify-center"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
