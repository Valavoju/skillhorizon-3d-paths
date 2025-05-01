
import { Vector3 } from "three";
import { BufferGeometry, Line } from "three";

// Connection line between nodes
const ConnectionLine = ({ start, end, active }) => {
  const points = [new Vector3(...start), new Vector3(...end)];
  
  return (
    <line>
      <bufferGeometry attach="geometry">
        <float32BufferAttribute attach="attributes-position" args={[points.flatMap(p => [p.x, p.y, p.z]), 3]} />
      </bufferGeometry>
      <lineBasicMaterial 
        attach="material"
        color={active ? "#3B82F6" : "#7E69AB"} 
        linewidth={1} 
        opacity={active ? 1 : 0.4} 
        transparent
      />
    </line>
  );
};

export default ConnectionLine;
