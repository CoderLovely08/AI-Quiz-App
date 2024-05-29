import React, { useContext } from 'react';
import BarGraph from './PieChart';
import { useEffect } from 'react';
import QAContext from '../../context/QAContext';

const SubmitComponent = () => {
    const { setQuestionsData, questionsData, role } = useContext(QAContext);
    console.log(questionsData);
    // const currentAssesment = [...questionsData];
    // useEffect(() => {
    //     // This function will be called once when the component is mounted
    //     setQuestionsData([]);
    // }, [setQuestionsData]); // Dependencies array, it tells React to call this effect when `setQuestionsData` function changes

    return (
        <div className=" p-4 bg-gray-100 shadow rounded-lg m-4">
            <div class="bg-teal-100 border-l-4 border-[#00BFA6] text-teal-700 p-4 mb-4">
                <h2 class="text-3xl font-bold text-teal-500">
                    Result Analysis
                </h2>
                <h4 class="text-xl font-bold text-teal-500">Role: { role}</h4>
            </div>
            <ul className="flex flex-wrap gap-4 justify-center px-4 py-2">
                {questionsData.map((item, index) => (
                    <li
                        key={index}
                        className="bg-white p-4 rounded-lg border hover:border-teal-500 shadow transition duration-300 ease-in-out transform hover:-translate-y-1 max-w-md min-w-0 w-full"
                    >
                        <strong className="block mb-2 text-gray-800">Question {index + 1}:</strong>
                        <p className="mb-1 text-gray-600">{item.question_text}</p>
                        <p className="mb-1 text-gray-600"><strong>Response:</strong> {item.response_text}</p>
                        <p className="mb-1 text-gray-600"><strong>Feedback:</strong> {item.ai_response}</p>
                        <p className="text-gray-600"><strong>Score:</strong> <span>{item.score}</span></p>
                    </li>
                ))}
            </ul>

            <BarGraph />
        </div>
    );
}

export default SubmitComponent;
