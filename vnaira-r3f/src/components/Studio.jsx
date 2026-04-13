export default function Studio() {
  const roomW = 8, roomD = 8, roomH = 5;

  return (
    <group>
      {/* Floor — muted warm gray */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial color="#b5b0ab" roughness={0.5} metalness={0} />
      </mesh>

      {/* Back wall — soft warm off-white */}
      <mesh position={[0, roomH / 2, roomD / 2]}>
        <planeGeometry args={[roomW, roomH]} />
        <meshStandardMaterial color="#d8d5d0" roughness={0.9} metalness={0} side={2} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-roomW / 2, roomH / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial color="#d8d5d0" roughness={0.9} metalness={0} side={2} />
      </mesh>

      {/* Right wall */}
      <mesh position={[roomW / 2, roomH / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial color="#d8d5d0" roughness={0.9} metalness={0} side={2} />
      </mesh>

      {/* Ceiling — muted */}
      <mesh position={[0, roomH, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.95} metalness={0} />
      </mesh>

      {/* Circular platform */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.08, 64]} />
        <meshStandardMaterial color="#d5d5d8" roughness={0.2} metalness={0.02} />
      </mesh>
    </group>
  );
}
