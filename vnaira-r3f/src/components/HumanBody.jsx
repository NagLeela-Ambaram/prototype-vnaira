import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const SKIN_COLOR = new THREE.Color(0.84, 0.67, 0.55);
const DENIM_COLOR = new THREE.Color(0.16, 0.22, 0.42);

export default function HumanBody() {
  const { scene } = useGLTF("/models/humanbody.glb");
  const groupRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        if (name.includes("pants") || name.includes("pant")) {
          child.material = new THREE.MeshStandardMaterial({
            color: DENIM_COLOR,
            roughness: 0.8,
            metalness: 0,
            side: THREE.DoubleSide,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: SKIN_COLOR,
            roughness: 0.65,
            metalness: 0,
            side: THREE.DoubleSide,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} position={[0, 0.1, 0]} scale={[0.1, 0.1, 0.1]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/humanbody.glb");
