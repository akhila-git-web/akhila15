
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image - Rice field */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="%2334A853" width="1200" height="800"/><path fill="%2322C55E" d="M0,300 Q300,250 600,300 T1200,300 L1200,800 L0,800 Z"/><path fill="%2316A34A" d="M0,500 Q400,450 800,500 T1200,500 L1200,800 L0,800 Z"/></svg>')`
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 bg-black/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">RICE TYPE CLASSIFICATION</h1>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-green-400 transition-colors">Home</Link>
              <span className="text-gray-300">About</span>
              <span className="text-gray-300">Testimonials</span>
              <span className="text-gray-300">Contact</span>
              <Link to="/classify" className="text-green-400 hover:text-green-300 transition-colors">Predict</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          Welcome to Rice Type
        </h1>
        <h2 className="text-6xl font-bold text-white mb-8">
          Detection
        </h2>
        <p className="text-xl text-white mb-12 max-w-2xl">
          This model can detect rice type based on rice images.
        </p>
        
        <Link to="/classify">
          <Button 
            size="lg" 
            className="bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-12 py-4 text-lg font-medium transition-all duration-300"
          >
            Predict
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
