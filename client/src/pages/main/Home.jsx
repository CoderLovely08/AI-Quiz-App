import React from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "/images/banner.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/interview");
  };

  return (
    <div className="container mx-auto mt-12 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-wrap">
          {/* Left side: Text content */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-teal-500 mb-4">
              Preparation is a door to possibilities
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Unlock your potential with Aivatar. Master interviews, ace aptitude tests, and own your future! Prepare for success with our comprehensive platform.
            </p>
            <button
              onClick={handleGetStartedClick}
              className="bg-teal-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300"
            >
              Get Started
            </button>
          </div>
          {/* Right side: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={BannerImage}
              alt="model"
              className="w-4/5 h-auto mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-16 border p-4 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Why Choose Aivatar?
        </h2>
        <div className="flex flex-wrap justify-center items-center">
          {/* Card 1 */}
          <div className="w-full h-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <h3 className="text-xl font-bold text-teal-500 mb-2">Comprehensive Training</h3>
              <p className="text-gray-700">
                Our platform offers extensive training modules covering a wide range of topics, from interview preparation to aptitude tests.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="w-full h-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <h3 className="text-xl font-bold text-teal-500 mb-2">Expert Guidance</h3>
              <p className="text-gray-700">
                Learn from industry experts who have a wealth of experience and knowledge to help you succeed.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="w-full h-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <h3 className="text-xl font-bold text-teal-500 mb-2">Personalized Feedback</h3>
              <p className="text-gray-700">
                Get personalized feedback on your performance to help you improve and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
