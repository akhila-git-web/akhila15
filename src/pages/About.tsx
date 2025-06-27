
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            About GrainPalette
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Project Overview
            </h2>
            <p className="text-gray-700 mb-6">
              GrainPalette is a deep learning application for rice type classification using transfer learning with MobileNetV4 architecture. Our AI model helps farmers, researchers, and agriculture enthusiasts identify various types of rice grains quickly and accurately.
            </p>
            
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Rice Types Supported
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Arborio</li>
              <li>Basmati</li>
              <li>Jasmine</li>
              <li>Brown Rice</li>
              <li>Wild Rice</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Usage Scenarios
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Farmers' Crop Planning</h4>
                <p className="text-sm text-gray-700">
                  Plan cultivation strategies by identifying rice varieties to optimize irrigation, fertilization, and pest management.
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Research & Extension</h4>
                <p className="text-sm text-gray-700">
                  Support agriculture scientists and extension workers in variety testing and research studies.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Home Gardening</h4>
                <p className="text-sm text-gray-700">
                  Help home growers learn about rice varieties and enhance their gardening skills.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Technical Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Model Architecture</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Base Model: MobileNetV4</li>
                  <li>• Transfer Learning: Pre-trained on ImageNet</li>
                  <li>• Input Shape: 224x224x3 (RGB images)</li>
                  <li>• Output Classes: 5 rice types</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Technology Stack</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Frontend: React with TypeScript</li>
                  <li>• Backend: Flask Python application</li>
                  <li>• Model: TensorFlow/Keras</li>
                  <li>• Image Processing: PIL/OpenCV</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
