
interface ResumeAnalysis {
  skills: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description?: string;
  }[];
  summary: string;
  recommendations: string[];
}

const GEMINI_API_KEY = 'AIzaSyDGEsc0HpVCcSQUI08FOdtmbpma2moL7U4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export const analyzeResumeWithGemini = async (resumeText: string): Promise<ResumeAnalysis> => {
  const prompt = `
    Analyze this resume and extract information in JSON format for a career development platform called "Skill Horizon". 
    
    Resume content: ${resumeText}
    
    Please provide a JSON response with the following structure:
    {
      "skills": ["skill1", "skill2", "skill3", ...] (extract all technical and soft skills),
      "education": [
        {
          "degree": "degree name",
          "institution": "institution name",
          "period": "start - end year"
        }
      ],
      "experience": [
        {
          "title": "job title",
          "company": "company name",
          "period": "start - end period",
          "description": "brief description of role"
        }
      ],
      "summary": "A brief professional summary based on the resume",
      "recommendations": ["recommendation1", "recommendation2", ...] (career development suggestions based on the profile)
    }
    
    Focus on extracting relevant information for career development and skill assessment. If some sections are missing from the resume, provide empty arrays or reasonable defaults.
    
    Return ONLY the JSON object, no additional text.
  `;

  try {
    console.log('Making request to Gemini API...');
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    const generatedText = data.candidates[0]?.content?.parts[0]?.text;
    
    if (!generatedText) {
      console.error('No response from Gemini API:', data);
      throw new Error('No response from Gemini API');
    }

    console.log('Generated text:', generatedText);

    // Parse the JSON response from Gemini
    const cleanedResponse = generatedText.replace(/```json\n?|\n?```/g, '').trim();
    console.log('Cleaned response:', cleanedResponse);
    
    const analysis = JSON.parse(cleanedResponse);
    console.log('Parsed analysis:', analysis);
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing resume with Gemini:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
};

// Function to extract text from uploaded file
export const extractTextFromFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // For now, we'll handle text files and basic file reading
    // In a production environment, you'd want to use libraries like pdf-parse for PDFs
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For demo purposes, we'll use the file name and assume it contains resume info
      resolve(`Resume file: ${file.name}\nThis is a sample resume text for analysis.`);
    }
  });
};
