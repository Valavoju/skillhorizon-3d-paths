
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useIsMobile } from "@/hooks/use-mobile";
import EnvironmentSphere from "./career-path/EnvironmentSphere";
import CareerPathModel from "./career-path/CareerPathModel";
import { careerPathData } from "./career-path/careerPathData";

// Main component exported for use
const CareerPath = ({ className }) => {
  const isMobile = useIsMobile();
  
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
