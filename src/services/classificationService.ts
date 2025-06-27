
const API_BASE_URL = 'http://localhost:5000';

export interface ClassificationResult {
  prediction: string;
  confidence: number;
  status: 'success' | 'error';
  error?: string;
}

export const classifyImage = async (imageFile: File): Promise<ClassificationResult> => {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);
    
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Classification error:', error);
    return {
      prediction: '',
      confidence: 0,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
