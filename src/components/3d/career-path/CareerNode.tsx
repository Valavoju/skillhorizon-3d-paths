
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Vector3 } from "three";

// Interactive floating node that represents a skill or career milestone
const CareerNode = ({ 
  position, 
  skill, 
  size = 1, 
  color = "#9B87F5", 
  onClick, 
  active, 
  id 
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      
      if (hovered || active) {
        ref.current.scale.set(1.1, 1.1, 1.1);
      } else {
        ref.current.scale.lerp(new Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group 
      position={position} 
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh castShadow>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial 
          color={active ? "#3B82F6" : color} 
          emissive={hovered || active ? color : "black"}
          emissiveIntensity={hovered || active ? 0.5 : 0}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      <Text
        position={[0, -size - 0.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  );
};

export default CareerNode;
