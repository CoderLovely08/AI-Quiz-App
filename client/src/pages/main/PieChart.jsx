import React, { useContext, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import QAContext from '../../context/QAContext';


const PieChart = () => {
    const { questionsData } = useContext(QAContext);
    const [totalScore, setTotalScore] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (questionsData.length > 0) {
            console.log(questionsData)
            // Calculate total score
            const total = questionsData.reduce((acc, curr) => acc + parseInt(curr.score), 0);
            console.log(total)
            setTotalScore(total);

            // Calculate percentage out of 100
            const totalPercentage = Math.round((total / (questionsData.length * 10)) * 100); // Assuming each question's max score is 10
            console.log(totalPercentage);
            setPercentage(totalPercentage);
        }
    }, [questionsData]);

    // Prepare data for the pie chart
    const chartData = {
        labels: ['Percentage'],
        datasets: [
            {
                label: '',
                data: [ percentage, 100 - percentage],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 255, 255, 0)'],
            }
        ]
    };

    return (
    <div className="mx-auto max-w-md p-4">
        <h2 className="text-xl font-semibold mb-4">Scores Percentage</h2>
        <div className="max-h-96 w-auto">
            {chartData && <Pie className='bg-slate-100 shadow-md rounded-md' data={chartData} />}
        </div>
    </div>
);

};

export default PieChart;
