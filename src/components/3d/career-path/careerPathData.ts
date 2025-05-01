
// Define career path data with nodes and connections
export const careerPathData = {
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
