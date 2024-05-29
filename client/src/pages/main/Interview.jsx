import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import QAContext from "../../context/QAContext";

// Icons (Using Heroicons for this example)
// import { CodeIcon, CalculatorIcon } from '@heroicons/react/solid';

const Interview = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigateTo = useNavigate();
  const { updateRole } = useContext(QAContext);

  const handleOptionChange = (e) => {
    const newRole = e.target.value;
    setSelectedOption(newRole);
    updateRole(newRole);
    navigateTo('/instructions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-100 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl"> {/* Container for content */}
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">Get Interview Ready</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Role-Specific Prep Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src="https://i.postimg.cc/XYVCJQxK/inter.jpg"
                alt="Technical Interview Prep"
                className="w-full h-48 object-cover"
              />
              {/* <CodeIcon className="absolute top-4 right-4 h-12 w-12 text-white" /> */}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Interview Practice</h3>
              <p className="text-gray-600 mb-4">Hone your skills with role-specific questions and challenges.</p>

              {/* Role Selection Dropdown */}
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-teal-500"
              >
                <option value="" disabled>Select Role</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Android Developer">Android Developer</option>
              </select>

              {selectedOption && (
                <Link to="/training-test" className="block mt-4">
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Start Practice
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Aptitude Test Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src="https://i.postimg.cc/9FfvPjxr/images.png"
                alt="Aptitude Test"
                className="w-full h-48 object-cover"
              />
              {/* <CalculatorIcon className="absolute top-4 right-4 h-12 w-12 text-white" /> */}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Aptitude Assessment</h3>
              <p className="text-gray-600 mb-4">Evaluate your problem-solving and logical reasoning abilities.</p>
              <Link to="/aptitude">
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                  Take the Test
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
