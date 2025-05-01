
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

interface SkillElementProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: [number, number, number];
  color: string;
}

// A single floating element of the skill
const SkillElement = ({ position, size, rotationSpeed, color }: SkillElementProps) => {
  const ref = useRef(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * rotationSpeed[0];
      ref.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed[1];
      ref.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed[2];
      
      // Small hover effect
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return (
    <mesh position={new Vector3(...position)} ref={ref}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3}
        roughness={0.6}
      />
    </mesh>
  );
};

export default SkillElement;
