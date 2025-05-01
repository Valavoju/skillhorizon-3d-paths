
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GradientTexture } from "@react-three/drei";

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

export default EnvironmentSphere;
