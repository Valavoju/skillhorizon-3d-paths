
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SkillModelBase from "./skill-model/SkillModelBase";

interface SkillModelProps {
  className?: string;
}

// The main exported component
const SkillModel = ({ className }: SkillModelProps) => {
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
