import { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MATERIAL_PRESETS = {
  cotton: { roughness: 0.75, metalness: 0, normalScale: 1.0 },
  nylon: { roughness: 0.25, metalness: 0.05, normalScale: 0.3 },
  wool: { roughness: 0.85, metalness: 0, normalScale: 1.5 },
};

const WHITE_TEX = (() => {
  const t = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  t.needsUpdate = true;
  return t;
})();

export default function TShirt({ color = null, materialType = "cotton" }) {
  const { scene } = useGLTF("/models/t-shirt.gltf");
  const groupRef = useRef();
  const originalMaps = useRef(new Map());

  // Store original texture maps on first load
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        if (!originalMaps.current.has(child.uuid)) {
          originalMaps.current.set(child.uuid, {
            map: mat.map,
            normalMap: mat.normalMap,
            roughnessMap: mat.roughnessMap,
            metalnessMap: mat.metalnessMap,
            aoMap: mat.aoMap,
          });
        }
        mat.side = THREE.DoubleSide;
        child.castShadow = true;
      }
    });
  }, [scene]);

  // Apply color changes
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        const orig = originalMaps.current.get(child.uuid);

        if (color) {
          // User picked a color — use solid color, replace diffuse with white
          mat.map = WHITE_TEX;
          mat.color = new THREE.Color(color);
        } else if (orig) {
          // No color selected — restore original diffuse texture
          mat.map = orig.map;
          mat.color = new THREE.Color(1, 1, 1);
        }
        mat.needsUpdate = true;
      }
    });
  }, [color, scene]);

  // Apply material type changes
  useEffect(() => {
    const preset = MATERIAL_PRESETS[materialType] || MATERIAL_PRESETS.cotton;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        mat.roughness = preset.roughness;
        mat.metalness = preset.metalness;
        if (mat.normalMap && mat.normalScale) {
          mat.normalScale.set(preset.normalScale, preset.normalScale);
        }
        mat.needsUpdate = true;
      }
    });
  }, [materialType, scene]);

  return (
    <group ref={groupRef} position={[0, 0.1, 0]} scale={[0.1, 0.1, 0.1]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/t-shirt.gltf");
