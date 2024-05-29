import { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner.png';

const LandingPage = () => {

    const features = [
        {
            name: 'Diverse Topics',
            description: 'Explore a wide array of subjects, from science and history to pop culture and beyond.',
            // icon: AcademicCapIcon,
        },
        {
            name: 'Progress Tracking',
            description: 'Monitor your strengths and weaknesses to focus your study efforts.',
            // icon: ChartBarIcon,
        },
        {
            name: 'Adaptive Learning',
            description: 'Experience questions tailored to your skill level for optimal learning.',
            // icon: LightBulbIcon,
        },
        {
            name: 'Time-Bound Tests',
            description: 'Prepare for exams with realistic timed simulations.',
            // icon: ClockIcon,
        },
        {
            name: 'Community Discussions',
            description: 'Engage with fellow learners and instructors for a collaborative experience.',
            // icon: UsersIcon,
        },
        {
            name: 'Rich Explanations',
            description: 'Gain deeper understanding with detailed answer explanations.',
            // icon: BookOpenIcon,
        },
    ];

    const topics = [
        { name: 'Ratios', color: 'bg-teal-500' },
        { name: 'Percentages', color: 'bg-blue-500' },
        { name: 'Trains', color: 'bg-purple-500' },
        { name: 'Volumes', color: 'bg-pink-500' },
        { name: 'Profit and Loss', color: 'bg-yellow-500' },
        { name: 'Time and Work', color: 'bg-red-500' },
        { name: 'Averages', color: 'bg-green-500' },
        { name: 'Probability', color: 'bg-indigo-500' },
        { name: 'Permutations and Combinations', color: 'bg-gray-500' },
        { name: 'Simple Interest', color: 'bg-blue-500' },
        { name: 'Compound Interest', color: 'bg-purple-500' },
        { name: 'Partnership', color: 'bg-pink-500' },
        { name: 'Discounts', color: 'bg-yellow-500' },
        { name: 'Time and Distance', color: 'bg-red-500' },
        { name: 'Boats and Streams', color: 'bg-green-500' },
        { name: 'Algebra', color: 'bg-indigo-500' },
        { name: 'Geometry', color: 'bg-gray-500' },
        { name: 'Number Series', color: 'bg-blue-500' },
        { name: 'Coding and Decoding', color: 'bg-purple-500' },
        { name: 'Blood Relations', color: 'bg-pink-500' },
        { name: 'Seating Arrangements', color: 'bg-yellow-500' },
        { name: 'Puzzles', color: 'bg-red-500' },
        { name: 'Data Interpretation', color: 'bg-green-500' },
        { name: 'Data Sufficiency', color: 'bg-indigo-500' },
        // ... Add more topics
    ];

    const testimonials = [
        {
            quote: 'Aivatar has been a game-changer for my interview prep. The questions are challenging and the explanations are spot-on.',
            author: 'Om Khandale, Student',
        },
        // ... Add more testimonials
    ];


    const [open, setOpen] = useState(false);

    const handleStartTestClick = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleModeSelectAndClose = () => {
        setOpen(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-wrap justify-center items-center p-4 shadow-lg border rounded-lg bg-white">
                    {/* Text about MCQ Quiz */}
                    <div className="w-full md:w-1/2 p-4">
                        <div className="border bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-4xl font-bold text-teal-500 mb-4">
                                Welcome to MCQ Quiz
                            </h1>
                            <p className="text-gray-700 text-lg mb-6">
                                This is a platform for testing your knowledge with multiple-choice questions. Get ready to challenge yourself!
                            </p>
                            <div className='flex w-full my-3'>
                                <button
                                    className="w-full bg-teal-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-teal-600 transition duration-300"
                                    onClick={handleStartTestClick}
                                >
                                    Start Test
                                </button>
                            </div>
                            <h1 className="text-5xl font-extrabold text-teal-600 mb-4">
                                Elevate Your Knowledge with MCQ Quiz
                            </h1>
                            <p className="text-gray-800 text-lg mb-8">
                                Challenge yourself, track your progress, and master any subject with our comprehensive question bank.
                            </p>

                            {/* Statistical Values (You'll need to replace these with actual data) */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-white rounded-lg p-6 shadow-md">
                                    <p className="text-3xl font-bold text-teal-500">25+</p>
                                    <p className="text-gray-600">Unique Topics</p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-md">
                                    <p className="text-3xl font-bold text-teal-500">1000+</p>
                                    <p className="text-gray-600">Questions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Banner Image */}
                    <div className="w-full md:w-1/2 p-4">
                        <img
                            src={banner}
                            alt="Quiz Banner"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center p-4 shadow-lg border rounded-lg bg-white">
                    <div className="w-full p-4">
                        <div className="border bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-3xl font-bold text-teal-600 mb-4 text-center">
                                Features
                            </h2>
                            <p className="text-gray-700 text-lg mb-6">
                                Explore the features that make MCQ Quiz the ultimate study companion.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-teal-500 mb-2">
                                            {feature.name}
                                        </h3>
                                        <p className="text-gray-700">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Topics */}
                    <section className="container mx-auto py-12 px-4">
                            <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Explore by Topic</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {topics.map((topic, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-lg p-6 text-white shadow-lg ${topic.color} hover:opacity-90`}
                                    >
                                        <h3 className="text-xl font-semibold">{topic.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </section>

                    
                    <section className="container mx-auto py-12 px-4">
                        <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                                    <p className="text-gray-600 text-right">- {testimonial.author}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                </div>
            </div>

            {/* Dialog */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2">
                        <div className="p-4 border-b">
                            <h2 className="text-2xl font-bold text-teal-500">
                                Select Test Type
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 p-2">
                                    <div className="bg-white rounded-lg shadow-lg p-4">
                                        <h3 className="text-xl font-bold text-teal-500 mb-2">
                                            Training Mode
                                        </h3>
                                        <p className="text-gray-700 mb-4">
                                            This mode allows you to practice and improve your skills without any time constraints.
                                        </p>
                                        <Link to="/training-test" className="no-underline">
                                            <button
                                                className="bg-teal-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-teal-600 transition duration-300"
                                                onClick={() => handleModeSelectAndClose('training')}
                                            >
                                                Select Training Mode
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 p-2">
                                    <div className="bg-white rounded-lg shadow-lg p-4">
                                        <h3 className="text-xl font-bold text-teal-500 mb-2">
                                            Testing Mode
                                        </h3>
                                        <p className="text-gray-700 mb-4">
                                            This mode simulates an actual test environment with time constraints and random questions.
                                        </p>
                                        <Link to="/testing-test" className="no-underline">
                                            <button
                                                className="bg-teal-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-teal-600 transition duration-300"
                                                onClick={() => handleModeSelectAndClose('testing')}
                                            >
                                                Select Testing Mode
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t">
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-600 transition duration-300"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
