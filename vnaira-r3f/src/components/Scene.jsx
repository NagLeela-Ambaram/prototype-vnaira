import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Suspense, useRef, useImperativeHandle, forwardRef } from "react";
import Studio from "./Studio";
import HumanBody from "./HumanBody";
import TShirt from "./TShirt";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.9} color="#c0c0c8" />

      <directionalLight
        position={[-2.5, 4, -2.5]}
        intensity={0.8}
        color="#fff4e8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.001}
        shadow-normalBias={0.02}
      />

      <directionalLight
        position={[2.5, 3.5, -2]}
        intensity={0.5}
        color="#dde4f0"
      />

      <directionalLight
        position={[0, 4, 3]}
        intensity={0.25}
        color="#ffffff"
      />
    </>
  );
}

function CameraZoomer({ zoomDelta }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Apply zoom when zoomDelta changes
  if (zoomDelta !== 0 && camera) {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const newPos = camera.position.clone().addScaledVector(dir, zoomDelta * 0.3);
    // Clamp distance from target
    const target = new THREE.Vector3(0, 1.1, 0);
    const dist = newPos.distanceTo(target);
    if (dist >= 1.5 && dist <= 6) {
      camera.position.copy(newPos);
    }
  }

  return null;
}

const Scene = forwardRef(function Scene({ selectedColor, selectedMaterial, zoomDelta }, ref) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.4, 3], fov: 35, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
    >
      <color attach="background" args={["#dddbd8"]} />

      <Suspense fallback={null}>
        <Lights />
        <Studio />
        <HumanBody />
        <TShirt
          color={selectedColor}
          materialType={selectedMaterial}
        />
      </Suspense>

      <CameraZoomer zoomDelta={zoomDelta} />

      <OrbitControls
        target={[0, 1.1, 0]}
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI * 0.05}
        maxPolarAngle={Math.PI * 0.45}
        autoRotate
        autoRotateSpeed={1.5}
        enableDamping
        dampingFactor={0.08}
      />

      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.2} />
      </EffectComposer>
    </Canvas>
  );
});

export default Scene;
