
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, GradientTexture } from "@react-three/drei";
import { Vector3, MeshStandardMaterial, LineBasicMaterial } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

// Interactive floating node that represents a skill or career milestone
const CareerNode = ({ position, skill, size = 1, color = "#9B87F5", onClick, active, id }) => {
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

// Connection line between nodes
const ConnectionLine = ({ start, end, active }) => {
  const ref = useRef(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints([start, end].map(p => new Vector3(...p)));
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial 
        color={active ? "#3B82F6" : "#7E69AB"} 
        linewidth={1} 
        opacity={active ? 1 : 0.4} 
        transparent
      />
    </line>
  );
};

// Main career path component with nodes and connections
const CareerPathModel = ({ paths }) => {
  const [activeNode, setActiveNode] = useState(null);
  const ref = useRef(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const handleNodeClick = (id) => {
    setActiveNode(id === activeNode ? null : id);
  };

  return (
    <group ref={ref}>
      {/* Render connections first (behind nodes) */}
      {paths.connections.map((connection, idx) => (
        <ConnectionLine 
          key={idx}
          start={paths.nodes[connection.start].position}
          end={paths.nodes[connection.end].position}
          active={activeNode === connection.start || activeNode === connection.end}
        />
      ))}

      {/* Render nodes */}
      {paths.nodes.map((node, idx) => (
        <CareerNode 
          key={idx}
          id={idx}
          position={node.position} 
          skill={node.skill}
          size={node.size || 1}
          color={node.color || "#9B87F5"}
          onClick={handleNodeClick}
          active={activeNode === idx}
        />
      ))}
    </group>
  );
};

// Background sphere
const EnvironmentSphere = () => {
  const ref = useRef(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <mesh ref={ref} scale={[20, 20, 20]}>
      <sphereGeometry args={[1, 20, 20]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.1}
        side={2}
      >
        <GradientTexture
          stops={[0, 0.3, 0.6, 1]} 
          colors={['#231c40', '#3e3168', '#4d3e82', '#2a2249']} 
          size={1024}
        />
      </meshBasicMaterial>
    </mesh>
  );
};

// Main component exported for use
const CareerPath = ({ className }) => {
  const isMobile = useIsMobile();
  
  // Define career path data with nodes and connections
  const careerPathData = {
    nodes: [
      { position: [0, 0, 0], skill: "Core Skills", size: 1.2, color: "#9B87F5" },
      { position: [-2, 1.5, -1], skill: "Technical", size: 0.9 },
      { position: [2, 1.8, -0.5], skill: "Soft Skills", size: 0.9 },
      { position: [-3, 3, -2], skill: "Programming", size: 0.7 },
      { position: [-1, 3, -1.5], skill: "Data Analysis", size: 0.7 },
      { position: [1, 3.5, -0.5], skill: "Communication", size: 0.7 },
      { position: [3, 3, -1], skill: "Leadership", size: 0.7 },
    ],
    connections: [
      { start: 0, end: 1 },
      { start: 0, end: 2 },
      { start: 1, end: 3 },
      { start: 1, end: 4 },
      { start: 2, end: 5 },
      { start: 2, end: 6 },
    ]
  };

  return (
    <div className={`w-full h-[500px] md:h-[600px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        
        <EnvironmentSphere />
        <CareerPathModel paths={careerPathData} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default CareerPath;
