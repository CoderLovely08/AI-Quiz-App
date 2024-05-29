import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import QAContext from "../../context/QAContext";

function Instruction() {
  const { setQuestionsData } = useContext(QAContext);

  const navigateTo = useNavigate();
  return (
    <div className="p-8 flex flex-col items-center text-justify">
      <h1 className="text-3xl font-bold mb-6">AIVATAR Instruction Panel</h1>
      <ol className="list-decimal ml-6 mb-8">
        <li>
          This is a mock interview platform where a virtual interviewer will ask
          you the questions
        </li>
        <li>
          There will be total <b>10 questions</b>  which need to be answered in given
          time interval
        </li>
        <li>
          All the questions will be based on the job role which you have
          selected
        </li>
        <li>
          The mock interview will begin after you press the start button after
          carefully reading the instructions
        </li>
        <li>
          You have to <b>start the video</b> which consists of the virtual interviewer which will ask the questions
        </li>
        {/* <img className="mx-auto mb-4" src="../images/video.png" alt="video" /> */}
        <li>
          After the video interviewer finishes asking the questions you will
          have to <b>record</b> your answer within 1 min.<p>You can record your audio by
          selecting the voice button</p>
        </li>
        {/* <img className="mx-auto mb-4" src="../images/record.png" alt="record" /> */}
        <li>
          A dialog box will appear requesting permission to locate your
          computer's audio settings.
          <p>You must select allow to proceed to the
          <b> Mock Interview Platform</b></p> 
        </li>
        <li>After successfully recording the audio analysis report will be generated on the dashboard</li>
      </ol>

      <p className="text-center">(Read above instructions carefully and then press the start button)</p>
      <div className="flex justify-center mt-8">
        <Button  
          variant="contained"
          onClick={() => {
            setQuestionsData([]);
            navigateTo("/maininterview")
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default Instruction;
