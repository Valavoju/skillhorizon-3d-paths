
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import CareerNode from "./CareerNode";
import ConnectionLine from "./ConnectionLine";

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

export default CareerPathModel;
