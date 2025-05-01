
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

// A single floating element of the skill
const SkillElement = ({ position, size, rotationSpeed, color }) => {
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
    <mesh position={position} ref={ref}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3}
        roughness={0.6}
      />
    </mesh>
  );
};

// The base container for skill model
const SkillModelBase = () => {
  // Define elements with different positions, sizes, rotation speeds, and colors
  const elements = [
    { position: [0, 0, 0], size: 0.5, rotationSpeed: [0.2, 0.3, 0.1], color: "#9B87F5" },
    { position: [1.2, 0.5, -0.5], size: 0.3, rotationSpeed: [0.3, 0.1, 0.2], color: "#7E69AB" },
    { position: [-1, 0.3, 0.8], size: 0.4, rotationSpeed: [0.1, 0.4, 0.3], color: "#3B82F6" },
    { position: [0.5, -0.5, 1], size: 0.25, rotationSpeed: [0.4, 0.2, 0.1], color: "#93C5FD" },
    { position: [-0.7, -0.4, -0.6], size: 0.35, rotationSpeed: [0.2, 0.1, 0.3], color: "#473676" },
  ];

  return (
    <group>
      {elements.map((elem, index) => (
        <SkillElement 
          key={index} 
          position={elem.position} 
          size={elem.size} 
          rotationSpeed={elem.rotationSpeed} 
          color={elem.color} 
        />
      ))}
    </group>
  );
};

// The main exported component
const SkillModel = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SkillModelBase />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SkillModel;
