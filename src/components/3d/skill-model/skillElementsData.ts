
interface SkillElementData {
  position: [number, number, number];
  size: number;
  rotationSpeed: [number, number, number];
  color: string;
}

// Define elements with different positions, sizes, rotation speeds, and colors
export const skillElementsData: SkillElementData[] = [
  { position: [0, 0, 0], size: 0.5, rotationSpeed: [0.2, 0.3, 0.1], color: "#9B87F5" },
  { position: [1.2, 0.5, -0.5], size: 0.3, rotationSpeed: [0.3, 0.1, 0.2], color: "#7E69AB" },
  { position: [-1, 0.3, 0.8], size: 0.4, rotationSpeed: [0.1, 0.4, 0.3], color: "#3B82F6" },
  { position: [0.5, -0.5, 1], size: 0.25, rotationSpeed: [0.4, 0.2, 0.1], color: "#93C5FD" },
  { position: [-0.7, -0.4, -0.6], size: 0.35, rotationSpeed: [0.2, 0.1, 0.3], color: "#473676" },
];
