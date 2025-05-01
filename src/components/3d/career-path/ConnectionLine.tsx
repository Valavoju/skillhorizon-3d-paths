
import { Vector3 } from "three";
import { Line } from "@react-three/drei";

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
}

// Connection line between nodes
const ConnectionLine = ({ start, end, active }: ConnectionLineProps) => {
  const points = [
    new Vector3(...start), 
    new Vector3(...end)
  ];
  
  return (
    <Line 
      points={points}
      color={active ? "#3B82F6" : "#7E69AB"}
      lineWidth={1}
      opacity={active ? 1 : 0.4}
      transparent
    />
  );
};

export default ConnectionLine;
