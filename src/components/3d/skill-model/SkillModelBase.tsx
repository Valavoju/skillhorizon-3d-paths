
import SkillElement from "./SkillElement";
import { skillElementsData } from "./skillElementsData";

// The base container for skill model
const SkillModelBase = () => {
  return (
    <group>
      {skillElementsData.map((elem, index) => (
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

export default SkillModelBase;
