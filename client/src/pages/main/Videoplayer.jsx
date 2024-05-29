import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack"; // Import useSnackbar hook
import QAContext from "../../context/QAContext";
import LoadingComponent from "../../components/Utility/Loading";
import ResponseText from "./ResponseText";
import ScreenRecorder from "./ScreenRecorder";


const developmentURL =
  "http://localhost:3000/api/aws/getNQuestions?count=10&jobRoleId=";
const productionURL =
  "https://ai-avatar-server-934aaaa51857.herokuapp.com/api/aws/getNQuestions?count=10&jobRoleId=";

function Videoplayer() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { questionsData, setQuestionsData, jobRoleId, role } =
    useContext(QAContext);
  const [responseObject, setResponseObject] = useState({
    question_id: "",
    question_text: "",
    response_text: "",
    ai_response: "",
    score: 0,
    job_role: "",
  });

  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook

  useEffect(() => {
    if (jobRoleId !== null) {
      fetchQuestions(jobRoleId);
    }
  }, []); // Fetch videos on component mount

  const fetchQuestions = async (jobRoleId) => {
    try {
      const response = await axios.get(productionURL + jobRoleId);

      // Check if response is valid
      if (
        response.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const newQuestions = response.data.data;
        setQuestions(newQuestions);
        setLoading(false);
      } else {
        enqueueSnackbar("Unable to fetch videos response from the server.", {
          variant: "error",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      enqueueSnackbar("Error fetching videos from the server.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleNextVideo = () => {
    /// Create a new response object for the current question
    const currentResponseObject = {
      ...responseObject,
      question_id: questions[currentQuestionIndex].question_id,
      question_text: questions[currentQuestionIndex].question_text,
      job_role: questions[currentQuestionIndex].job_role_title,
    };

    // Add the current response object to questionsData
    setQuestionsData((prev) => [...prev, currentResponseObject]);
    setResponseObject((prev) => ({
      ...prev,
      response_text: "",
      score: 0,
    }));

    // Update responseObject for the next question
    setResponseObject({
      ...currentResponseObject,
      response_text: "",
      ai_response: "",	
      score: 0,
    });
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  // Check if it's the last question
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Display 'Submit' instead of 'Next' for the last question
  const buttonText = isLastQuestion ? "Submit" : "Next";

  // Handle submission for the last question
  const handleSubmit = () => {
    // Create a new response object for the current question
    const currentResponseObject = {
      ...responseObject,
      question_id: questions[currentQuestionIndex].question_id,
      question_text: questions[currentQuestionIndex].question_text,
      job_role: questions[currentQuestionIndex].job_role_title,
    };

    // Add the current response object to questionsData
    setQuestionsData((prev) => [...prev, currentResponseObject]);

    // Display 'Submitted' message
    enqueueSnackbar("Submitted", {
      variant: "success",
    });

    // Redirect to a different page after submission
    navigate("/submit");

    // Traverse through questionsData and print its contents
    console.log("Questions Data:", questionsData);
  };

  return (
    <div>
      {loading ? (
        <LoadingComponent open={loading} />
      ) : (
        <>
          {questions.length > 0 && (
            <div className="text-center">
              <div className="flex justify-center">
                {" "}
                {/* Flex container */}
                <div className="">
                  {" "}
                  {/* Flex item */}
                  <video
                    className="border shadow-lg rounded-md mx-0 p-4 h-96 w-full"
                    controls
                    autoPlay
                    key={questions[currentQuestionIndex].question_video_src}
                  >
                    <source
                      src={questions[currentQuestionIndex].question_video_src}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="flex w-auto py-4 px-8 shadow-md border justify-center h-full">
                <div className="w-1/2 text-left p-4 border rounded-md shadow">
                  <div className="bg-teal-50 border-l-4 border-teal-500 p-4">
                    <h3 className="text-xl font-bold text-teal-700">
                      Question: {currentQuestionIndex + 1}
                    </h3>
                    <h3 className="text-xl font-bold text-teal-700">
                      Role: {role}
                    </h3>
                  </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold mb-4">
                        Interviewer:{" "}
                        <span className="text-gray-700">{questions[currentQuestionIndex].question_text}</span>
                      </h3>
                      <hr className="my-4" />
                      <div className="mb-4">
                        <ResponseText
                          userType={"User"}
                          text={responseObject.response_text}
                          className="text-teal-500 font-medium"
                        />
                      </div>
                      <hr className="my-4" />
                      <div>
                        <ResponseText
                          userType={"Feedback"}
                          text={responseObject.ai_response}
                          className="text-teal-500 font-medium"
                        />
                      </div>
                    </div>

                </div>
              </div>
              <div className="flex justify-center items-center gap-4 m-4">
                <ScreenRecorder
                  setResponseObject={setResponseObject}
                  questionId={questions[currentQuestionIndex].question_id}
                  questionText={questions[currentQuestionIndex].question_text}
                  jobRole={questions[currentQuestionIndex].job_role_title}
                />
                <button
                  className="bg-teal-400 px-4 py-2 border border-teal-400 text-white rounded-md font-bold text-lg shadow-md"
                  onClick={isLastQuestion ? handleSubmit : handleNextVideo}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Videoplayer;
