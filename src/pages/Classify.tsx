
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Classify = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setFileName(file.name);
        setResults(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      });
    }
  };

  const handlePredict = () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    // Simulate prediction
    setTimeout(() => {
      setResults({
        prediction: "Arborio",
        confidence: "high"
      });
      setIsLoading(false);
    }, 2000);
  };

  if (results) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-black text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">RICE TYPE CLASSIFICATION</h1>
              <div className="flex items-center space-x-8">
                <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
                <span className="text-gray-300">About</span>
                <span className="text-gray-300">Testimonials</span>
                <span className="text-gray-300">Contact</span>
                <span className="text-green-400">Predict</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Results Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Results</h1>
            <p className="text-lg text-gray-600 mb-4">
              Based on the image given as input, the AI model has predicted that there is a high
            </p>
            <p className="text-lg text-gray-600 mb-8">
              possibility for your rice is of type
            </p>
            <h2 className="text-5xl font-bold text-orange-600 mb-12">
              {results.prediction}
            </h2>
            
            <Button 
              onClick={() => setResults(null)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              Predict Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-black text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">RICE TYPE CLASSIFICATION</h1>
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
              <span className="text-gray-300">About</span>
              <span className="text-gray-300">Testimonials</span>
              <span className="text-gray-300">Contact</span>
              <span className="text-green-400">Predict</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="text-sm text-gray-500">
            <Link to="/" className="text-green-600 hover:text-green-700">Home</Link>
            <span className="mx-2">/</span>
            <span>Details Page</span>
          </div>
        </div>
      </div>

      {/* Upload Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - File Browser */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Rice Image</h3>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[300px] flex flex-col justify-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Selected rice" 
                        className="max-w-full h-48 object-contain mx-auto rounded"
                      />
                      <p className="text-sm text-gray-600">{fileName}</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="mt-4"
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Click to select an image</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Browse Files
                      </Button>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {/* Right Side - Preview Area */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Image</h3>
                <div className="border-2 border-gray-300 rounded-lg p-8 text-center min-h-[300px] flex flex-col justify-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="max-w-full h-32 object-contain mx-auto"
                      />
                      <p className="text-sm text-gray-600">File: {fileName}</p>
                      <p className="text-xs text-gray-500">Image type: JPG File</p>
                      <Button
                        onClick={handlePredict}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 mt-4"
                      >
                        {isLoading ? "Processing..." : "Upload & Predict"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <p>No image selected</p>
                      <p className="text-sm mt-2">Select an image from the left panel</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classify;
